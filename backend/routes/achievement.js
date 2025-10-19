const express = require("express");
const router = express.Router();
const {
  addAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement,
} = require("../Controller/achievement");
const authMiddleware = require("../Middleware/userAuth");
router.post("/",authMiddleware, addAchievement);
router.get("/", authMiddleware,getAchievements);
router.put("/:id", authMiddleware,updateAchievement);
router.delete("/:id",authMiddleware, deleteAchievement);

module.exports = router;
