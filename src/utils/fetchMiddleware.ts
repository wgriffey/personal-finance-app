import AuthService from '@auth/services/AuthService';
import { toCamelCase, toSnakeCase } from './toCamelAndSnakeCase';

interface Response {
    data: any;
    status: number;
}

interface FetchOptions extends Omit<RequestInit, 'body'> {
    body?: Record<string, any>;
    retry?: boolean;
}

interface QueuedRequest {
    url: string;
    options: FetchOptions;
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: (reason?: any) => void;
}

let requestQueue: QueuedRequest[] = [];
let isRefreshing = false;

async function processQueue(refreshSuccess: boolean): Promise<void> {
    const queue = [...requestQueue];
    requestQueue = []; // Clear queue immediately
    console.log(queue);

    for (const request of queue) {
        try {
            if (!refreshSuccess) {
                request.reject(new Error('Token refresh failed'));
                continue;
            }
            const response = await fetchWithMiddleware(request.url, {
                ...request.options,
                retry: false, // Prevent retry loop
            });
            request.resolve(response);
        } catch (error) {
            request.reject(error);
        }
    }
}

async function handleTokenRefresh(url: string, options: FetchOptions): Promise<boolean> {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            if (!requestQueue.find((req) => req.url === url)) {
                // Avoid duplicate requests in the queue
                requestQueue.push({
                    url,
                    options: { ...options, retry: false },
                    resolve: () => resolve(true),
                    reject: () => reject(false),
                });
            }
        });
    }

    isRefreshing = true;

    try {
        const refreshResponse = await AuthService.refreshUserAccessToken();
        const refreshSuccess = refreshResponse.status === 200;

        await processQueue(refreshSuccess);
        return refreshSuccess;
    } catch (error) {
        await processQueue(false);
        if (error instanceof Error && error.message.includes('401')) {
            AuthService.logout();
            // window.location.href = '/login';
        }
        throw error;
    } finally {
        isRefreshing = false;
    }
}

export async function fetchWithMiddleware(
    url: string,
    options: FetchOptions = {},
): Promise<Response> {
    const { body, headers, retry = true, ...restOptions } = options;

    const transformedBody = body ? toSnakeCase(body) : undefined;
    const combinedHeaders = {
        'Content-Type': transformedBody ? 'application/json' : undefined,
        ...headers,
    };

    const filteredHeaders = Object.fromEntries(
        Object.entries(combinedHeaders).filter(([, value]) => value !== undefined),
    );

    const response = await fetch(url, {
        ...restOptions,
        credentials: 'include',
        headers: filteredHeaders,
        body: transformedBody ? JSON.stringify(transformedBody) : undefined,
    });

    if (response.ok) {
        return {
            data: await response
                .json()
                .then(toCamelCase)
                .catch(() => null),
            status: response.status,
        };
    }

    if (response.status === 401 && retry) {
        return new Promise((resolve, reject) => {
            if (!requestQueue.find((req) => req.url === url)) {
                // Avoid duplicate requests in queue
                requestQueue.push({
                    url,
                    options: { ...options, retry: false },
                    resolve,
                    reject,
                });
            }

            handleTokenRefresh(url, options).catch(reject);
        });
    }

    throw new Error(`${response.status}: ${await response.text()}`);
}
