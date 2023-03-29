const { enemiesModel, towersModel } = require("../models/gameModels");

const { convertToJson } = require("../utils/utils");

const getEnemies = () => {
  return enemiesModel.find({}).then((apiResult) => {
    if (apiResult.length === 0) {
        return Promise.reject('no enemies found');
    }
    const convertedApiResult = convertToJson(apiResult);
    return convertedApiResult;
}).catch(error => console.log(error))
};

const getTowers = () => {
    return towersModel.find({}).then((apiResult) => {
      if (apiResult.length === 0) {
          return Promise.reject('no enemies found');
      }
    const convertedApiResult = convertToJson(apiResult);
    return convertedApiResult;
  }).catch(error => console.log(error));
};

module.exports = { getEnemies, getTowers };
