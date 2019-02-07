type NonStringPrimitive = number | boolean | null | undefined;

export function parseUrlData<Type extends NonStringPrimitive>(value?: string): Type | undefined {
    try {
        const parsedValue = value !== undefined ? JSON.parse(value) : undefined;

        if (['number', 'boolean', 'null', 'undefined'].includes(typeof parsedValue)) {
            return parsedValue;
        }

        return undefined;
    } catch {
        // JSON parse error, fallback to undefined
        return undefined;
    }
}

export function stringifyUrlData<Type extends NonStringPrimitive>(value: Type): string | undefined {
    return value !== undefined ? JSON.stringify(value) : undefined;
}
