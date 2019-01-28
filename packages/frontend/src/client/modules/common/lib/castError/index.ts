import { ApolloError } from 'apollo-client';
import { ErrorResponse } from 'apollo-link-error';

type UncastedError = ApolloError | ErrorResponse | Error;

interface CastedError {
    userDisplayedMessage: string;
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
    if (isApolloError(error)) return castAsApolloError(error);
    if (isErrorResponse(error)) return castAsErrorResponse(error);
    if (isError(error)) return castAsError(error);

    throw new Error('Uncastable error');
}

function castAsApolloError(error: ApolloError): CastedError {
    const castedError = getCastedError(UNKNOWN_ERROR_HEADER, UNKNOWN_ERROR_TEXT, error.message);

    if (error.networkError) {
        castedError.header = NETWORK_ERROR_HEADER;
        castedError.text = mapNetworkErrorCodeToText((error.networkError as any).statusCode);
    } else if (error.graphQLErrors.length) {
        castedError.header = SERVER_ERROR_HEADER;
        castedError.text = error.graphQLErrors.map(mapGraphqlErrorCodeToText).join('\n');
    }

    return castedError;
}

function castAsErrorResponse(error: ErrorResponse): CastedError {
    const castedError = getCastedError(UNKNOWN_ERROR_HEADER, UNKNOWN_ERROR_TEXT);

    if (error.networkError) {
        castedError.header = NETWORK_ERROR_HEADER;
        castedError.text = mapNetworkErrorCodeToText((error.networkError as any).statusCode);
        castedError.details = error.networkError.message;
    } else if (error.graphQLErrors && error.graphQLErrors.length) {
        castedError.header = SERVER_ERROR_HEADER;
        castedError.text = error.graphQLErrors.map(mapGraphqlErrorCodeToText).join('\n');
        castedError.details = error.graphQLErrors.map(error => error.message).join(', ');
    }

    return castedError;
}

function castAsError(error: Error): CastedError {
    return getCastedError(CLIENT_ERROR_HEADER, CLIENT_ERROR_TEXT, error.message);
}

function mapGraphqlErrorCodeToText(error: ApolloError['graphQLErrors'][0]): string {
    switch (error.message) {
        /**
         * case ApolloError.USER_NOT_LOGGED_IN:
         *     return 'Требуется авторизация';
         */
        default:
            return SERVER_ERROR_TEXT;
    }
}

function mapNetworkErrorCodeToText(statusCode: number): string {
    switch (statusCode) {
        case 400:
            return 'Некорректный запрос. Возможно, указаны неправильные данные.';
        default:
            return NETWORK_ERROR_TEXT;
    }
}

function getCastedError(header: string, text: string, details?: string): CastedError {
    return {
        header,
        text,
        details,
        get userDisplayedMessage() {
            return `${this.header}: ${this.text}${this.details ? ` (${this.details})` : ''}`;
        },
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
