import { DocumentNode } from 'graphql';
import { GET_LIST, GET_ONE, GET_MANY } from 'react-admin';
import { IsomorphicApolloClient } from '../../../common/lib/IsomorphicApolloClient';
import { getListResourceGraphql, getManyResourceGraphql, getOneResourceGraphql } from './Operations';
import { ResourceName } from './ResourceName';

interface Params {
    id: number;
    ids: number[];
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
    | { pagination: { offset: number; limit: number }; sort: null | { fields: { type: string; field: string }[] } };

type Response = EnumedDict<ResourceName, { one: object; many: { items: object[]; pagination: { findCount: number } } }>;

export const dataProvider = () => {
    const convertRequest = (type: string, resource: ResourceName, params: Params) => {
        let gqlDocument: DocumentNode;
        let variables: Variables;
        const isQuery = true;

        switch (type) {
            case GET_ONE: {
                gqlDocument = getOneResourceGraphql[resource];
                variables = { id: params.id };
                break;
            }
            case GET_MANY: {
                gqlDocument = getManyResourceGraphql[resource];
                variables = { ids: params.ids };
                break;
            }
            case GET_LIST: {
                gqlDocument = getListResourceGraphql[resource];
                variables = {
                    pagination: {
                        offset: params.pagination.perPage * (params.pagination.page - 1),
                        limit: params.pagination.perPage,
                    },
                    sort: convertSortParamsToGQL(params.sort),
                };
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
            case GET_ONE: {
                result = { data: response[resource].one };
                break;
            }
            case GET_MANY: {
                result = { data: response[resource].many.items };
                break;
            }
            case GET_LIST: {
                result = {
                    data: response[resource].many.items,
                    total: response[resource].many.pagination.findCount,
                };
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
