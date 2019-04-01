import * as React from 'react';
import { compose } from 'redux';
import { ThemeProvider, withTheme as withThemeStyledComponents } from 'styled-components';
import { CommonInnerProps, CommonProps } from '../../types/CommonProps';

type ToInnerCommonProps<
    THEME_NAME extends string,
    THEME extends object,
    ELEMENT extends HTMLElement,
    Props extends CommonProps<THEME_NAME, ELEMENT>
> = Omit<Props, 'themeName'> & CommonInnerProps<THEME, ELEMENT>;

type WithThemeProviderEnhancer<
    THEME_NAME extends string,
    THEME extends object,
    ELEMENT extends HTMLElement,
    Props extends CommonProps<THEME_NAME, ELEMENT>
> = (Component: React.FC<ToInnerCommonProps<THEME_NAME, THEME, ELEMENT, Props>>) => React.FC<Props>;

function withTheme<
    THEME_NAME extends string,
    THEME extends object,
    ELEMENT extends HTMLElement,
    Props extends CommonProps<THEME_NAME, ELEMENT>
>(themeDict: EnumedDict<THEME_NAME, THEME>): WithThemeProviderEnhancer<THEME_NAME, THEME, ELEMENT, Props> {
    return compose(
        (Component: React.FC<Omit<Props, 'themeName'>>) => {
            /**
             * Should be Props instead of { themeName: THEME_NAME }, but
             * https://github.com/Microsoft/TypeScript/issues/10727
             */
            return React.forwardRef(({ themeName, ...restProps }: { themeName: THEME_NAME }, ref) => (
                <ThemeProvider theme={themeName ? themeDict[themeName] : Object.values(themeDict)[0]}>
                    {React.createElement(Component, {
                        ...(restProps as Omit<Props, 'themeName' | 'ref'>),
                        ref,
                    } as any)}
                </ThemeProvider>
            ));
        },
        withThemeStyledComponents,
    ) as any; /* Unavoidable any */
}

export { withTheme, ToInnerCommonProps };
