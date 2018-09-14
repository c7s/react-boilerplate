import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../../../fonts';

const actionCreator = actionCreatorFactory('COMMON');

export const onFontLoad = actionCreator<FontFamily>('ON_FONT_LOAD');

export const onRootVisit = actionCreator('ON_ROOT_VISIT');
