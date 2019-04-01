import { ApolloError } from 'apollo-client';
import { ErrorResponse } from 'apollo-link-error';

/** Add more types depending on your needs */
export type Message = ErrorResponse | ApolloError | Error;

/** Key is timestamp (number) */
export interface Messages {
    [key: string]: Message;
}
