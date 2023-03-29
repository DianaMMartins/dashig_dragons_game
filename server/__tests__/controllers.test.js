const mongoose = require("mongoose");
const {
  getEnemies,
  getTowers,
  getGoals,
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
    return getEnemies().then((enemies) => {
      expect(Array.isArray(enemies)).toBe(true);
      expect(enemies.length).toBeGreaterThan(0);
    });
  });

  test("should have expected properties and types", () => {
    return getEnemies().then((enemies) => {
      expect(enemies).toEqual(
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
      expect(towers).toEqual(
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

describe("Testing Goals", () => {
  test("should have length greater than 0", () => {
    return getGoals().then((goal) => {
      expect(Array.isArray(goal)).toBe(true);
      expect(goal.length).toBeGreaterThan(0);
    });
  });
  test("should have expected properties and types", () => {
    return getGoals().then((goals) => {
      expect(goals).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(Object),
            health: expect.any(Number),
          }),
        ])
      );
    });
  });
});
