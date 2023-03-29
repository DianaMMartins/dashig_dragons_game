const mongoose = require("mongoose");
const { getEnemies, getGameScore } = require("../controllers/gameControllers");

beforeEach(async () => {
  await mongoose.connect(
    "mongodb+srv://newuser:zaKUwAsSSChyUO3U@pinder.skvgszw.mongodb.net/Game"
  );
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Testing Enemies", () => {
  test("should have length greater than 0", () => {
    return getEnemies().then((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
  });
  test("should have expected properties and types", () => {
    return getEnemies().then((enemies) => {
      enemies.forEach((enemy) => {
        expect(enemy).toHaveProperty("_id", expect.any(Object));
        expect(enemy).toHaveProperty("attackDamage", expect.any(Number));
        expect(enemy).toHaveProperty("coinsOnKill", expect.any(Number));
        expect(enemy).toHaveProperty("health", expect.any(Number));
        expect(enemy).toHaveProperty("level", expect.any(Number));
        expect(enemy).toHaveProperty("walkSpeed", expect.any(Number));
      });
    });
  });
});

describe("Test suite for get scoreboard", () => {
  test("Output should be an array", () => {
    return getGameScore().then((data) => {
      expect(Array.isArray(data)).toBe(true);
    });
  });
  test("returned array is not empty", () => {
    return getGameScore().then((data) => {
      expect(data.length).toBeGreaterThan(0);
    });
  });
  test("Each object is returned with correct properties and data types", () => {
    return getGameScore().then((data) => {
      data.forEach((score) => {
        expect(score).toHaveProperty("_id", expect.any(Object));
        expect(score).toHaveProperty("player", expect.any(Object));
      });
    });
  });
});
