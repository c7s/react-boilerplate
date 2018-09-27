import { Width } from './mediaWidth';

function getWidth(exactWidth: number): Width {
    if (exactWidth >= Width.XL) {
        return Width.XL;
    }

    if (exactWidth >= Width.L) {
        return Width.L;
    }

    if (exactWidth >= Width.M) {
        return Width.M;
    }

    return Width.S;
}

export { getWidth };
