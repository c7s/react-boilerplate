/** Sizes are mobile-first. First value is minimal body width */

// Pixels
enum Width {
    S = 320,
    M = 768,
    L = 1024,
    XL = 1440,
}

function mediaWidth(width: Width) {
    return `@media (min-width: ${width}px)`;
}

export { mediaWidth, Width };
