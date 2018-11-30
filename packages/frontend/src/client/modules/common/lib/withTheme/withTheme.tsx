import * as React from 'react';
import { compose } from 'redux';
import { ThemeProvider, withTheme as withThemeStyledComponents } from 'styled-components';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';

type WithThemeProviderEnhancer<
    THEME_NAME extends string,
    THEME extends object,
    Props extends CommonProps<THEME_NAME>
> = (
    Component: React.StatelessComponent<Omit<Props, 'themeName'> & CommonInnerProps<THEME>>,
) => React.StatelessComponent<Props>;

function withTheme<THEME_NAME extends string, THEME extends object, Props extends CommonProps<THEME_NAME>>(
    themeDict: EnumedDict<THEME_NAME, THEME>,
): WithThemeProviderEnhancer<THEME_NAME, THEME, Props> {
    return compose(
        (Component: React.StatelessComponent<Omit<Props, 'themeName'>>) => {
            /**
             * Should be Props instead of { themeName: THEME_NAME }, but
             * https://github.com/Microsoft/TypeScript/issues/10727
             */
            return ({ themeName, ...restProps }: { themeName: THEME_NAME }) => (
                <ThemeProvider theme={themeName ? themeDict[themeName] : Object.values(themeDict)[0]}>
                    {React.createElement(Component, restProps as Omit<Props, 'themeName'>)}
                </ThemeProvider>
            );
        },
        withThemeStyledComponents,
    ) as any; /* Unavoidable any */
}

export { withTheme };
