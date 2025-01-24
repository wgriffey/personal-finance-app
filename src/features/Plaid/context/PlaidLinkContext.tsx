import { createContext, Dispatch, useCallback, useMemo, useReducer } from 'react';
import { PlaidLinkError } from 'react-plaid-link';
import PlaidService from '@plaid/services/PlaidService.ts';

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
          token: string;
      }
    | { type: 'LINK_TOKEN_UPDATE_MODE_CREATED'; itemId: number; token: string }
    | { type: 'LINK_TOKEN_ERROR'; error: PlaidLinkError }
    | { type: 'DELETE_USER_LINK_TOKEN' }
    | { type: 'DELETE_ITEM_LINK_TOKEN'; itemId: number };

interface LinkContextShape extends LinkState {
    dispatch: Dispatch<LinkAction>;
    generateLinkToken: (itemId?: number) => void;
    deleteLinkToken: (itemId?: number) => void;
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
                    user: action.token,
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
                    user: '',
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
    const generateLinkToken = useCallback(async (itemId?: number) => {
        // if itemId is not null, update mode is triggered
        const linkTokenResponse = await PlaidService.generateLinkToken(itemId);
        console.info(linkTokenResponse);
        if (linkTokenResponse.linkToken) {
            const token = await linkTokenResponse.linkToken;
            console.log('success', linkTokenResponse);

            if (itemId) {
                dispatch({
                    type: 'LINK_TOKEN_UPDATE_MODE_CREATED',
                    itemId: itemId,
                    token: token,
                });
            } else {
                dispatch({ type: 'LINK_TOKEN_CREATED', token: token });
            }
        } else {
            dispatch({ type: 'LINK_TOKEN_ERROR', error: linkTokenResponse });
            console.log('error', linkTokenResponse);
        }
    }, []);

    const deleteLinkToken = useCallback(async (itemId?: number) => {
        if (itemId) {
            dispatch({
                type: 'DELETE_ITEM_LINK_TOKEN',
                itemId: itemId,
            });
        } else {
            dispatch({
                type: 'DELETE_USER_LINK_TOKEN',
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
