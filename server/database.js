const { MongoClient } = require('mongodb')
let dbConnection;
const API_KEY = process.env.API_KEY
let uri = `mongodb+srv://pindernc:Xa7nqPHPaMKEEZDz@pinder.skvgszw.mongodb.net/?retryWrites=true&w=majority`;

module.exports = { 
    connectToDb: (cb) => {
        MongoClient.connect(uri).then((client)=>{
            dbConnection = client.db();
            return cb();
        }).catch((error) => {
            console.log(error);
            return cb(error);
        })
    },
    getDb: () => dbConnection
 }