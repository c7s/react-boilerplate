const { ApolloServer, gql, ApolloError } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.
    type Book {
        title: String!
        author: String!
    }

    type Development {
        books: [Book!]!
        currentTimestamp(returnError: Boolean!, loadingTime: Int!): Float!
    }

    enum ServerError {
        TEST_ERROR
    }
    
    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
        development: Development!
        serverError: ServerError!
    }
`;

const ServerError = {
    TEST_ERROR: 'TEST_ERROR'
};

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        serverError: () => (ServerError.TEST_ERROR),
        development: () => ({books}),
    },
    Development: {
        currentTimestamp: (_, {returnError, loadingTime}) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!returnError) {
                resolve(Date.now());
            }
            reject(new ApolloError('Developer-readable message, not code', ServerError.TEST_ERROR, {additionalProperty: 'Some additional data'}))
        }, loadingTime)
    }),
    }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
