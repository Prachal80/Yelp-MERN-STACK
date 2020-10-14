const db = require("../../index");

function executeQuery(query, args, callback) {
  db.db.query(query, args, (err, res) => {
    if (err) console.log("err,", err);
    else {
      console.log("response ", res);
      if (res) {
        console.log("Query executed");
        callback(true, res);
      } else {
        callback(false, null);
      }
    }
  });
}

module.exports = executeQuery;
