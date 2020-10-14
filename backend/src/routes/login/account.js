var express = require("express");
const router = express.Router();
const executeQuery = require("../../database/mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", (req, res) => {
  console.log("login api ", req.body);
  let query = "";
  if (req.body.userType === "customer") {
    query = "select * from customer where email= ?";
  } else {
    query = "select * from restaurant where email= ?";
  }
  let args = [req.body.username, req.body.password];
  executeQuery(query, args, (flag, result) => {
    console.log("$$$$$$$$:  ", result[0].password);
    if (!flag) {
      console.log("User with emailid not found");
      res.send({ success: false });
    } else {
      if (bcrypt.compareSync(req.body.password, result[0].password)) {
        console.log("Password Match");
        res.status(200).send({ success: flag, res: result });
      } else {
        console.log("Password did not Match");
        res.status(401).send({ success: false, res: null });
      }
    }
  });
});

module.exports = router;
