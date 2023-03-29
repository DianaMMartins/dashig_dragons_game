const mongoose = require("mongoose");
const {
  getEnemies,
  getTowers,
  getGoal,
} = require("../controllers/gameControllers");

beforeEach(async () => {
  await mongoose.connect(
    "mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game"
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Testing Enemies", () => {
  test("should be an array and have length greater than 0", () => {
    return getEnemies().then((data) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  test("should have expected properties and types", () => {
    return getEnemies().then((enemies) => {
      const actual = enemies.map((eachEnemy) => {
        return eachEnemy;
      });
      expect(actual).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(Object),
            attackDamage: expect.any(Number),
            coinsOnKill: expect.any(Number),
            health: expect.any(Number),
            level: expect.any(Number),
            walkSpeed: expect.any(Number),
          }),
        ])
      );
    });
  });
});

describe("Testing we get towers from database ", () => {
  test("receives an array of towers with a have length greater than 0", () => {
    return getTowers().then((towers) => {
      expect(Array.isArray(towers)).toBe(true);
      expect(towers.length).toBeGreaterThan(0);
    });
  });
  test("should have expected properties for towers table and correct data types", () => {
    return getTowers().then((towers) => {
      const actual = towers.map((eachTower) => {
        return eachTower;
      });
      expect(actual).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(Object),
            name: expect.any(String),
            cost: expect.any(Number),
            recharge: expect.any(Number),
            attackDamage: expect.any(Number),
            attackSpeed: expect.any(Number),
            health: expect.any(Number),
          }),
        ])
      );
    });
  });
});
