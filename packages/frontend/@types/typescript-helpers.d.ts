/** https://stackoverflow.com/a/50014868/7785430 */
type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

/** https://stackoverflow.com/a/50677584/7785430 */
type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any;

/** https://stackoverflow.com/a/50084862/7785430 */
type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<infer TProps>
    ? TProps
    : TComponentOrTProps;

type Nullable<T> = { [P in keyof T]: T[P] | null };
type OfType<T, TYPE> = { [P in keyof T]: TYPE };
type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V> ? T : never;
type EnumedDict<Y extends string, T> = { [P in Y]: T };

interface SuccessCallback<R = never> {
    (result: R): void;
}
interface ErrorCallback<E = Error> {
    (error: E): void;
}
