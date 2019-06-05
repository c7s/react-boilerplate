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

export const isCompositionOf = (args: { message?: string; items: { [key: string]: Validator } }) => (
    value: unknown,
) => {
    if (typeof value === 'object' && value) {
        const messages: string[] = [];
        Object.entries(args.items).forEach(([validatorKey, validator]) => {
            const validationResult = validator((value as { [key: string]: unknown })[validatorKey]);
            if (validationResult !== undefined) {
                messages.push(`${validatorKey}: ${validationResult}`);
            }
        });
        const message = messages.join('; ');

        return message ? args.message || message : undefined;
    }

    return (
        args.message ||
        Object.entries(args.items)
            .map(([validatorKey, validator]) => `${validatorKey}: ${validator(undefined)}`)
            .join('; ')
    );
};
