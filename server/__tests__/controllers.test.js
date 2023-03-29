
const mongoose = require("mongoose");
const { getEnemies, getPlayer } = require('../controllers/gameControllers')

beforeEach(async () => {
    await mongoose.connect("mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game");
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe('Testing Enemies', () => {
    test('should have length greater than 0', () => {
        return getEnemies().then((data) => {
            expect(data.length).toBeGreaterThan(0)
        })
    })

    test('should have expected properties and types', () => {
        return getEnemies().then((enemies) => {
            enemies.forEach((enemy) => {
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

describe('Testing Player',()=>{
    test('should have a length of 1',()=>{
        return getPlayer().then((data)=>{
            expect(data.length).toBeGreaterThan(0)
        })
    })

    test('should have expected properties and types',()=>{
        return getPlayer().then((players)=>{
            players.forEach((player)=>{
                expect(player).toHaveProperty('_id',expect.any(Object))
                expect(player).toHaveProperty('health',expect.any(Number))
                expect(player).toHaveProperty('coins',expect.any(Number))
                expect(player).toHaveProperty('weapon',expect.any(Array))
                player['weapon'].forEach(weapon => {
                    expect(weapon).toHaveProperty('weaponName',expect.any(String))
                    expect(weapon).toHaveProperty('attackDamage',expect.any(Number))
                    expect(weapon).toHaveProperty('ammunition',expect.any(Number))
                });
            })
        })
    })
})