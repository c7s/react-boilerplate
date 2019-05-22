/** No 'string' type here, it's already stringified */
type StringifyablePrimitive = number | boolean | null;

/** Parsing string may lead to undefined */
export function parseUrlData<Type extends StringifyablePrimitive>(value: undefined): undefined;
export function parseUrlData<Type extends StringifyablePrimitive>(value?: string): Type | undefined;
export function parseUrlData<Type extends StringifyablePrimitive>(value?: string): Type | undefined {
    try {
        const parsedValue = value !== undefined ? JSON.parse(value) : undefined;

        if (['number', 'boolean', 'undefined'].includes(typeof parsedValue)) {
            return parsedValue;
        }

        // Because typeof null === 'object'
        if (parsedValue === null) {
            return parsedValue;
        }

        // Non-primitive value is not allowed and should only be a result of manual URL edit
        return undefined;
    } catch {
        // JSON parse error, fallback to undefined
        return undefined;
    }
}

export function stringifyUrlData<Type extends StringifyablePrimitive>(value: Type): string;
export function stringifyUrlData(value: undefined): undefined;
export function stringifyUrlData<Type extends StringifyablePrimitive>(value?: Type): string | undefined;
export function stringifyUrlData<Type extends StringifyablePrimitive>(value?: Type): string | undefined {
    return value !== undefined ? JSON.stringify(value) : undefined;
}
