const { executeQuery } = require("../configs/database/pool");

const route = require("express").Router();

function router() {
  route.post("/record", async (req, res, next) => {
    try {
      const { data } = req.body;
      if (!data) {
        const err = new Error("no data");
        err.status = 404;
        next(err);
      } else {
        const [sId, createdAt, time] = data.split("\n");
        if (sId && createdAt && time) {
          const query = `INSERT INTO qr_record (studentId, entryDate, entryTime) VALUES (?, ?, ?)`;
          await executeQuery(query, [sId, createdAt, time]);
          res.status(201).json({ success: true });
        } else {
          res.status(400).json({ success: false, message: "데이터 형식이 잘못됨" });
        }
      }
    } catch (error) {
      next(error);
    }
  });

  return route;
}

module.exports = router;
