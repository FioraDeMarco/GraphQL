const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

// dummy data
var books = [
    {name: 'Gone with the Wind', genre: 'Historical Fiction', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Color of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
]

var authors = [
    { name: 'Margaret Mitchell', age: '48', id: '1'},
    { name: 'Brandon Sanderson', age: '42', id: '2'},
    { name: 'Terry Pratchett', age: '66', id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({

// Fields are wrapped in a function because if we do, we are still running the code from top to bottom, but we are not executing the fucntion until after all of the file is run. By the time the whole file is run the different types are all known, even if they come later in the code. 

        id: {type: GraphQLID}, // Will still work on strings
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
               // to get data from db || other source
               console.log(typeof(args.id)) // still string bc that's what it is above
                return _.filter(books, { authorId: parent.id})
            }
        }
    })
})

// The Root Query defines how we can jump into the graph to retrieve data 


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type:GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source - Parent will come into play when we start to look at relationships between data
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, { id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});


// run script <npx nodemon app>

module.exports = new GraphQLSchema({
    query: RootQuery
})