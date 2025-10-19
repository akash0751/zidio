const express = require("express");
const router = express.Router();
const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} = require("../Controller/skill");
const authMiddleware = require("../Middleware/userAuth");

router.post("/",authMiddleware, addSkill);
router.get("/", authMiddleware,getSkills);
router.put("/:id",authMiddleware, updateSkill);
router.delete("/:id",authMiddleware, deleteSkill);

module.exports = router;
