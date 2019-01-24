import autobind from 'autobind-decorator';

/** Groups [HMR] logs for clear console */
class ConsoleMonkeyPatcher {
    isHmrGroup: boolean = false;
    log: Console['log'];

    constructor(console: Console) {
        /* tslint:disable no-console */
        this.log = console.log;
        console.log = this.smartLog;
        /* tslint:enable */
    }

    @autobind
    private smartLog(message: string, ...args: any[]) {
        this.updateHrmGroupState(message);
        this.log(message, ...args);
    }

    private updateHrmGroupState(message: string) {
        if (this.isHmrGroup && !message.includes('[HMR]')) {
            console.groupEnd();
            this.isHmrGroup = false;
        } else if (!this.isHmrGroup && message.includes('[HMR]')) {
            console.groupCollapsed('[HMR] Group');
            this.isHmrGroup = true;
        }
    }
}

export { ConsoleMonkeyPatcher };
