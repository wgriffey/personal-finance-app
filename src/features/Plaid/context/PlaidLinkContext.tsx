import { createContext, Dispatch, useCallback, useMemo, useReducer } from 'react';
import { PlaidLinkError } from 'react-plaid-link';
import PlaidService from '../services/PlaidService.ts';

interface LinkToken {
    [key: string]: string;
}

interface LinkState {
    byUser: LinkToken;
    byItem: LinkToken;
    error: PlaidLinkError;
}

const initialState: LinkState = {
    byUser: {}, // normal case
    byItem: {}, // update mode
    error: {
        error_type: '',
        error_code: '',
        error_message: '',
        display_message: '',
    },
};

type LinkAction =
    | {
          type: 'LINK_TOKEN_CREATED';
          userToken: string;
          token: string;
      }
    | { type: 'LINK_TOKEN_UPDATE_MODE_CREATED'; itemId: number; token: string }
    | { type: 'LINK_TOKEN_ERROR'; error: PlaidLinkError }
    | { type: 'DELETE_USER_LINK_TOKEN'; userToken: string }
    | { type: 'DELETE_ITEM_LINK_TOKEN'; itemId: number };

interface LinkContextShape extends LinkState {
    dispatch: Dispatch<LinkAction>;
    generateLinkToken: (userToken: string, itemId: number | null | undefined) => void;
    deleteLinkToken: (userToken: string | null, itemId: number | null) => void;
    linkTokens: LinkState;
}

const PlaidLinkContext = createContext<LinkContextShape>(initialState as LinkContextShape);

/**
 * @desc Handles updates to the LinkTokens state as dictated by dispatched actions.
 */
function reducer(state: LinkState, action: LinkAction) {
    switch (action.type) {
        case 'LINK_TOKEN_CREATED':
            return {
                ...state,
                byUser: {
                    [action.userToken]: action.token,
                },
                error: {
                    error_type: '',
                    error_code: '',
                    error_message: '',
                    display_message: '',
                },
            };

        case 'LINK_TOKEN_UPDATE_MODE_CREATED':
            return {
                ...state,
                error: {
                    error_type: '',
                    error_code: '',
                    error_message: '',
                    display_message: '',
                },
                byItem: {
                    ...state.byItem,
                    [action.itemId]: action.token,
                },
            };
        case 'DELETE_USER_LINK_TOKEN':
            return {
                ...state,
                byUser: {
                    [action.userToken]: '',
                },
            };
        case 'DELETE_ITEM_LINK_TOKEN':
            return {
                ...state,
                byItem: {
                    ...state.byItem,
                    [action.itemId]: '',
                },
            };
        case 'LINK_TOKEN_ERROR':
            return {
                ...state,
                error: action.error,
            };
        default:
            console.warn('unknown action');
            return state;
    }
}

/**
 * @desc Maintains the Link context state and fetches link tokens to update that state.
 */
export function PlaidLinkProvider(props: any) {
    const [linkTokens, dispatch] = useReducer(reducer, initialState);

    /**
     * @desc Creates a new link token for a given User or Item.
     */
    const generateLinkToken = useCallback(async (userToken: string, itemId: number) => {
        // if itemId is not null, update mode is triggered
        const linkTokenResponse = await PlaidService.GenerateLinkToken(userToken, itemId);
        console.info(linkTokenResponse);
        if (linkTokenResponse.link_token) {
            const token = await linkTokenResponse.link_token;
            console.log('success', linkTokenResponse);

            if (itemId !== null && itemId !== undefined) {
                dispatch({
                    type: 'LINK_TOKEN_UPDATE_MODE_CREATED',
                    itemId: itemId,
                    token: token,
                });
            } else {
                dispatch({ type: 'LINK_TOKEN_CREATED', userToken: userToken, token: token });
            }
        } else {
            dispatch({ type: 'LINK_TOKEN_ERROR', error: linkTokenResponse.data });
            console.log('error', linkTokenResponse.data);
        }
    }, []);

    const deleteLinkToken = useCallback(async (userToken: string, itemId: number) => {
        if (userToken !== null) {
            dispatch({
                type: 'DELETE_USER_LINK_TOKEN',
                userToken: userToken,
            });
        } else {
            dispatch({
                type: 'DELETE_ITEM_LINK_TOKEN',
                itemId: itemId,
            });
        }
    }, []);

    const value = useMemo(
        () => ({
            generateLinkToken,
            deleteLinkToken,
            linkTokens,
        }),
        [linkTokens, generateLinkToken, deleteLinkToken],
    );

    return <PlaidLinkContext.Provider value={value} {...props} />;
}

export default PlaidLinkContext;
