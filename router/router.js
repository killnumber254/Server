const express = require("express");
const settingRegist = require("../setting/index");
// const tokenMiddleware = require("../middleware/tokenMiddleware");
const auth = require("../signIn/signIn");
const router = express.Router();
// const deleteUser = require("../delete/delete");

router.post("/regist", settingRegist);
router.post("/auth", auth);
// router.post("/delete", deleteUser);

module.exports = router;
