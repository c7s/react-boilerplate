import { css, SimpleInterpolation, ThemedCssFunction } from 'styled-components';

/** Sizes are mobile-first. First value is minimal body width */

// Pixels
export enum Size {
    S = 320,
    M = 768,
    L = 1024,
    XL = 1440,
}

export interface MediaSizeTemplate {
    s: ThemedCssFunction<{}>;
    m: ThemedCssFunction<{}>;
    l: ThemedCssFunction<{}>;
    xl: ThemedCssFunction<{}>;
}

/** Unavoidable any */
export const size = Object.keys(Size)
    .map(key => key.toLowerCase())
    .reduce((acc: any, label: any) => {
        acc[label] = (template: TemplateStringsArray, ...args: SimpleInterpolation[]) => css`
            @media (min-width: ${Size[label.toUpperCase()]}px) {
                ${css(template, ...args)};
            }
        `;

        return acc;
    }, {}) as MediaSizeTemplate;

export function getSize(viewportWidth: number): Size {
    if (viewportWidth >= Size.XL) {
        return Size.XL;
    }

    if (viewportWidth >= Size.L) {
        return Size.L;
    }

    if (viewportWidth >= Size.M) {
        return Size.M;
    }

    return Size.S;
}
