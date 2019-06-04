import { isOneOf } from '../index';

const ITEMS = [true, 42];

it("doesn't complain about array variants", () => {
    expect(isOneOf({ items: ITEMS })(true)).toBe(undefined);
    expect(isOneOf({ items: ITEMS })(42)).toBe(undefined);
});

it('complains about non-array variants', () => {
    expect(typeof isOneOf({ items: ITEMS })('test value')).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })(24)).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })(null)).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })(false)).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })(undefined)).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })(Symbol('test'))).toBe('string');
    expect(typeof isOneOf({ items: ITEMS })({})).toBe('string');
});

it('considers optional message', () => {
    expect(isOneOf({ message: 'test message', items: ITEMS })('test value')).toEqual('test message');
});

it('provides meaningful default message', () => {
    expect(isOneOf({ items: ITEMS })('testValue')).toMatch(/one of/);
    expect(isOneOf({ items: ITEMS })('testValue')).toMatch(/true/);
    expect(isOneOf({ items: ITEMS })('testValue')).toMatch(/42/);
});

it('works with empty arrays', () => {
    expect(typeof isOneOf({ items: [] })('42')).toBe('string');
});
