import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./src/controllers/index.js";
import { configureMongo } from "./src/config/mongodb.config.js";

dotenv.config();

const port = process.env.PORT || "3000";
const app = express();
app.set("port", port);

configureMongo()
  .then(() => {
    console.log("Starting app...");

    const corsOptions = {
      origin: 'https://facial.techchimp.co', 
      credentials:true,            
      optionSuccessStatus:200
    };
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/api", router);

    // eslint-disable-next-line no-unused-vars
    app.use((req, res, next) => {
      console.warn("Error 404 - Route not found");
      res.status(404);
      res.json("Error 404 - Rounte not found");
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error(err, err.stack);
      res.status(err.status || 500);
      res.json("Something went wrong 5xx");
    });
  })
  .catch((err) => {
    console.error(err, err.stack);
  });

/** * Create HTTP server. * **/
const server = http.createServer(app);
server.listen(port);
