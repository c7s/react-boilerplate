import { fontFamily } from './fontFamily';
import { FontFamily } from './fontFamilyConfig';
import { observeFontFamilies } from './observeFontFamilies';

// This function must be called client-side only and immediately
if (!SSR_MODE) {
    observeFontFamilies();
}

export { fontFamily, FontFamily };
