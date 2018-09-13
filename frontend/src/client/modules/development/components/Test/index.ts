import { compose } from 'redux';
import { Test } from './Test';
import { TestApollo } from './TestApollo';
import { TestBehaviour } from './TestBehaviour';
import { TestStore } from './TestStore';
import { TestTheme } from './TestTheme';
import { PropsExternal, ThemeType } from './TestType';

/** Файл генерируется целиком, можно только реэкспортировать кастомные типы из TestType */

const EnhancedTest = compose(
    TestStore,
    TestApollo,
    TestBehaviour,
    TestTheme,
)(Test);

export { EnhancedTest as Test, PropsExternal as TestProps, ThemeType as TestThemeType };
