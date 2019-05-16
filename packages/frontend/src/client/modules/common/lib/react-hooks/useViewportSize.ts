import { throttle } from 'lodash';
import * as React from 'react';

/**
 * NOTE: Scrollbar appearance doesn't dispatch resize event and hence doesn't cause viewport size recalculation.
 *
 * In order to react to such situation, implement something like this:
 * - https://gist.github.com/AdamMcCormick/d5f718d2e9569acdf7def25e8266bb2a
 * - https://gist.github.com/OrganicPanda/8222636
 *
 * In short, ensure that 'resize' event is dispatched on scrollbar appearance.
 */

export enum Mode {
    EXACT = 'exact',
    LEAST = 'least',
    MOST = 'most',
}

interface Data {
    mode?: Mode;
    includeVerticalScrollbar?: boolean;
}

export function useViewportSize({ mode, includeVerticalScrollbar }: Data = {}) {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
        function getMostHeight(): number {
            const divForCalculation = document.createElement('div');
            divForCalculation.style.width = '0';
            divForCalculation.style.height = '100vh';
            divForCalculation.style.position = 'absolute';
            divForCalculation.style.pointerEvents = 'none';

            window.document.body.appendChild(divForCalculation);
            const result = divForCalculation.clientHeight;
            window.document.body.removeChild(divForCalculation);

            /**
             * Using 100vh height (will not consider iOS Safari bars)
             */
            return result;
        }

        function getExactHeight() {
            /**
             * Will result in jumpy behaviour on transition between top and bottom scroll
             * on iOS Safari (bottom bar and variable top bar affect height)
             */
            return window.innerHeight;
        }

        function getLeastHeight() {
            /**
             * Will consider iOS Safari bars and prevent scrolling on pages with viewport height
             */
            return document.documentElement.clientHeight;
        }

        const resizeHandler = throttle(() => {
            if (includeVerticalScrollbar) {
                setWidth(window.innerWidth);
            } else {
                setWidth(document.documentElement.clientWidth);
            }

            switch (mode) {
                default:
                case Mode.EXACT:
                    setHeight(getExactHeight());
                    break;
                case Mode.LEAST:
                    setHeight(getLeastHeight());
                    break;
                case Mode.MOST:
                    setHeight(getMostHeight());
                    break;
            }
        }, 100);

        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [includeVerticalScrollbar, mode]);

    return { width, height };
}
