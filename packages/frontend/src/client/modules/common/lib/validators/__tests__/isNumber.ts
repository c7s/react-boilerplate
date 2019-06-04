import { isNumber } from '../index';

it("doesn't complain about number", () => {
    expect(isNumber()(42)).toBe(undefined);
});

it('complains about non-number', () => {
    expect(typeof isNumber()('test value')).toBe('string');
    expect(typeof isNumber()(true)).toBe('string');
    expect(typeof isNumber()(null)).toBe('string');
    expect(typeof isNumber()(undefined)).toBe('string');
    expect(typeof isNumber()(Symbol('test'))).toBe('string');
    expect(typeof isNumber()({})).toBe('string');
});

it('considers optional message', () => {
    expect(isNumber({ message: 'test message' })('test value')).toEqual('test message');
});

it('provides meaningful default message', () => {
    expect(isNumber()('testValue')).toMatch(/number/);
});
