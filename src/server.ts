import { connectSocket } from "./modules/socket/index";
import * as express from "express";
require("dotenv").config();
// import { Server } from "socket.io";
import * as http from "http";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
const fileUpload = require("express-fileupload");
import { TypeOrmDataSource } from "./config";

import { AccessTokenMiddleware } from "./modules/auth/middleware";

const app: express.Application = express();
const server = http.createServer(app);
// const io = new Server(server);

TypeOrmDataSource.initialize()
  .then(() => {
    const {
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      newsRouter,
      authRouter,
      notificationRouter,
      chatRouter,
      currencyRouter,
      advertisementRouter,
    } = require("./router");
    connectSocket(server);
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(AccessTokenMiddleware);
    app.use(
      adminRouter,
      categoryRouter,
      permissionRouter,
      positionRouter,
      newsRouter,
      authRouter,
      notificationRouter,
      chatRouter,
      currencyRouter,
      advertisementRouter,
    );

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
