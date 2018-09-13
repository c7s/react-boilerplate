import { QueryResult } from 'react-apollo';
import { StyledComponentsOuterProps, StyledComponentsInnerProps } from '../../../common/lib/BaseProps';
import { Licenses } from './ApolloTypes/Licenses';

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

/** Local Component State Updaters. Must return void. Are called asynchronously and can't contain asynchronous code */
export interface StateUpdaters {}

/** Handlers. Must return void. Are called synchronously and can contain asynchronous code */
export interface Handlers {}

/** Theme object inside stateless component and each styled-component */
export interface Theme {}

/** Outer themeType is transformed into inner theme */
export enum ThemeType {
    DEFAULT = 'default',
}

export type PropsStore = Store & StoreUpdaters & { dispatch?<A extends { type: string }>(action: A): A };
export type PropsBehaviour = State & StateUpdaters & Handlers;
export type CurrentStyledComponentsOuterProps = StyledComponentsOuterProps<ThemeType>;
export type CurrentStyledComponentsInnerProps = StyledComponentsInnerProps<Theme>;

/** Define interfaces for inner components props here. They must extend CurrentStyledComponentsInnerProps
 *  I.e. interface RootProps extends CurrentStyledComponentsInnerProps {rootSpecificValue: string};
 */

/** Define your own types and interfaces here.
 *  I.e. type Point = {x: number; y: number};
 */
