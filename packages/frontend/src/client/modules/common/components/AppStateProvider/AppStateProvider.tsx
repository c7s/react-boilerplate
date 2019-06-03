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

const StateContext = React.createContext<AppState>(INITIAL_STATE);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

const AppStateProvider = ({ children }: Props) => {
    const [state, dispatch] = React.useReducer(rootReducer, INITIAL_STATE);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
        </StateContext.Provider>
    );
};
const useAppState = () => React.useContext(StateContext);
const useAppDispatch = () => React.useContext(DispatchContext);

export { AppStateProvider, useAppState, useAppDispatch, Action };
