import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../lib/fonts';
import { FontVariant, Message } from '../types';

const actionCreator = actionCreatorFactory('COMMON');

export const onFontLoad = actionCreator<FontFamily>('ON_FONT_LOAD');
export const onFontVariantLoad = actionCreator<{ fontFamily: FontFamily; fontVariant: FontVariant }>(
    'ON_FONT_VARIANT_LOAD',
);

export const onMediaExactWidthChange = actionCreator<number>('ON_MEDIA_EXACT_WIDTH_CHANGE');

export const onMessageAdd = actionCreator<Message>('ON_MESSAGE_ADD');

export const onMessageRemove = actionCreator<string>('ON_MESSAGE_REMOVE');
