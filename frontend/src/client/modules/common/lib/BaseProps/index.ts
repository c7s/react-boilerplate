export interface StyledComponentsOuterProps<THEME_TYPE extends string = never> {
    className?: string;
    themeType?: THEME_TYPE;
}

export interface StyledComponentsInnerProps<THEME extends object = never> {
    className?: string;
    theme?: THEME;
}
