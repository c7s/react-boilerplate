import { Dictionary } from 'lodash';
import * as React from 'react';
import { compose } from 'recompose';
import { ThemeProvider, withTheme as withThemeStyledComponents } from 'styled-components';
import { StyledComponentsProps } from '../BaseProps';

type WithThemeProviderEnhancer<Props> = (Component: React.ComponentType<Props>) => React.ComponentType<Props>;

function withTheme<THEME_NAME extends string, Props extends StyledComponentsProps<THEME_NAME>, THEME extends object>(
    themeDict: Dictionary<THEME>,
): WithThemeProviderEnhancer<Props> {
    return compose(
        (Component: React.ComponentClass<Props>) => {
            return ({ themeName, ...restProps }: StyledComponentsProps<THEME_NAME>) => (
                <ThemeProvider theme={themeName ? themeDict[themeName] : Object.values(themeDict)[0]}>
                    {/* TODO: remove any */}
                    {React.createElement(Component as any, restProps)}
                </ThemeProvider>
            );
        },
        withThemeStyledComponents,
    );
}

export { withTheme };
