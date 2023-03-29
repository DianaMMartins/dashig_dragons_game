const {
  enemiesModel,
  towersModel,
  goalModel,
  playerModel,
  scoresModel,
} = require("../models/gameModels");
const { convertToJson } = require("../utils/utils");

const getEnemies = () => {
  return enemiesModel
    .find({})
    .then((apiResult) => {
      if (apiResult.length === 0) {
        return Promise.reject("no enemies found");
      }
      const convertedApiResult = convertToJson(apiResult);
      return convertedApiResult;
    })
    .catch((error) => console.log(error));
};

const getPlayer = () => {
  return playerModel
    .find({})
    .then((apiResult) => {
      if (apiResult.length === 0) {
        return promise.reject("no player found");
      }
      const convertedApiResult = convertToJson(apiResult);
      return convertedApiResult;
    })
    .catch((error) => console.log(error));
};

const getTowers = () => {
  return towersModel
    .find({})
    .then((apiResult) => {
      if (apiResult.length === 0) {
        return Promise.reject("no enemies found");
      }
      const convertedApiResult = convertToJson(apiResult);
      return convertedApiResult;
    })
    .catch((error) => console.log(error));
};

const getGoals = () => {
  return goalModel
    .find({})
    .then((apiResult) => {
      if (apiResult.length === 0) {
        return Promise.reject("no goal found");
      }
      const convertedApiResult = convertToJson(apiResult);
      return convertedApiResult;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGameScore = () => {
  return scoresModel
    .find({})
    .then((apiResult) => {
      if (apiResult.length === 0) return Promise.reject("No scores found");

      const convertedApiResult = convertToJson(apiResult);
      console.log(apiResult);
      return convertedApiResult;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getEnemies, getGoals, getTowers, getPlayer, getGameScore };
