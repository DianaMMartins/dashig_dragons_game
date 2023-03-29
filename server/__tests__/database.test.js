
const mongoose = require("mongoose");
const request = require('supertest')
const { app } = require('../server')
const Schema = mongoose.Schema;

// beforeEach(async () => {
//     await mongoose.connect("mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game");
// });

// afterEach(async () => {
//     await mongoose.connection.close();
// });

afterAll(async () => {
    await mongoose.connection.close()
})


describe('GET from db', () => {

    test('get all Enemies ', () => {
        return request(app).get('/').expect(200).then(({_body}) => {
            
           
        })
    })
})