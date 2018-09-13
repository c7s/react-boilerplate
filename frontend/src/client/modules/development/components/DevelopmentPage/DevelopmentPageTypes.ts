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

export interface FromOuterProps extends SCOuterProps {
    name?: string;
}

export type FromRouterProps = RouteComponentProps<{
    id: string;
}>;

export interface FromReduxStateProps {
    loadedFontStatus: LoadedFontStatus;
}

export interface FromReduxDispatchProps {
    rootVisit(): void;
}

export interface FromApolloProps {
    licenses: Licenses['licenses'];
}

export interface FromBehaviourProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface FromBehaviourStateProps {
    counter: number;
}

export type ReduxOuterProps = FromOuterProps & FromRouterProps;
export type ApolloOuterProps = ReduxOuterProps & FromReduxStateProps & FromReduxDispatchProps;
export type BehaviourOuterProps = ApolloOuterProps & FromApolloProps;
export type ThemeOuterProps = BehaviourOuterProps &
    FromBehaviourProps &
    FromBehaviourStateProps &
    SCOuterProps & { children?: React.ReactNode };
export type ComponentOuterProps = ThemeOuterProps & SCInnerProps;

/** Inner props */

/** Custom types */

/**
 * Плюсы:
 * - Можно убирать и добавлять интерфейсы, и при этом типы не сломаются (удобно для генератора)
 * - Не нужно дублировать одинаковые части интерфейсов
 * - Единый стиль слоев - каждый слой добавляет свои пропсы (то же и внутри слоев)
 * Минусы:
 * - Нельзя перемапливать пропсы между слоями
 * - Как следствие, могут быть лишние ререндеры из-за передачи в tsx ненужных пропсов (чинить через shouldComponentUpdate)
 */
