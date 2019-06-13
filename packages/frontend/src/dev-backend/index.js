/* eslint-disable */

/**
 * Example backend for demonstration purposes. You can run it via https://glitch.com
 */

const { ApolloServer, gql, ApolloError } = require('apollo-server');

let books = [
    {
        id: 1,
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 2,
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        relations: {
            author: {
                id: 3,
            },
        },
    },
    {
        id: 3,
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 4,
        title: 'Harry Potter and the Prisoner of Azkaban',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 5,
        title: 'Harry Potter and the Goblet of Fire',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 6,
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 7,
        title: 'Harry Potter and the Half-Blood Prince',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 8,
        title: 'Harry Potter and the Deathly Hallows',
        author: 'J.K. Rowling',
        relations: {
            author: {
                id: 2,
            },
        },
    },
    {
        id: 9,
        title: 'A Wizard of Earthsea',
        author: 'Ursula K. Le Guin',
        relations: {
            author: {
                id: 4,
            },
        },
    },
    {
        id: 10,
        title: 'The Tombs of Atuan',
        author: 'Ursula K. Le Guin',
        relations: {
            author: {
                id: 4,
            },
        },
    },
    {
        id: 11,
        title: 'The Farthest Shore',
        author: 'Ursula K. Le Guin',
        relations: {
            author: {
                id: 4,
            },
        },
    },
    {
        id: 12,
        title: 'Tehanu',
        author: 'Ursula K. Le Guin',
        relations: {
            author: {
                id: 4,
            },
        },
    },
];

let authors = [
    {
        id: 2,
        name: 'J.K. Rowling',
    },
    {
        id: 3,
        name: 'Michael Crichton',
    },
    {
        id: 4,
        name: 'Ursula K. Le Guin',
    },
];

const typeDefs = gql`
    type Query {
        book: BookQueryModule!
        author: AuthorQueryModule!
        serverError: ServerError!
        development: Development!
    }

    type Mutation {
        book: BookMutationModule!
        author: AuthorMutationModule!
    }

    type AuthorMutationModule {
        create: AuthorCreate!
        update: AuthorUpdate!
        delete: AuthorDelete!
    }

    type AuthorDelete {
        one(id: ID!): Author!
        many(ids: [ID!]!): [Author!]!
    }

    type AuthorCreate {
        one(data: AuthorCreateData!): Author!
    }

    type AuthorUpdate {
        one(id: ID!, data: AuthorUpdateData!): Author!
    }

    type BookMutationModule {
        create: BookCreate!
        update: BookUpdate!
        delete: BookDelete!
    }

    type BookDelete {
        one(id: ID!): Book!
        many(ids: [ID!]!): [Book!]!
    }

    type BookUpdate {
        one(id: ID!, data: BookUpdateData!): Book!
    }

    type BookCreate {
        one(data: BookCreateData!): Book!
    }

    input BookUpdateData {
        title: String
        relations: BookUpdateDataRelations
    }

    input BookUpdateDataRelations {
        author: IdentifiableEntity
    }

    input AuthorUpdateData {
        name: String
    }

    input AuthorCreateData {
        name: String!
    }

    input BookCreateData {
        title: String!
        relations: BookCreateDataRelations!
    }

    input BookCreateDataRelations {
        author: IdentifiableEntity!
    }

    input IdentifiableEntity {
        id: ID!
    }

    "Typical query operations on entity"
    type BookQueryModule {
        one(id: ID!): Book!
        many(sort: BookSort, pagination: PaginationParams, filter: BookFilter): BookListModule!
    }

    input BookFilter {
        fields: BookFieldsFilter
    }

    input BookFieldsFilter {
        id: IntegerFilter
    }

    input IntegerFilter {
        list: [Int!]
    }

    input PaginationParams {
        offset: Int
        limit: Int
    }

    input BookSort {
        fields: [BookFieldSort!]
    }

    input BookFieldSort {
        type: SortType
        field: BookSortField!
    }

    enum SortType {
        ASC
        DESC
    }

    enum BookSortField {
        id
        title
    }

    type BookListModule {
        items: [Book!]!
        pagination: Pagination!
    }

    "Typical query operations on entity"
    type AuthorQueryModule {
        one(id: ID!): Author!
        many(sort: AuthorSort, pagination: PaginationParams, filter: AuthorFilter): AuthorListModule!
    }

    input AuthorFilter {
        fields: AuthorFieldsFilter
    }

    input AuthorFieldsFilter {
        id: IntegerFilter
    }

    input AuthorSort {
        fields: [AuthorFieldSort!]
    }

    input AuthorFieldSort {
        type: SortType
        field: AuthorSortField!
    }

    enum AuthorSortField {
        id
        name
    }

    type AuthorListModule {
        items: [Author!]!
        pagination: Pagination!
    }

    type Book {
        id: ID!
        title: String!
        author: String! @deprecated(reason: "Use relations")
        relations: BookRelations!
    }

    type Author {
        id: ID!
        name: String!
    }

    type Pagination {
        totalCount: Int!
        findCount: Int!
    }

    type BookRelations {
        author: Author!
    }

    "All known server errors"
    enum ServerError {
        TEST_ERROR
        INTERNAL_SERVER_ERROR
        BOOK_NOT_FOUND
        AUTHOR_NOT_FOUND
        REFERENTIAL_INTEGRITY_CONSTRAINT_VIOLATION
    }

    "Just for testing stuff"
    type Development {
        books: [Book!]! @deprecated(reason: "Switch to BookQueryModule")
        "Test error throwing and loading time"
        currentTimestamp(returnError: ServerError, loadingTime: Int!): Float!
    }
`;

