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

    app.use(cors());

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();

      app.options("*", (req, res) => {
        res.header(
          "Access-Control-Allow-Methods",
          "GET, PATCH, PUT, POST, DELETE, OPTIONS"
        );
        res.send();
      });
    });

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
