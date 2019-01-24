import { ConsoleMonkeyPatcher } from './ConsoleMonkeyPatcher';
import { logAppInfo } from './logAppInfo';

new ConsoleMonkeyPatcher(console);
logAppInfo();
