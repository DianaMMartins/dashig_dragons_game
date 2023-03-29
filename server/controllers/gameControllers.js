const { enemiesModel, towersModel } = require("../models/gameModels");

const { convertToJson } = require("../utils/utils");

const getEnemies = () => {
  return enemiesModel.find({}).then((apiResult) => {
    const convertedApiResult = convertToJson(apiResult);
    return convertedApiResult;
  });
};

const getTowers = () => {
  return towersModel.find({}).then((apiResult) => {
    const convertedApiResult = convertToJson(apiResult);
    return convertedApiResult;
  });
};

module.exports = { getEnemies, getTowers };
