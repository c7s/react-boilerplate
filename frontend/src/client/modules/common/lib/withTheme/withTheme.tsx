import { Dictionary } from 'lodash';
import * as React from 'react';
import { compose } from 'recompose';
import { ThemeProvider, withTheme as withThemeStyledComponents } from 'styled-components';
import { StyledComponentsOuterProps } from '../BaseProps';

type WithThemeProviderEnhancer<Props> = (Component: React.StatelessComponent<Props>) => React.ComponentClass<Props>;

function withTheme<
    THEME_TYPE extends string,
    Props extends StyledComponentsOuterProps<THEME_TYPE>,
    THEME extends object
>(themeDict: Dictionary<THEME>): WithThemeProviderEnhancer<Props> {
    return compose(
        (Component: React.ComponentClass<Props>) => {
            return ({ themeType, ...restProps }: StyledComponentsOuterProps<THEME_TYPE>) => (
                <ThemeProvider theme={themeType ? themeDict[themeType] : Object.values(themeDict)[0]}>
                    {/* TODO: remove any */}
                    {React.createElement(Component as any, restProps)}
                </ThemeProvider>
            );
        },
        withThemeStyledComponents,
    );
}

export { withTheme };
