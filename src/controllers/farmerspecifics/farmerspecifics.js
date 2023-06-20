const FarmerSpecifics = require("../../models/FarmerSpecifics");

const createFarmerSpecifics = async (req, res) => {
  try {
    const farmer = await FarmerSpecifics.findOne({
      farmername: req.body.farmername,
      itemname: req.body.itemname,
    });
    if (farmer) {
      return res.status(400).json("Farmer already uploaded this produce");
    } else {
      const newFarmerSpecifics = new FarmerSpecifics(req.body);
      const savedfarmer = await newFarmerSpecifics.save();
      return res.status(200).json(savedfarmer);
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

const getAllFarmerSpecificsOfAParticularFarmer = async (req, res) => {
  try {
    const farmerspecifics = await FarmerSpecifics.find({
      itemname: req.params.itemname,
    });
    return res.status(200).json(farmerspecifics);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

const getItemsByFarmerIdAndDistrict = async (req, res) => {
  try {
    const { itemname, districtname, pricerange, quantity } = req.body;
    const farmerspecifics = await FarmerSpecifics.find({
      itemname: req.params.itemname,
      farmerdistrict: req.params.districtname,
      // ....
    });
    return res.status(200).json(farmerspecifics);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

const updateFarmerSpecifics = async (req, res) => {
  try {
    const availableItem = await FarmerSpecifics.findOne({
      itemname: req.params.itemname,
      farmername: req.params.farmername,
    });

    if (availableItem) {
      const updatedItem = await FarmerSpecifics.findOneAndUpdate(
        { itemname: req.params.itemname, farmername: req.params.farmername },
        {
          $set: { itemquantity: req.body.itemquantity },
          new: true,
        }
      );
      return res.status(200).json({ message: "Successfully updated" });
    } else {
      return res.status(400).json("Farmer with that Item doesnot exist");
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

const filterFarmerSpecifics = async (req, res) => {
  // const { itemname } = req.params;
  const { farmerdistrict, itemprice, itemquantity, itemname } = req.params;

  try {
    const farmersinadistrict = await FarmerSpecifics.find({
      farmerdistrict,
      itemname,
      itemprice: { $gte: itemprice },
      itemquantity: { $lte: itemquantity },
    });
    return res.status(200).json(farmersinadistrict);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

module.exports = {
  createFarmerSpecifics,
  getAllFarmerSpecificsOfAParticularFarmer,
  getItemsByFarmerIdAndDistrict,
  updateFarmerSpecifics,
  filterFarmerSpecifics,
};
