const express = require('express')
const {graphqlHTTP} = require('express-graphql')  //convention to have HTTP on the variable name
// we use this as middleware for a single route. This is the supercharged endpoint
const schema = require('./schema/schema')

const app = express();

console.log('graphqlHTTP',graphqlHTTP)

app.use('/graphql', graphqlHTTP({
    // You have to pass a schema in order for graphql to work
    schema,
    graphiql: true
    // or schema: schema but ES6 lets us do it like this bc both names are the same
}))
//this funtion is going to handle requests

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000 :)')
})


//node app.js

// In Graph i QL
// # Welcome to GraphiQL
// #
// # GraphiQL is an in-browser tool for writing, validating, and
// # testing GraphQL queries.
// #
// # Type queries into this side of the screen, and you will see intelligent
// # typeaheads aware of the current GraphQL type schema and live syntax and
// # validation errors highlighted within the text.
// #
// # GraphQL queries typically start with a "{" character. Lines that start
// # with a # are ignored.
// #
// # An example GraphQL query might look like:
// #
// #     {
// #       field(arg: "value") {
// #         subField
// #       }
// #     }
// #
// # Keyboard shortcuts:
// #
// #  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
// #
// #     Merge Query:  Shift-Ctrl-M (or press the merge button above)
// #
// #       Run Query:  Ctrl-Enter (or press the play button above)
// #
// #   Auto Complete:  Ctrl-Space (or just start typing)