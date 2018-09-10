import { fontFamily } from './fontFamily';
import { FontFamily } from './fontFamilyConfig';
import { observeFontFamily } from './observeFontFamily';
import { withLoadedFontStatus } from './withLoadedFontStatus';

Object.values(FontFamily).map(observeFontFamily);

export { fontFamily, FontFamily, withLoadedFontStatus };
