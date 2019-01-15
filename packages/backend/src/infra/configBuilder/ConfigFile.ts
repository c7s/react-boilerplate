import { basename, parse, extname } from 'path';
import { Helper } from './Helper';

/**
 * Represents config file acquired from either single file or directory
 * of files
 */
export class ConfigFile {
    private readonly path_: string;
    constructor(filepath: string) {
        this.path_ = filepath;
    }

    public get path(): string {
        return this.path_;
    }

    public get filename(): string {
        return basename(this.path);
    }

    /**
     * returns filename without extension
     */
    public get name(): string {
        return parse(this.filename).name;
    }

    public get extension(): string {
        return extname(this.filename);
    }

    /**
     * returns content in json format
     */
    public getContent(): any {
        if (Helper.isDirectory(this.path)) {
            const paths = Helper.getConfigFilePathList(this.path);

            return paths.reduce((prev, next) => {
                return {
                    ...prev,
                    ...require(next),
                };
            }, {});
        }

        return require(this.path);
    }
}