const ServerError = {
    TEST_ERROR: 'TEST_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    BOOK_NOT_FOUND: 'BOOK_NOT_FOUND',
    AUTHOR_NOT_FOUND: 'AUTHOR_NOT_FOUND',
    REFERENTIAL_INTEGRITY_CONSTRAINT_VIOLATION: 'REFERENTIAL_INTEGRITY_CONSTRAINT_VIOLATION',
};

const resolvers = {
    Query: {
        book: () => ({}),
        author: () => ({}),
        serverError: () => ServerError.TEST_ERROR,
        development: () => ({ books }),
    },
    Mutation: {
        book: () => ({}),
        author: () => ({}),
    },
    BookMutationModule: {
        create: () => ({}),
        update: () => ({}),
        delete: () => ({}),
    },
    AuthorMutationModule: {
        create: () => ({}),
        update: () => ({}),
        delete: () => ({}),
    },
    AuthorCreate: {
        one: (_, { data }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const newAuthor = { ...data, id: authors.length + 2 };

                    authors.push(newAuthor);

                    resolve(newAuthor);
                }, 30);
            }),
    },
    AuthorUpdate: {
        one: (_, { id, data }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const editingAuthor = authors.find(author => author.id == id);
                    Object.assign(editingAuthor, data);

                    resolve(editingAuthor);
                }, 30);
            }),
    },
    AuthorDelete: {
        one: (_, { id }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const isHasRelatedBooks = books.some(book => book.relations.author.id == id);

                    if (!isHasRelatedBooks) {
                        const deletingAuthor = authors.find(author => author.id == id);

                        authors = authors.filter(author => author.id != id);

                        resolve(deletingAuthor);
                    } else {
                        reject(
                            new ApolloError(
                                'Referential integrity constraint violation: author has related books',
                                ServerError.REFERENTIAL_INTEGRITY_CONSTRAINT_VIOLATION
                            )
                        );
                    }
                }, 30);
            }),
        many: (_, { ids }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const isHasRelatedBooks = books.some(book => ids.map(Number).includes(book.relations.author.id));

                    if (!isHasRelatedBooks) {
                        const deletingAuthors = authors.filter(author => ids.map(Number).includes(author.id));

                        authors = authors.filter(author => !ids.map(Number).includes(author.id));

                        resolve(deletingAuthors);
                    } else {
                        reject(
                            new ApolloError(
                                'Referential integrity constraint violation: author has related books',
                                ServerError.REFERENTIAL_INTEGRITY_CONSTRAINT_VIOLATION
                            )
                        );
                    }
                }, 30);
            }),
    },
    BookCreate: {
        one: (_, { data }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (authors.some(author => author.id == data.relations.author.id)) {
                        const newBook = { ...data, id: books.length + 1 };

                        books.push(newBook);

                        resolve(newBook);
                    } else {
                        reject(new ApolloError('Author was not found', ServerError.AUTHOR_NOT_FOUND));
                    }
                }, 30);
            }),
    },
    BookUpdate: {
        one: (_, { id, data }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const editingBook = books.find(book => book.id == id);
                    Object.assign(editingBook, data);

                    resolve(editingBook);
                }, 30);
            }),
    },
    BookDelete: {
        one: (_, { id }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const deletingBook = books.find(book => book.id == id);

                    books = books.filter(book => book.id != id);

                    resolve(deletingBook);
                }, 30);
            }),
        many: (_, { ids }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const deletingBooks = books.filter(book => ids.map(Number).includes(book.id));

                    books = books.filter(book => !ids.map(Number).includes(book.id));

                    resolve(deletingBooks);
                }, 30);
            }),
    },
    Development: {
        currentTimestamp: (_, { returnError, loadingTime }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (!returnError) {
                        resolve(Date.now());
                    }
                    reject(
                        new ApolloError(
                            returnError === ServerError.TEST_ERROR
                                ? 'Developer-readable message, not code'
                                : 'Unknown error',
                            returnError,
                            { additionalProperty: 'Some additional data' }
                        )
                    );
                }, loadingTime);
            }),
    },
    BookQueryModule: {
        one: (_, { id }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const book = books.find(book => book.id == id);

                    if (book) {
                        resolve(getBookWithRelations(book));
                    } else {
                        reject(new ApolloError('Book was not found', ServerError.BOOK_NOT_FOUND));
                    }
                });
            }, 30),
        many: (_, { sort, pagination, filter }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    let resultBooks = books;

                    resultBooks = performFilter(resultBooks, filter);

                    resultBooks = preformSort(resultBooks, sort);

                    const findCount = resultBooks.length;

                    resultBooks = performPagination(resultBooks, pagination);

                    resolve({
                        items: resultBooks.map(getBookWithRelations),
                        pagination: { findCount, totalCount: books.length },
                    });
                }, 30);
            }),
    },
    AuthorQueryModule: {
        one: (_, { id }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const author = authors.find(author => author.id == id);

                    if (author) {
                        resolve(author);
                    } else {
                        reject(new ApolloError('Author was not found', ServerError.AUTHOR_NOT_FOUND));
                    }
                });
            }, 30),
        many: (_, { sort, pagination, filter }) =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    let resultAuthors = authors;

                    resultAuthors = performFilter(resultAuthors, filter);

                    resultAuthors = preformSort(resultAuthors, sort);

                    const findCount = resultAuthors.length;

                    resultAuthors = performPagination(resultAuthors, pagination);

                    resolve({ items: resultAuthors, pagination: { findCount, totalCount: authors.length } });
                }, 30);
            }),
    },
};

function getBookWithRelations(book) {
    const author = authors.find(author => author.id == book.relations.author.id);
    const resultBook = { ...book };
    resultBook.relations = { author };
    return resultBook;
}

function preformSort(array, sort) {
    let resultArray = array;

    if (sort) {
        const { fields } = sort;

        if (fields) {
            fields.forEach(({ field, type = 'ASC' }) => {
                resultArray = resultArray.sort((first, second) => {
                    const result = first[field] > second[field] ? -1 : 1;

                    return type === 'ASC' ? result : result * -1;
                });
            });
        }
    }

    return resultArray;
}

function performPagination(array, pagination) {
    let result = array;

    if (pagination) {
        const { offset = 0, limit = 10 } = pagination;
        result = result.slice(offset, offset + limit);
    }

    return result;
}

function performFilter(array, filter) {
    let result = array;

    if (filter) {
        const { fields } = filter;

        if (fields) {
            Object.entries(fields).forEach(([fieldName, { list }]) => {
                result = array.filter(entity => list.includes(entity[fieldName]));
            });
        }
    }

    return result;
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
