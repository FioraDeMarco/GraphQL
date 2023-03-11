const graphql = require('graphql')

const {GraphQLObectType, GraphQLString, GraphQLSchema} = graphql

// dummy data
var books = [
    {name: 'Gone with the Wind', genre: 'Fantasy', id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'},
]

const BookType = new GraphQLObectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type:GraphQLString}},
            resolve(parent, args) {
                // code to get data from db / other source - Parent will come into play when we start to look at relationships between data
                //args.id
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})