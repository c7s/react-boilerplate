import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../../../fonts';

const actionCreator = actionCreatorFactory('COMMON');

export const onFontLoad = actionCreator<FontFamily>('ON_FONT_LOAD');

export const onFontsLoadTimeout = actionCreator('ON_FONT_LOAD_TIMEOUT');

export const onRootVisit = actionCreator('ON_ROOT_VISIT');
