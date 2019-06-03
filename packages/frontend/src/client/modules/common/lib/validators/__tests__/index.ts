import { isString } from '../index';

test("doesn't complain about string", () => {
    expect(isString()('test')).toBe(undefined);
});

test('complains about number with non-empty message', () => {
    const result = isString()(34);

    expect(typeof result).toBe('string');
    expect((result as string).length).toBeTruthy();
});

test('considers optional message', () => {
    expect(isString({ message: 'test message' })(34)).toEqual('test message');
});
