import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../../../fonts';

const actionCreator = actionCreatorFactory('COMMON');

export const fontLoad = actionCreator<FontFamily>('FONT_LOAD');

export const onRootVisit = actionCreator('ON_ROOT_VISIT');
