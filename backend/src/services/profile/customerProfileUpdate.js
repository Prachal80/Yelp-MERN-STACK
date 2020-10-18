var multer = require("multer");
var express = require("express");
var app = express();
const router = express.Router();
var path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  var upload = multer({ storage: storage });

  router.post("/updateCustomerProfilePic", upload.single("profilePic"), function (
    req,
    res
  ) {
    console.log("Inside update profile picture");
  
    if (req.file != "") {
      var host = req.hostname;
      console.log("Hostname", host);
      console.log("File", req.file);
      console.log("req.file.path", req.file.path);
      console.log("CID", req.body.CID);
      console.log("protocol ", req.protocol);
      var imagepath = req.file.path;
      console.log("imagepath ", imagepath);
      let query = "update customer set profilepic = ? where id = ?";
      let args = [imagepath, req.body.CID];
      executeQuery(query, args, (flag, result) => {
        // console.log(flag, result);
        if (!flag) console.log("err", flag);
        else {
          res.redirect(
            "http://" + process.env.ip + ":3000" + "/customer/profile"
          );
        }
      });
    }
  });