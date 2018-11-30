import { FontVariant } from 'fontfaceobserver';
import { bitter } from './Bitter';
import { createGlobalFontsStyle } from './createFontStyleTag';

const GlobalFontsStyle = createGlobalFontsStyle`
    ${bitter};
`;

enum FontFamily {
    BITTER = 'Bitter',
}

enum TestString {
    LATIN = 'BESbwy',
    RUSSIAN = 'ИУЫицн',
}

interface FontFamilyConfig {
    variants: FontVariant[];
    testString: TestString;
    fallbackStack: string;
}

// Empty font variant means all values are 'normal'
const fontFamilyConfig: EnumedDict<FontFamily, FontFamilyConfig> = {
    [FontFamily.BITTER]: {
        variants: [{}, { weight: 'bold' }, { style: 'italic' }],
        testString: TestString.LATIN,
        fallbackStack: 'Tahoma, Arial, sans-serif',
    },
};

export { FontFamily, fontFamilyConfig, GlobalFontsStyle };
