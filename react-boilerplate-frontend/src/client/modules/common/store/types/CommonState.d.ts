import { LoadedFontStatus } from './LoadedFontStatus';
import { Media } from './Media';
import { Messages } from './Messages';

export interface CommonState {
    loadedFontStatus: LoadedFontStatus;
    media: Media;
    messages: Messages;
}
