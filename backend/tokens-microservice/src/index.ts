const https = require('https');
const express = require('express');
const cors = require('cors');
const path = require("path")
require('dotenv').config({path:path.join(__dirname,"./.env")});

const httpsOpt = require("./https")
const appRouter = require('./routers');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin:[
      process.env.AUTHENTICATION_MICROSERVICE,
      process.env.PRODUCTS_MICROSERVICE] ,
      optionsSuccessStatus: 200,

  })
);
app.use('/', appRouter);
app.use(errorMiddleware);

async function tokenMicroservice() {
  try {
   await https.createServer(httpsOpt, app).listen(process.env.PORT , () => {
    console.log(`token-microservice`);
   
  });
} catch (error) {
    console.log(error);
  }
}
tokenMicroservice()

