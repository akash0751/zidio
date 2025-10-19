const express = require("express");
const router = express.Router();
const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../Controller/project");
const authMiddleware = require("../Middleware/userAuth");
router.post("/", authMiddleware,addProject);
router.get("/", authMiddleware,getProjects);
router.put("/:id", authMiddleware,updateProject);
router.delete("/:id",authMiddleware, deleteProject);

module.exports = router;
