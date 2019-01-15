import EventEmitter from 'events';

export abstract class Operation extends EventEmitter {
    protected abstract outputs: string[] = [];

    on(output: string, handler: (...args: any[]) => void) {
        if(this.outputs.indexOf(output) < 0) {
            throw new Error(`Invalid output "${output}" to operation ${this.constructor.name}.`);
        }

        return super.addListener(output, handler);
    }
}
