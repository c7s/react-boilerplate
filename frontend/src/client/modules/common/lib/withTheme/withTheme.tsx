import { Dictionary } from 'lodash';
import * as React from 'react';
import { compose } from 'recompose';
import { ThemeProvider, withTheme as withThemeStyledComponents } from 'styled-components';
import { CommonInnerProps, CommonProps } from '../CommonProps';

type WithThemeProviderEnhancer<
    THEME_NAME extends string,
    THEME extends object,
    Props extends CommonProps<THEME_NAME>
> = (
    Component: React.StatelessComponent<Omit<Props, 'themeName'> & CommonInnerProps<THEME>>,
) => React.StatelessComponent<Props>;

// TODO: Remove any
function withTheme<THEME_NAME extends string, THEME extends object, Props extends CommonProps<THEME_NAME>>(
    themeDict: Dictionary<THEME>,
): WithThemeProviderEnhancer<THEME_NAME, THEME, Props> {
    return compose(
        (Component: React.ComponentType<Props>) => {
            return ({ themeName, ...restProps }: CommonProps<THEME_NAME>) => (
                <ThemeProvider theme={themeName ? themeDict[themeName] : Object.values(themeDict)[0]}>
                    {React.createElement(Component as any, restProps)}
                </ThemeProvider>
            );
        },
        withThemeStyledComponents,
    ) as any;
}

export { withTheme };
