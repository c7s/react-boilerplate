import { ApolloError } from 'apollo-client';
import { ErrorResponse } from 'apollo-link-error';

export interface AppState {
    messages: Messages;
    loadedFontStatus: LoadedFontStatus;
}

export interface FontVariant {
    weight: number | string;
    style: string;
    stretch: string;
}

export interface FontData {
    isAllVariantsAvailable: boolean;
    availableVariants: FontVariant[];
}

export interface LoadedFontStatus {
    [key: string]: FontData | undefined;
}

/** Add more types depending on your needs */
export type Message = ErrorResponse | ApolloError | Error;

/** Key is timestamp (number) */
export interface Messages {
    [key: string]: Message;
}
