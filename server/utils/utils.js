
const convertToJson = (toConvert) => {

    const newArray = toConvert.map(enemies => {

        return enemies.toJSON()
    })

    return newArray
}

module.exports = { convertToJson }