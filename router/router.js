const express = require("express");
const settingRegist = require("../setting/index");
// const tokenMiddleware = require("../middleware/tokenMiddleware");
const router = express.Router();
// const deleteUser = require("../delete/delete");

router.post("/regist", settingRegist);
// router.post("/delete", deleteUser);

module.exports = router;
