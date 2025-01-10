import { toCamelCase, toSnakeCase } from './toCamelAndSnakeCase';

export async function fetchWithMiddleware(
    url: string,
    options: Omit<RequestInit, 'body'> & { body?: Record<string, any> } = {},
): Promise<any> {
    const { body, headers, ...restOptions } = options;

    // Convert request body to snake_case if present
    const transformedBody = body ? toSnakeCase(body) : undefined;

    // Combine headers, adding Content-Type only if not provided
    const combinedHeaders = {
        'Content-Type': transformedBody ? 'application/json' : undefined,
        ...headers,
    };

    // Remove undefined headers (e.g., Content-Type if no body exists)
    const filteredHeaders = Object.fromEntries(
        Object.entries(combinedHeaders).filter(([, value]) => value !== undefined),
    );

    // Send fetch request with transformed body (stringified)
    const response = await fetch(url, {
        ...restOptions,
        credentials: 'include',
        headers: filteredHeaders,
        body: transformedBody ? JSON.stringify(transformedBody) : undefined,
    });

    if (response.ok) {
        // Check if there's a body to parse
        if (response.status === 204) {
            return null; // No content, return null
        }

        // Parse the JSON response and convert to camelCase
        const responseData = await response.json().catch(() => null); // Handle empty responses
        return responseData ? toCamelCase(responseData) : null;
    }

    // Handle errors by throwing with the response status and message
    throw new Error(`${response.status}: ${await response.text()}`);
}
