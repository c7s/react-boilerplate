import { ApolloError } from 'apollo-client';
import { ErrorResponse } from 'apollo-link-error';

type UncastedError = ApolloError | ErrorResponse | Error;

interface CastedError {
    header: string;
    text: string;
    details?: string;
}

const NETWORK_ERROR_HEADER = 'Ошибка сети';
const SERVER_ERROR_HEADER = 'Ошибка сервера';
const CLIENT_ERROR_HEADER = 'Внутренняя ошибка';
const UNKNOWN_ERROR_HEADER = 'Неизвестная ошибка';

const NETWORK_ERROR_TEXT = 'Наша сеть недоступна. Проверьте соединение с интернетом или попробуйте позже.';
const SERVER_ERROR_TEXT = 'Похоже, у нас проблемы. Попробуйте позже.';
const CLIENT_ERROR_TEXT = 'Попробуйте обновить страницу.';
const UNKNOWN_ERROR_TEXT = 'Попробуйте обновить страницу.';

/** Converts given error to human readable format */
function castError(error: UncastedError): CastedError {
    if (isError(error)) return castAsError(error);
    if (isApolloError(error)) return castAsApolloError(error);
    if (isErrorResponse(error)) return castAsErrorResponse(error);

    throw new Error('Uncastable error');
}

function castAsApolloError(error: ApolloError): CastedError {
    const castedError: CastedError = {
        header: UNKNOWN_ERROR_HEADER,
        text: UNKNOWN_ERROR_TEXT,
        details: error.message,
    };

    if (error.networkError) {
        castedError.header = NETWORK_ERROR_HEADER;
        castedError.text = NETWORK_ERROR_TEXT;
    } else if (error.graphQLErrors.length) {
        castedError.header = SERVER_ERROR_HEADER;
        /** Map error code, if any, to whatever human-readable advice */
        castedError.text = SERVER_ERROR_TEXT;
    }

    return castedError;
}

function castAsErrorResponse(error: ErrorResponse): CastedError {
    const castedError: CastedError = {
        header: UNKNOWN_ERROR_HEADER,
        text: UNKNOWN_ERROR_TEXT,
    };

    if (error.networkError) {
        castedError.header = NETWORK_ERROR_HEADER;
        castedError.text = NETWORK_ERROR_TEXT;
        castedError.details = error.networkError.message;
    } else if (error.graphQLErrors && error.graphQLErrors.length) {
        castedError.header = SERVER_ERROR_HEADER;
        /** Map error code, if any, to whatever human-readable advice */
        castedError.text = SERVER_ERROR_TEXT;
        castedError.details = error.graphQLErrors.map(error => error.message).join(', ');
    }

    return castedError;
}

function castAsError(error: Error): CastedError {
    return {
        header: CLIENT_ERROR_HEADER,
        text: CLIENT_ERROR_TEXT,
        details: error.message,
    };
}

function isApolloError(error: UncastedError): error is ApolloError {
    return (error as ApolloError).message !== undefined && (error as ApolloError).graphQLErrors !== undefined;
}

function isErrorResponse(error: UncastedError): error is ErrorResponse {
    return (error as ErrorResponse).operation !== undefined;
}

function isError(error: UncastedError): error is Error {
    return (error as Error).name !== undefined;
}

export { castError, CastedError, UncastedError };
