import { FontFamily } from '../../lib/fonts';
import { FontVariant, Message } from './AppState';

export type Action = AddMessageAction | RemoveMessageAction | FontLoadedAction | FontVariantLoadedAction;

export interface AddMessageAction {
    type: 'MESSAGE/ADD';
    value: Message;
}

export interface RemoveMessageAction {
    type: 'MESSAGE/REMOVE';
    value: string;
}

export interface FontLoadedAction {
    type: 'FONT/LOADED';
    value: FontFamily;
}

export interface FontVariantLoadedAction {
    type: 'FONT/VARIANT_LOADED';
    value: { fontFamily: FontFamily; fontVariant: FontVariant };
}
