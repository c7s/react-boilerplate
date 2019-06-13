import { DocumentNode } from 'graphql';
import { GET_LIST, GET_ONE, GET_MANY, CREATE, UPDATE, DELETE, DELETE_MANY } from 'react-admin';
import { IsomorphicApolloClient } from '../../../common/lib/IsomorphicApolloClient';
import {
    createGraphql,
    deleteManyGraphql,
    deleteGraphql,
    getListGraphql,
    getManyGraphql,
    getOneGraphql,
    updateGraphql,
} from './operations';
import { ResourceName } from './ResourceName';

interface Params {
    id: number;
    ids: number[];
    data: DataWithTypename;
    sort: Sort;
    pagination: Pagination;
}

interface Sort {
    field: string;
    order: string;
}

interface Pagination {
    page: number;
    perPage: number;
}

type Variables =
    | { id: number }
    | { ids: number[] }
    | { pagination: { offset: number; limit: number }; sort: null | { fields: { type: string; field: string }[] } }
    | { data: object };

type Response = EnumedDict<
    ResourceName,
    {
        one: object;
        many: { items: object[]; pagination: { findCount: number } };
        create: { one: object };
        update: { one: object };
        delete: { one: object; many: object[] };
    }
>;

export const dataProvider = () => {
    const convertRequest = (type: string, resource: ResourceName, params: Params) => {
        let gqlDocument: DocumentNode;
        let variables: Variables;
        let isQuery = true;

        switch (type) {
            case GET_ONE:
                gqlDocument = getOneGraphql[resource];
                variables = { id: params.id };
                break;
            case GET_MANY:
                gqlDocument = getManyGraphql[resource];
                variables = { ids: params.ids };
                break;
            case GET_LIST:
                gqlDocument = getListGraphql[resource];
                variables = {
                    pagination: {
                        offset: params.pagination.perPage * (params.pagination.page - 1),
                        limit: params.pagination.perPage,
                    },
                    sort: convertSortParamsToGQL(params.sort),
                };
                break;
            case CREATE:
                gqlDocument = createGraphql[resource];
                variables = { data: params.data };
                isQuery = false;
                break;
            case UPDATE: {
                gqlDocument = updateGraphql[resource];
                const { id, ...restData } = params.data;
                variables = { id, data: omitTypename(restData) };
                isQuery = false;
                break;
            }
            case DELETE:
                gqlDocument = deleteGraphql[resource];
                variables = { id: params.id };
                isQuery = false;
                break;
            case DELETE_MANY: {
                gqlDocument = deleteManyGraphql[resource];
                variables = { ids: params.ids };
                isQuery = false;
                break;
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }

        return { gqlDocument, variables, isQuery };
    };

    const convertResponse = (response: Response, type: string, resource: ResourceName) => {
        let result = {};
        switch (type) {
            case GET_ONE:
                result = { data: response[resource].one };
                break;
            case GET_MANY:
                result = { data: response[resource].many.items };
                break;
            case GET_LIST:
                result = {
                    data: response[resource].many.items,
                    total: response[resource].many.pagination.findCount,
                };
                break;
            case CREATE:
                result = { data: response[resource].create.one };
                break;
            case UPDATE:
                result = { data: response[resource].update.one };
                break;
            case DELETE: {
                result = { data: response[resource].delete.one };
                break;
            }
            case DELETE_MANY: {
                result = { data: response[resource].delete.many };
                break;
            }
            default: {
                throw new Error(`Unsupported response type ${type}`);
            }
        }
        return result;
    };

    return async (type: string, resource: ResourceName, params: Params) => {
        const { gqlDocument, variables, isQuery } = convertRequest(type, resource, params);

        const response = await (isQuery
            ? IsomorphicApolloClient.getClient().query({ query: gqlDocument, variables })
            : IsomorphicApolloClient.getClient().mutate({ mutation: gqlDocument, variables }));

        return convertResponse(response.data, type, resource);
    };
};

function convertSortParamsToGQL(sortParams: Sort) {
    let sortParamsGQL: { fields: { field: string; type: string }[] } | null = null;

    if (sortParams.field) {
        sortParamsGQL = {
            fields: [
                {
                    field: sortParams.field,
                    type: sortParams.order.toUpperCase(),
                },
            ],
        };
    }

    return sortParamsGQL;
}

interface DataWithTypename {
    [key: string]: string | number | boolean | null | undefined | DataWithTypename;
    __typename: string;
}

function omitTypename(data: DataWithTypename): Record<string, any> {
    /* eslint-disable no-underscore-dangle,no-param-reassign */
    delete data.__typename;

    Object.values(data).forEach(value => {
        if (typeof value === 'object' && value !== null) {
            omitTypename(value);
        }
    });
    return data;
}
