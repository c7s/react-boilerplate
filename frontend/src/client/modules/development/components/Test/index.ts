import { compose } from 'recompose';
import { Test } from './Test';
import { TestApollo } from './TestApollo';
import { TestBehaviour } from './TestBehaviour';
import { TestStore } from './TestStore';
import { TestTheme } from './TestTheme';
import { PropsExternal, ThemeType } from './TestType';
import { TestUpdateCondition } from './TestUpdateCondition';

const EnhancedTest = compose<{}, PropsExternal>(
    TestStore,
    TestApollo,
    TestBehaviour,
    TestTheme,
    TestUpdateCondition,
)(Test);

export { EnhancedTest as Test, PropsExternal as TestProps, ThemeType as TestThemeType };
