const Roles = require("../../models/acessModel");

module.exports = async (req, res) => {
  const { roleName } = req.params;

  try {
    const role = await Roles.findOne({ roleName });
    if (!role) {
      return res.status(404).json({ message: `Role ${roleName} not found` });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};