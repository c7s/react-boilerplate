import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';

/** External file */

interface SCOuterProps<THEME_NAME = string> {
    className?: string;
    themeName?: THEME_NAME;
}

interface SCInnerProps<THEME = string> {
    className?: string;
    theme?: THEME;
}

/** This file */

export interface OuterProps extends SCOuterProps {
    name?: string;
}

export type ReduxOuterProps = OuterProps &
    RouteComponentProps<{
        id: string;
    }> &
    SCOuterProps;

export interface FromReduxStateProps {
    loadedFontStatus: LoadedFontStatus;
}

export interface FromReduxDispatchProps {
    rootVisit(): void;
}

export type ApolloOuterProps = OuterProps &
    ReduxOuterProps &
    FromReduxStateProps &
    FromReduxDispatchProps &
    SCOuterProps;

export interface BehaviourOuterProps extends SCOuterProps {
    licenses: Licenses['licenses'];
    loadedFontStatus: LoadedFontStatus;
    rootVisit(): void;
    name?: string;
    id: string;
}

export interface BehaviourState {
    counter: number;
}

export interface ThemeOuterProps extends SCOuterProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    counter: number;
    licenses: Licenses['licenses'];
    loadedFontStatus: LoadedFontStatus;
    rootVisit(): void;
    name?: string;
    id: string;

    children?: React.ReactNode;
}

export type ComponentOuterProps = ThemeOuterProps & SCInnerProps;

/** Inner props */

/** Custom types */

/**
 * Плюсы:
 * - Можно перемапливать типы между слоями
 * Минусы:
 * - Нужно думать как на уровне "что входит", так и "что выходит"
 * - Сложно понять, из какого слоя взялся пропс
 * - Дублирование одинаковых частей интерфейсов
 * - Нужно тянуть в каждый интерфейс общие штуки только для прокидывания в tsx (SCOuterProps)
 */
