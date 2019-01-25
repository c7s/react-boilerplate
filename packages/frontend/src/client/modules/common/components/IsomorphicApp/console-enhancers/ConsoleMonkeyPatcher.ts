/** Groups [HMR] logs for clear console */
class ConsoleMonkeyPatcher {
    isHmrGroup: boolean = false;
    console: Console;

    constructor(console: Console) {
        this.console = { ...console };

        Object.keys(console).forEach(consoleFunctionName => {
            (console as any)[consoleFunctionName] = this.patchedConsoleFunction.bind(this, consoleFunctionName);
        });
    }

    private patchedConsoleFunction(consoleFunctionName: string, ...args: unknown[]) {
        this.updateHrmGroupState(String(args[0]));
        (this.console as any)[consoleFunctionName](...args);
    }

    private updateHrmGroupState(message: string) {
        if (this.isHmrGroup && !message.includes('[HMR]')) {
            this.console.groupEnd();
            this.isHmrGroup = false;
        } else if (!this.isHmrGroup && message.includes('[HMR]')) {
            this.console.groupCollapsed('[HMR] Group');
            this.isHmrGroup = true;
        }
    }
}

export { ConsoleMonkeyPatcher };
