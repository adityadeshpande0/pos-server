const BusinessAdmin = require("..//..//models/business/businessAdmin");

const getBusinessAdminInfo = async (req, res) => {
  try {
    const adminId = req.businessAdmin.id;
    const adminInfo = await BusinessAdmin.findById(adminId);
    if (!adminInfo) {
      return res.status(404).json({ message: "Business admin not found" });
    }
    res.status(200).json({
      id: adminInfo._id,
      businessName: adminInfo.businessName,
      businessEmail: adminInfo.businessEmail,
      businessPhoneNumber: adminInfo.businessPhoneNumber,
      permissions: adminInfo.permissions,
      address: adminInfo.address,
      status: adminInfo.status,
      businessId: adminInfo.businessId,
      role: adminInfo.role,
      createdAt: adminInfo.createdAt,
      updatedAt: adminInfo.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getBusinessAdminInfo;
