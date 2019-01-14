import { start as replStart } from 'repl';
import { runInContext } from 'vm';

export function start(options: any = {})  {
    const { expose } = options;

    const repl = replStart({ eval: promisableEval });

    Object.assign(repl.context, expose);
}


function promisableEval(cmd, context, _filename, callback) {
    const result = runInContext(cmd, context);

    if(result instanceof Promise) {
        return result
        .then((v) => callback(null, v))
        .catch((e) => callback(e));
    }

    return callback(null, result);
}
