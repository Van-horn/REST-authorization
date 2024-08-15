const express = require('express');
const https = require("https")
const cors = require('cors');
const path = require("path")
require('dotenv').config({path:path.join(__dirname,".env")});

const appRouter = require('./routers');
const sequelize = require('./DB_DATA');
const httpsOpt = require("./https")
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin:[
      process.env.AUTHENTICATION_MICROSERVICE,
      process.env.PRODUCTS_MICROSERVICE
    ] ,
      optionsSuccessStatus: 200,

  })
);
app.use('/', appRouter);
app.use(errorMiddleware);

async function slaveServer() {
  try { 
    await https.createServer(httpsOpt, app).listen(process.env.PORT, async () => {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true })

    console.log(`slave-server`)
  });
  } catch (error) {
    console.log(error);
  }
}
slaveServer()
