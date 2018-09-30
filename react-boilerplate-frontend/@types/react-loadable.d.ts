/** Official type Bundle lacks publicPath */

interface ReactLoadableBundle {
    id: number;
    name: string;
    file: string;
    publicPath: string;
}

interface ReactLoadableStats {
    [moduleId: string]: ReactLoadableBundle[];
}
