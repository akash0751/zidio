const express = require("express");
const router = express.Router();
const {
  addOrUpdateInfo,
  getInfo
} = require("../Controller/info");
const authMiddleware = require("../Middleware/userAuth");
// Routes
router.post("/",authMiddleware, addOrUpdateInfo);
router.get("/", authMiddleware,getInfo);

module.exports = router;
