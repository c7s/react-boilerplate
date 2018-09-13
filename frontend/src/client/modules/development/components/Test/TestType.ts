import * as React from 'react';
import { QueryResult } from 'react-apollo';
import { StyledComponentsInnerProps, StyledComponentsOuterProps } from '../../../common/lib/BaseProps';
import { Licenses } from './ApolloTypes/Licenses';

/** Эти типы - кусочки пропсов, получаемые от каждого слоя */

/** Props passed from outside. The only predefined interface that can extend anything */
export interface PropsExternal extends CurrentStyledComponentsOuterProps {}

/** Redux Store Props */
export interface Store {}

/** Redux Store Updaters (binded action creators). Must return void. */
export interface StoreUpdaters {}

/** Apollo Props. Queries and mutations.
 */
export interface PropsApollo {
    licenses: QueryResult<Licenses>;
}

/** Local Component State Props */
export interface State {}

/** Handlers. Must return void. Are called synchronously and can contain asynchronous code */
export interface Handlers {
    onClick: React.MouseEventHandler;
}

/** Theme object inside stateless component and each styled-component */
export interface Theme {}

/** Outer themeType is transformed into inner theme */
export enum ThemeType {
    DEFAULT = 'default',
}

/** Это генерируемый бойлерплейт, в который не надо смотреть. Он нужен для поддержания чистоты в остальных файлах */

export type PropsStore = Store & StoreUpdaters & { dispatch?<A extends { type: string }>(action: A): A };
export type PropsBehaviour = State & Handlers;
export type CurrentStyledComponentsOuterProps = StyledComponentsOuterProps<ThemeType>;
export type CurrentStyledComponentsInnerProps = StyledComponentsInnerProps<Theme>;

export type OuterPropsStore = PropsExternal;
export type OuterPropsApollo = PropsExternal & PropsStore;
export type OuterPropsBehaviour = PropsExternal & PropsStore & PropsApollo;
export type OuterPropsTheme = PropsExternal & PropsStore & PropsApollo & PropsBehaviour;
export type InnerProps = Omit<
    PropsExternal & PropsStore & PropsApollo & PropsBehaviour & CurrentStyledComponentsInnerProps,
    'themeType'
>;

/** Define interfaces for inner components props here. They must extend CurrentStyledComponentsInnerProps
 *  I.e. interface RootProps extends CurrentStyledComponentsInnerProps {rootSpecificValue: string};
 */

/** Define your own types and interfaces here.
 *  I.e. type Point = {x: number; y: number};
 */
