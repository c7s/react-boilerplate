import { css } from 'styled-components';
import { HEADER_HEIGHT } from '../../../components/Header';

/**
 * Enables scrolling to target DOM node (the one with 'id' attribute) with sticky header on top.
 * Doesn't work for flex elements.
 */
export function anchorForStickyHeader({
    display,
    paddingTop,
    additionalHeight,
}: {
    display?: 'block' | 'inline-block';
    paddingTop?: string;
    additionalHeight?: number;
}) {
    return css`
        display: ${display || 'block'};
        padding-top: 0;

        ::before {
            display: block;
            box-sizing: content-box;
            padding-top: ${paddingTop || 0};
            content: ' ';
            margin-top: ${`-${HEADER_HEIGHT + (additionalHeight || 0)}px`};
            height: ${`${HEADER_HEIGHT + (additionalHeight || 0)}px`};
            visibility: hidden;
            pointer-events: none;
        }
    `;
}
