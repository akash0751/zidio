const Info = require("../Model/info");

// Add or Update User Info
const addOrUpdateInfo = async (req, res) => {
  try {
    const { name, email, phone, address, github, linkedin } = req.body;
    const userId = req.user.id; // coming from JWT middleware

    // Check if info already exists for the user
    let info = await Info.findOne({ userId });

    if (info) {
      // Update existing info
      info.name = name;
      info.email = email;
      info.phone = phone;
      info.address = address;
      info.github = github;
      info.linkedin = linkedin;
      await info.save();
      return res.status(200).json(info);
    }

    // Create new info
    info = new Info({ userId, name, email, phone, address, github, linkedin });
    await info.save();
    res.status(201).json(info);
  } catch (err) {
    console.error("Add/Update info error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get User Info
const getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const info = await Info.findOne({ userId });
    if (!info) return res.status(404).json({ message: "User info not found" });
    res.status(200).json(info);
  } catch (err) {
    console.error("Get info error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete User Info


module.exports = {
  addOrUpdateInfo,
  getInfo
};
