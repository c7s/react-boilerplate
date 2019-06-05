import { isCompositionOf, isNumber, isOneOf } from '../index';

const VALIDATOR_COMPOSITION = {
    foo: isOneOf({ items: ['bar', 'baz'] }),
    bar: isNumber(),
};

const CORRECT_TEST_OBJECT = {
    foo: 'bar',
    bar: 42,
};

const INCORRECT_TEST_OBJECT = {
    foo: 'foo',
    bar: '42',
};

it("doesn't complain about correct composition", () => {
    expect(isCompositionOf({ items: VALIDATOR_COMPOSITION })(CORRECT_TEST_OBJECT)).toBe(undefined);
});

it('complains about incorrect composition', () => {
    expect(typeof isCompositionOf({ items: VALIDATOR_COMPOSITION })(INCORRECT_TEST_OBJECT)).toBe('string');
});

it('considers optional message', () => {
    expect(isCompositionOf({ message: 'test', items: VALIDATOR_COMPOSITION })(INCORRECT_TEST_OBJECT)).toBe('test');
    expect(isCompositionOf({ message: 'test', items: VALIDATOR_COMPOSITION })(undefined)).toBe('test');
});

it('provides meaningful default message', () => {
    expect(isCompositionOf({ items: VALIDATOR_COMPOSITION })(INCORRECT_TEST_OBJECT)).toMatch(/number/);
    expect(isCompositionOf({ items: VALIDATOR_COMPOSITION })(INCORRECT_TEST_OBJECT)).toMatch(/one of/);
});
