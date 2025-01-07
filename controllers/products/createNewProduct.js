const Product = require("..//..//models/productsSchema");

exports.createNewProduct = async (req, res) => {
  try {
    const vendorId = req.user?.id;
    const {
      name,
      description,
      price,
      subscriptionOptions,
      availabilityStatus,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      subscriptionOptions,
      availabilityStatus,
      vendorId,
    });

    const saveProduct = await newProduct.save();

    res.status(201).json({ success: true, product: saveProduct });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong !",
    });
  }
};
