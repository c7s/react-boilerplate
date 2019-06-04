import React from 'react';
import { Action } from './Action';
import { AppState } from './AppState';
import { rootReducer } from './rootReducer';

interface Props {
    children: React.ReactChild;
}

const INITIAL_STATE: AppState = {
    messages: {},
    loadedFontStatus: {},
};

const AppStateContext = React.createContext<AppState>(INITIAL_STATE);
const AppDispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

const AppStateProvider = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(rootReducer, INITIAL_STATE);

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
};
const useAppState = () => React.useContext(AppStateContext);
const useAppDispatch = () => React.useContext(AppDispatchContext);

export { AppStateProvider, useAppState, useAppDispatch, Action, AppStateContext, AppDispatchContext };
