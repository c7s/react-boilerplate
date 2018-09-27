import { LoadedFontStatus } from './LoadedFontStatus';
import { Media } from './Media';

export interface CommonState {
    loadedFontStatus: LoadedFontStatus;
    isRootVisited: boolean;
    media: Media;
}
