// Utility functions for key conversions
export function toSnakeCase<T extends Record<string, any>>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(toSnakeCase) as unknown as T;
    } else if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
                toSnakeCase(value),
            ]),
        ) as T;
    }
    return data;
}

export function toCamelCase<T extends Record<string, any>>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(toCamelCase) as unknown as T;
    } else if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
                toCamelCase(value),
            ]),
        ) as T;
    }
    return data;
}
