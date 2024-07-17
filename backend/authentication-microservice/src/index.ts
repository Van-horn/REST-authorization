const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const https = require("https")
require("dotenv").config({path:path.join(__dirname,"./.env")})

const appRouter = require('./routers');
const httpsOpt = require("./https")
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:[
      process.env.MASTER_SERVER,
      process.env.SLAVE_SERVER,
      process.env.NGINX
    ] ,
  })
);
app.use('/', appRouter);
app.use(errorMiddleware);


async function authenticationMicroservice() {
  try {
    await https.createServer(httpsOpt, app).listen(process.env.PORT,() => {
    console.log(`authentication_microservice`)
  });
  } catch (error) {
    console.log(error);
  }
}
authenticationMicroservice()
