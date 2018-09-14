import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { onRootVisit } from '../actions';

export const isRootVisitedReducer = reducerWithInitialState<boolean>(false).case(onRootVisit, onRootVisitHandler);

function onRootVisitHandler(): boolean {
    return true;
}
