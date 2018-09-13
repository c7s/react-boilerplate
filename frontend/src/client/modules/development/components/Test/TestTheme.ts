import { Dictionary } from 'lodash';
import { withTheme } from '../../../common/lib/withTheme';
import { Theme, ThemeType } from './TestType';

const baseTheme: Theme = {};

const themeDict: Dictionary<Theme> = {
    [ThemeType.DEFAULT]: {
        ...baseTheme,
    },
};

const TestTheme = withTheme(themeDict);

export { TestTheme };
