
const { enemiesModel } = require('../models/gameModels')
const { goalModel } = require('../models/gameModels')

const { convertToJson } = require('../utils/utils')

const getEnemies = () => {

    return enemiesModel.find({}).then((apiResult) => {
        const convertedApiResult = convertToJson(apiResult)
        return convertedApiResult
    })
}



const getGoal = () => {
    return goalModel.find({}).then((apiResult) => {
        if (apiResult.length === 0) {
            return Promise.reject('no goal found')
        }
        const convertedApiResult = convertToJson(apiResult)
        return convertedApiResult
    })
}

module.exports = { getEnemies, getGoal }
