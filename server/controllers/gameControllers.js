const {
  enemiesModel,
  towersModel,
  goalModel,
  playerModel
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

const getPlayer = () =>{
    return playerModel.find({}).then((apiResult)=>{
        if(apiResult.length===0)
        {
            return promise.reject('no player found')
        }
        const convertedApiResult = convertToJson(apiResult)
        return convertedApiResult
    }).catch(error=>console.log(error))
}

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

module.exports = { getEnemies, getGoals, getTowers,getPlayer };
