import { isString } from '../index';

it("doesn't complain about string", () => {
    expect(isString()('test')).toBe(undefined);
});

it('complains about non-string', () => {
    expect(typeof isString()(42)).toBe('string');
    expect(typeof isString()(true)).toBe('string');
    expect(typeof isString()(null)).toBe('string');
    expect(typeof isString()(undefined)).toBe('string');
    expect(typeof isString()(Symbol('test'))).toBe('string');
    expect(typeof isString()({})).toBe('string');
});

it('considers optional message', () => {
    expect(isString({ message: 'test message' })(42)).toEqual('test message');
});

it('provides meaningful default message', () => {
    expect(isString()(42)).toMatch(/string/);
});
