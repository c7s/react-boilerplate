import { Dictionary } from 'async';
import { FontVariant } from 'fontfaceobserver';
import { injectGlobal } from 'styled-components';
import { bitter } from './Bitter';

injectGlobal`
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
const fontFamilyConfig: Dictionary<FontFamilyConfig> = {
    [FontFamily.BITTER]: {
        variants: [{}, { weight: 'bold' }, { style: 'italic' }],
        testString: TestString.LATIN,
        fallbackStack: 'Tahoma, Arial, sans-serif',
    },
};

export { FontFamily, fontFamilyConfig };
