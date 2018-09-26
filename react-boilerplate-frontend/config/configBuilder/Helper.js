'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const path = require('path');
const fs = require('fs');
class Helper {
    constructor() {}
    static getConfigFilePathList(directory) {
        return Helper.getConfigPathList(directory);
    }
    static getConfigAllPathList(directory) {
        return Helper.getConfigPathList(directory, {
            isConsideringFractured: true,
        });
    }
    static isDirectory(path) {
        try {
            return fs.lstatSync(path).isDirectory();
        } catch (e) {
            if (e.code === 'ENOENT') {
                return false;
            } else {
                throw e;
            }
        }
    }
    static getConfigPathList(directory, options) {
        options = options || {};
        return fs
            .readdirSync(directory)
            .filter(
                filename =>
                    path.extname(filename) === '.js' ||
                    path.extname(filename) === '.json' ||
                    (options && options.isConsideringFractured && Helper.isDirectory(path.join(directory, filename)))
            )
            .map(filename => path.join(directory, filename));
    }
}
exports.Helper = Helper;
