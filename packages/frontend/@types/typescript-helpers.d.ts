type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true;
type ReplaceReturnType<T, TNewReturn> = T extends (
    a: infer A,
    b: infer B,
    c: infer C,
    d: infer D,
    e: infer E,
    f: infer F,
    g: infer G,
    h: infer H,
    i: infer I,
    j: infer J,
) => infer R
    ? (IsValidArg<J> extends true
          ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => TNewReturn
          : IsValidArg<I> extends true
              ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => TNewReturn
              : IsValidArg<H> extends true
                  ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => TNewReturn
                  : IsValidArg<G> extends true
                      ? (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => TNewReturn
                      : IsValidArg<F> extends true
                          ? (a: A, b: B, c: C, d: D, e: E, f: F) => TNewReturn
                          : IsValidArg<E> extends true
                              ? (a: A, b: B, c: C, d: D, e: E) => TNewReturn
                              : IsValidArg<D> extends true
                                  ? (a: A, b: B, c: C, d: D) => TNewReturn
                                  : IsValidArg<C> extends true
                                      ? (a: A, b: B, c: C) => TNewReturn
                                      : IsValidArg<B> extends true
                                          ? (a: A, b: B) => TNewReturn
                                          : IsValidArg<A> extends true ? (a: A) => TNewReturn : () => TNewReturn)
    : never;
type Nullable<T> = { [P in keyof T]: T[P] | null };
type OfType<T, TYPE> = { [P in keyof T]: TYPE };
type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;
interface SuccessCallback<R = never> {
    (result: R): void;
}
interface ErrorCallback<E = Error> {
    (error: E): void;
}
/** https://stackoverflow.com/a/50677584/7785430 */
type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;
