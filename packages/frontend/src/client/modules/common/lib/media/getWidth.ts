import { Width } from './mediaWidth';

function getWidth(): Width {
    if (SSR_MODE) {
        throw new Error('getWidth is client-side only operation');
    }

    if (window.matchMedia(`(min-width: ${Width.XL}px)`).matches) {
        return Width.XL;
    }

    if (window.matchMedia(`(min-width: ${Width.L}px)`).matches) {
        return Width.L;
    }

    if (window.matchMedia(`(min-width: ${Width.M}px)`).matches) {
        return Width.M;
    }

    return Width.S;
}

export { getWidth };
