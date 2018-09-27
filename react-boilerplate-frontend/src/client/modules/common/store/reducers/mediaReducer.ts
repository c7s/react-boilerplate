import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { onMediaExactWidthChange } from '../actions';
import { Media } from '../types';

export const mediaReducer = reducerWithInitialState<Media>({ exactWidth: 0 }).case(
    onMediaExactWidthChange,
    onMediaExactWidthChangeHandler,
);

function onMediaExactWidthChangeHandler(state: Media, exactWidth: number): Media {
    return {
        ...state,
        exactWidth,
    };
}
