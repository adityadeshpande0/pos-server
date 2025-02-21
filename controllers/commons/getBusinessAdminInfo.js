const BusinessAdmin = require("..//..//models/business/businessAdmin");

const getBusinessAdminInfo = async (req, res) => {
  try {
    const adminId = req.businessAdmin.id;
    const adminInfo = await BusinessAdmin.findById(adminId);

    if (!adminInfo) {
      return res.status(404).json({ message: "Business admin not found" });
    }
    res.status(200).json(adminInfo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getBusinessAdminInfo;
