import * as React from 'react';

export interface StyledComponentsProps<THEME_NAME extends string = never> {
    className?: string;
    themeName?: THEME_NAME;
    children?: React.ReactNode;
}

export interface StyledComponentsInnerProps<THEME extends object = never> {
    className?: string;
    theme?: THEME;
}
