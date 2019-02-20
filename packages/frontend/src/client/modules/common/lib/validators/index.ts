export type Validator = (value: unknown) => string | undefined;

export const isString = (args?: { message?: string }) => (value: unknown) => {
    return typeof value !== 'string' ? (args && args.message) || 'Must be string' : undefined;
};

export const isNumber = (args?: { message?: string }) => (value: unknown) => {
    return typeof value !== 'number' ? (args && args.message) || 'Must be number' : undefined;
};

export const isBoolean = (args?: { message?: string }) => (value: unknown) => {
    return typeof value !== 'boolean' ? (args && args.message) || 'Must be boolean' : undefined;
};

export const isOneOf = (args: { message?: string; items: unknown[] }) => (value: unknown) => {
    return !args.items.includes(value)
        ? (args && args.message) || `Must be one of: ${args.items.join(', ')}`
        : undefined;
};
