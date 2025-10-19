const Achievement = require("../Model/achievement");

const addAchievement = async (req, res) => {
  try {
    const { title, description, date, certificateLink, organization } = req.body;
    const userId = req.user.id;
    const achievement = new Achievement({ userId, title, description, date, certificateLink, organization });
    await achievement.save();
    res.status(201).json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.user.id });
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });
    res.status(200).json(achievement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ message: "Achievement not found" });
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement,
};