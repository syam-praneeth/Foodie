const exp = require("express");
const router = exp.Router();
const firmController = require("../Controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", verifyToken, firmController);

module.exports = router;
