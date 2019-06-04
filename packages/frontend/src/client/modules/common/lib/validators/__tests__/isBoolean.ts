import { isBoolean } from '../index';

it("doesn't complain about boolean", () => {
    expect(isBoolean()(true)).toBe(undefined);
    expect(isBoolean()(false)).toBe(undefined);
});

it('complains about non-boolean', () => {
    expect(typeof isBoolean()('test value')).toBe('string');
    expect(typeof isBoolean()(42)).toBe('string');
    expect(typeof isBoolean()(null)).toBe('string');
    expect(typeof isBoolean()(undefined)).toBe('string');
    expect(typeof isBoolean()(Symbol('test'))).toBe('string');
    expect(typeof isBoolean()({})).toBe('string');
});

it('considers optional message', () => {
    expect(isBoolean({ message: 'test message' })('test value')).toEqual('test message');
});

it('provides meaningful default message', () => {
    expect(isBoolean()('testValue')).toMatch(/boolean/);
});
