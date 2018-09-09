import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { rootVisit } from '../actions';

export const isRootVisitedReducer = reducerWithInitialState<boolean>(false).case(rootVisit, rootVisitHandler);

function rootVisitHandler(): boolean {
    return true;
}
