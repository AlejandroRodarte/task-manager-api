// Mongo Client: allows us to connect to the database as clients
// ObjectID object to generate globally unique ID's using the module instead of the server generating them
const { MongoClient, ObjectID } = require('mongodb');

// connect to the MongoDB localhost server (using their protocol)
// recommended to type 127.0.0.1 instead of localhost
const connectionUrl = 'mongodb://127.0.0.1:27017';

// place any name to the database
const databaseName = 'task-app';

// create a new globally unique object id
const id = new ObjectID();

// raw id (binary, 12 bytes)
// this is the real id stored by MongoDB
console.log(id.id.length);

// id that we see (string, 24 bytes)
console.log(id.toHexString().length);

// use the client to connect to the database given the url
// also, explicitly inform we want to parse the url
// callback: code to run when the connection operation has finished (failed or success)
// receives injected the error and client objects for failed or successful connections
MongoClient.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {

    if (error) {
        return console.log('Unable to connect to the database.');
    }

    console.log('Connected to the database.');

    // get a reference to the database we desire to manipulate
    // by picking a name and accessing it, MongoDB automatically creates the database
    // we also get a reference to the database from this db() method
    const db = client.db(databaseName);

    // create collection named 'users' (table)
    // also, insert a document (record) with some data
    // insertOne() accepts a callback to know if the insert failed or succeeded
    // now inserting the _id so that the server does not need to generate it
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {

    //     if (error) {
    //         return console.log('Unable to insert the user.')
    //     }

    //     // the result (insert success) contains an ops object
    //     // with the documents inserted (contains the id)
    //     console.log(result.ops);

    // });

    // use insertMany() to insert multiple documents
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 34
    //     }
    // ], (error, result) => {

    //     if (error) {
    //         return console.log('Unable to insert the users.')
    //     }

    //     console.log(result.ops);

    // });

    // create a new collection named 'tasks' and insert three different tasks
    // db.collection('tasks').insertMany([
    //     {
    //         task: 'Wash the dishes',
    //         completed: false
    //     },
    //     {
    //         task: 'Do the laundry',
    //         completed: true
    //     },
    //     {
    //         task: 'Walk the dogs',
    //         completed: true
    //     }
    // ], (error, result) => {

    //     if (error) {
    //         return console.log('Unable to insert the tasks.')
    //     }

    //     console.log(result.ops);

    // });

});