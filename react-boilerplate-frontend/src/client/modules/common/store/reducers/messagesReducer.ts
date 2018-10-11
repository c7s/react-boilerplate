import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { onMessageAdd, onMessageRemove } from '../actions';
import { Message, Messages } from '../types';

export const messagesReducer = reducerWithInitialState<{}>({})
    .case(onMessageAdd, onMessageAddHandler)
    .case(onMessageRemove, onMessageRemoveHandler);

function onMessageAddHandler(state: Messages, notification: Message): Messages {
    return { ...state, [Date.now()]: notification };
}

function onMessageRemoveHandler(state: Messages, timestampKey: string): Messages {
    const newState = { ...state };
    delete newState[timestampKey];

    return newState;
}
