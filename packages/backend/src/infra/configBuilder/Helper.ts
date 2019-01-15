import { extname, join } from 'path';
import { lstatSync, readdirSync } from 'fs';

type ConfigPathOptions = {
    isConsideringFractured?: boolean;
};

export class Helper {
    public static getConfigFilePathList(directory: string): string[] {
        return Helper.getConfigPathList(directory);
    }

    public static getConfigAllPathList(directory: string): string[] {
        return Helper.getConfigPathList(directory, {
            isConsideringFractured: true,
        });
    }

    public static isDirectory(path: string): boolean {
        try {
            return lstatSync(path).isDirectory();
        } catch (e) {
            if (e.code === 'ENOENT') {
                return false;
            } else {
                throw e;
            }
        }
    }

    private static getConfigPathList(
        directory: string,
        options: ConfigPathOptions = {}
    ): string[] {
        return readdirSync(directory)
            .filter(filename => {
                const ext = extname(filename);
                return ext === '.js' || ext === '.json' || (
                    options.isConsideringFractured &&
                    Helper.isDirectory(join(directory, filename))
                )
            }).map(filename => join(directory, filename));
    }
}
