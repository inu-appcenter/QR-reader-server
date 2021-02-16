const dbLoader = require("./db.loader");
const expressLoader = require("./express.loader");

async function loader(app) {
  await dbLoader();
  expressLoader(app);
}

module.exports = loader;
