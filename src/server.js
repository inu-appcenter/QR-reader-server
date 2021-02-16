const express = require("express");
const config = require("./configs");
const loader = require("./loaders");
const swaggerUI = require("swagger-ui-express");
const swagger = require("../swagger.json");

async function server() {
  const app = express();

  const hostname = config.hostname;
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger, { explorer: true }));
  console.dir(`API DOCS -> http://${hostname}:${config.port}/api-docs`);

  await loader(app);
  app.listen(config.port, err => {
    if (err) {
      console.error(err.message);
      process.exit(0);
    } else console.dir("server start");
  });
}

module.exports = server;
