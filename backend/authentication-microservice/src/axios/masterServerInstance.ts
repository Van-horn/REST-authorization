const axios = require("axios")

const httpsAgent = require("./httpsAgent")

module.exports = axios.create({
    httpsAgent,
    baseURL : process.env.MASTER_SERVER,

})