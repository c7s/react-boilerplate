import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../../../fonts';
import { FontVariant } from '../types';

const actionCreator = actionCreatorFactory('COMMON');

export const onFontLoad = actionCreator<FontFamily>('ON_FONT_LOAD');
export const onFontVariantLoad = actionCreator<{ fontFamily: FontFamily; fontVariant: FontVariant }>(
    'ON_FONT_VARIANT_LOAD',
);

export const onRootVisit = actionCreator('ON_ROOT_VISIT');
