/** Sizes are mobile-first */

/** Pixels
 * [S,M): s width
 * [M,L): m width
 * [L,XL): l width
 * [XL,+∞): xl width
 */
enum Width {
    S = 0,
    M = 768,
    L = 1024,
    XL = 1440,
}

/** Must be between S and M. Minimal supported width */
const MIN_WIDTH = 320; // Pixels

interface MediaWidth {
    s: string;
    m: string;
    l: string;
    xl: string;
}

const mediaWidth: MediaWidth = Object.assign(
    {},
    ...Object.entries(Width).map(([key, value]) => ({ [key.toLowerCase()]: `@media (min-width: ${value}px)` })),
);

export { mediaWidth, Width, MIN_WIDTH };
