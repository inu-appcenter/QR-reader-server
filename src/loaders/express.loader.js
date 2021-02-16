const morgan = require("morgan");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const { json, urlencoded } = require("express");
const config = require("../configs");
const router = require("../routes");

function expressLoader(app) {
  app.use(morgan("dev"));
  app.use(hpp());
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.use(config.prefix, router());
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ success: false, message: err.message });
  });
}

module.exports = expressLoader;
