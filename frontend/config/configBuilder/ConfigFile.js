'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const path = require('path');
const Helper_1 = require('./Helper');
/**
 * Represents config file acquired from either single file or directory
 * of files
 */
class ConfigFile {
    constructor(filepath) {
        this.path_ = filepath;
    }
    get path() {
        return this.path_;
    }
    get filename() {
        return path.basename(this.path);
    }
    /**
     * returns filename without extension
     */
    get name() {
        return path.parse(this.filename).name;
    }
    get extension() {
        return path.extname(this.filename);
    }
    /**
     * returns content in json format
     */
    getContent() {
        let result = {};
        if (Helper_1.Helper.isDirectory(this.path)) {
            const paths = Helper_1.Helper.getConfigFilePathList(this.path);
            result = paths.reduce((prev, next) => Object.assign(prev, require(next)), {});
        } else {
            result = require(this.path);
        }
        return result;
    }
}
exports.ConfigFile = ConfigFile;
