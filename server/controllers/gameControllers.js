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
  return scoresModel.find({}).then((apiResult) => {
    const convertedApiResult = convertToJson(apiResult);
    console.log(apiResult);
    return convertedApiResult;
  });
};

module.exports = { getEnemies, getGameScore };
