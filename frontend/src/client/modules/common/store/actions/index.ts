import { actionCreatorFactory } from 'typescript-fsa';
import { FontFamily } from '../../../../fonts';

const actionCreator = actionCreatorFactory('COMMON');

export const fontLoad = actionCreator<FontFamily>('FONT_LOAD');

export const rootVisit = actionCreator('ROOT_VISIT');
