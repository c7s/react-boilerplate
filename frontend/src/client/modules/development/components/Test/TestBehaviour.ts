import { withBehaviour } from '../../../common/lib/withBehaviour';
import { PropsExternal, State, StateUpdaters, Handlers, PropsStore, PropsApollo } from './TestType';

const TestBehaviour = withBehaviour<State, StateUpdaters, Handlers, OuterProps>(
    {},
    /** State updaters are called asynchronously and must not contain asynchronous code */
    {},
    () => {
        /** Data that is not displaying in GUI, but is shareable between handlers (i.e. refs and timer ids) */

        /** Handlers are called synchronously and may contain asynchronous code */
        return {};
    },
    {},
);

type OuterProps = PropsExternal & PropsStore & PropsApollo;

export { TestBehaviour };
