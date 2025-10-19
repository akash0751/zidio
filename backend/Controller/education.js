const Education = require("../Model/education");

const addEducation = async (req, res) => {
  try {
    const { degree, fieldOfStudy, startYear, endYear, institution,grade } = req.body;
    const userId = req.user.id;
    const education = new Education({ userId, degree, fieldOfStudy, startYear, endYear, institution, grade });
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEducations = async (req, res) => {
  try {
    const educations = await Education.find({ userId: req.user.id });
    res.status(200).json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addEducation,
  getEducations,
  updateEducation,
  deleteEducation,
};