
const { enemiesModel,playerModel } = require('../models/gameModels')

const { convertToJson } = require('../utils/utils')

const getEnemies = () => {

    return enemiesModel.find({}).then((apiResult) => {
        const convertedApiResult = convertToJson(apiResult)
        return convertedApiResult
    })
}

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

module.exports = { getEnemies, getPlayer }
