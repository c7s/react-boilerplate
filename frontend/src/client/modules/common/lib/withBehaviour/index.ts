import { isEmpty } from 'lodash';
import {
    compose,
    InferableComponentEnhancerWithProps,
    lifecycle,
    mapper,
    ReactLifeCycleFunctions,
    withHandlers,
    withStateHandlers,
} from 'recompose';

export type StateUpdatersCreator<
    StateUpdaters extends { [key in keyof StateUpdaters]: Function },
    OuterProps,
    State
> = {
    [key in keyof StateUpdaters]: (
        state: State,
        props: OuterProps,
    ) => ReplaceReturnType<StateUpdaters[key], Partial<State>>
};

export type HandlersCreatorFactory<Handlers, OuterProps> = (
    initialProps: OuterProps,
) => HandlersCreator<Handlers, OuterProps>;

export type HandlersCreator<Handlers, OuterProps> = { [key in keyof Handlers]: (props: OuterProps) => Handlers[key] };

export type WithSetState<StateUpdaters, State> = StateUpdaters & { setState(statePart: Partial<State>): void };

export function withBehaviour<
    State,
    StateUpdaters extends { [key in keyof StateUpdaters]: Function },
    Handlers extends { [key in keyof Handlers]: Function },
    OuterProps
>(
    state: State | mapper<OuterProps, State>,
    stateUpdaters: StateUpdatersCreator<StateUpdaters, OuterProps, State>,
    handlers?:
        | HandlersCreator<Handlers, OuterProps & State & WithSetState<StateUpdaters, State>>
        | HandlersCreatorFactory<Handlers, OuterProps & State & WithSetState<StateUpdaters, State>>,
    lifecycleMethods?: Omit<
        ReactLifeCycleFunctions<OuterProps & State & WithSetState<StateUpdaters, State> & Handlers, {}>,
        'shouldComponentUpdate'
    >,
): InferableComponentEnhancerWithProps<State & StateUpdaters & Handlers, OuterProps> {
    const enhancers = [
        !isEmpty(state) || typeof state === 'function'
            ? withStateHandlers(state, {
                  setState: () => (statePart: Partial<State>) => ({ ...(statePart as any) }),
                  ...(stateUpdaters as any),
              } as any)
            : null,
        !isEmpty(handlers) || typeof handlers === 'function' ? withHandlers(handlers as any) : null,
        !isEmpty(lifecycleMethods) ? lifecycle(lifecycleMethods as any) : null,
    ].filter(value => Boolean(value));

    return compose(...(enhancers as Function[])) as any;
}
