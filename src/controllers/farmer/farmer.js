const Farmer = require("../../models/Farmer");
const bcrypt = require("bcrypt");

const updateFarmer = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      new: true,
    });

    res.status(200).json({ message: "Farmer has been updated", updatedFarmer });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateFarmerPassword = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    await Farmer.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: req.body.password },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User's password has been updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ _id: req.params.id });
    const { password, ...others } = farmer._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFarmerByDistrict = async (req, res) => {
  try {
    const farmer = await Farmer.find({
      "location.district": req.params.district,
    });
    // const { password, ...others } = farmer._doc;
    return res.status(200).json(farmer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFarmersInADistrict = async (req, res) => {
  try {
    const farmers = await FarmerInDistrict.find();
    return res.status(200).json(farmers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFarmerByEmail = async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ email: req.params.email });
    const { password, ...others } = farmer._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    return res.status(200).json(farmers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  updateFarmer,
  getFarmerByEmail,
  getAllFarmers,
  getFarmerByDistrict,
  getFarmersInADistrict,
  updateFarmerPassword,
  getFarmerByDistrict,
  getFarmerById,
};
