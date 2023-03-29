const { enemiesModel, scoresModel } = require("../models/gameModels");

const { convertToJson } = require("../utils/utils");

const getEnemies = () => {
  return enemiesModel.find({}).then((apiResult) => {
    const convertedApiResult = convertToJson(apiResult);
    console.log(apiResult);
    return convertedApiResult;
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

module.exports = { getEnemies, getGameScore };
