const express = require("express");
const router = express.Router();
const {
  addEducation,
  getEducations,
  updateEducation,
  deleteEducation,
} = require("../Controller/education");
const authMiddleware = require("../Middleware/userAuth");
const { auth } = require("google-auth-library");
router.post("/",authMiddleware, addEducation);
router.get("/", authMiddleware,getEducations);
router.put("/:id", authMiddleware,updateEducation);
router.delete("/:id",authMiddleware, deleteEducation);

module.exports = router;
