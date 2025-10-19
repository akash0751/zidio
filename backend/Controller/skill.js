const Skill = require("../Model/skill");

const addSkill = async (req, res) => {
  try {
    const { name, level, category } = req.body;
    const userId = req.user.id; // ✅ FIXED here
    const skill = new Skill({ userId, name, level, category });
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error("Add skill error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getSkills = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ FIXED here
    const skills = await Skill.find({ userId });
    res.status(200).json(skills);
  } catch (err) {
    console.error("Get skills error:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ✅ FIXED param name
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json(skill);
  } catch (err) {
    console.error("Update skill error:", err);
    res.status(500).json({ message: err.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id); // ✅ FIXED param name
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Delete skill error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
