/** Sizes are mobile-first. First value is minimal body width */

// Pixels
enum Width {
    S = 320,
    M = 768,
    L = 1024,
    XL = 1440,
}

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

export { mediaWidth, Width };
