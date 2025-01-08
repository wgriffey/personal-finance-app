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
        headers: filteredHeaders,
        body: transformedBody ? JSON.stringify(transformedBody) : undefined,
    });

    if (response.ok) {
        // Parse and convert response JSON to camelCase
        const responseData = await response.json();
        return toCamelCase(responseData);
    }

    throw new Error(`${response.status}: ${await response.text()}`);
}
