import { Action } from './Action';
import { AppState, LoadedFontStatus, Messages } from './AppState';

export function rootReducer({ messages, loadedFontStatus }: AppState, action: Action): AppState {
    return {
        messages: messagesReducer(messages, action),
        loadedFontStatus: loadedFontStatusReducer(loadedFontStatus, action),
    };
}

function messagesReducer(state: Messages, action: Action) {
    switch (action.type) {
        case 'MESSAGE/ADD': {
            return { ...state, [Date.now()]: action.value };
        }
        case 'MESSAGE/REMOVE': {
            const newState = { ...state };
            delete newState[action.value];

            return newState;
        }
        default:
            return state;
    }
}

function loadedFontStatusReducer(state: LoadedFontStatus, action: Action): LoadedFontStatus {
    switch (action.type) {
        case 'FONT/LOADED': {
            const currentStatus = state[action.value];

            return {
                ...state,
                [action.value]: {
                    availableVariants: currentStatus ? currentStatus.availableVariants : [],
                    isAllVariantsAvailable: true,
                },
            };
        }
        case 'FONT/VARIANT_LOADED': {
            const currentStatus = state[action.value.fontFamily];

            return {
                ...state,
                [action.value.fontFamily]: {
                    availableVariants: [
                        ...(currentStatus ? currentStatus.availableVariants : []),
                        action.value.fontVariant,
                    ],
                    isAllVariantsAvailable: currentStatus ? currentStatus.isAllVariantsAvailable : false,
                },
            };
        }
        default:
            return state;
    }
}
