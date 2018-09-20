import * as React from 'react';

export interface CommonProps<THEME_NAME extends string = never> {
    children?: React.ReactNode;
    className?: string;
    themeName?: THEME_NAME;
}

export interface CommonInnerProps<THEME extends object = never> {
    children?: React.ReactNode;
    className?: string;
    theme?: THEME;
}
