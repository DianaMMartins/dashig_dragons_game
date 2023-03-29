const mongoose = require("mongoose");

const { convertToJson } = require('../utils/utils')
const { enemiesModel } = require('../models/gameModels')


beforeEach(async () => {
    await mongoose.connect("mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game");
});

afterEach(async () => {
    await mongoose.connection.close();
});


describe('Testing utils', () => {
    test('should return an array', () => {
        const testGetEnemies = () => {
            return enemiesModel.find({}).then((apiResult) => {
                return apiResult
            })
        }

        return testGetEnemies().then((enemies) => {
            const actual = convertToJson(enemies)
            expect(Array.isArray(actual)).toBe(true)
        })
    })

    //return when rubber ducking

    // test('should not mutate input', () => {
    //     const testGetEnemies = () => {
    //         return enemiesModel.find({}).then((apiResult) => {
    //             return apiResult
    //         })
    //     }

    //     return testGetEnemies().then((enemies) => {
    //         const actual = convertToJson(enemies)
    //         actual.forEach((enemy) => {
    //             expect(enemies).toEqual()

    //         })
    //     })

    //     const input = [{ key: 1 }]
    //     convertToJson(input)
    //     expect(input).toEqual([{ key: 1 }])

    // })
    test('should convert to json', () => {
        const testGetEnemies = () => {
            return enemiesModel.find({}).then((apiResult) => {
                return apiResult
            })
        }


        return testGetEnemies().then((enemies) => {

            const actual = convertToJson(enemies)

            actual.forEach((enemy) => {
                expect(enemy).toHaveProperty('_id', expect.any(Object))
                expect(enemy).toHaveProperty('attackDamage', expect.any(Number))
                expect(enemy).toHaveProperty('coinsOnKill', expect.any(Number))
                expect(enemy).toHaveProperty('health', expect.any(Number))
                expect(enemy).toHaveProperty('level', expect.any(Number))
                expect(enemy).toHaveProperty('walkSpeed', expect.any(Number))
            })
        })


    })
})