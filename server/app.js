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

