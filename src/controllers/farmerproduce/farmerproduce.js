const FarmerProduce = require("../../models/FarmerProduce");

const createFarmerProduce = async (req, res) => {
  const availableItem = await FarmerProduce.findOne({
    itemname: req.body.itemname,
    farmerId: req.body.farmerId,
  });
  console.log(availableItem);
  if (availableItem) {
    console.log("Already");
    return res.status(400).json("Item already exists");
  } else {
    const farmerProduce = new FarmerProduce(req.body);
    try {
      const produce = await farmerProduce.save();
      return res.status(201).json(produce);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};

const updateProduce = async (req, res) => {
  try {
    await FarmerProduce.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: "FarmerProduce has been updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getProduceById = async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.findOne({ _id: req.params.id });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getFarmersAllProduce = async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.find({
      farmerId: req.params.farmerId,
    });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAFarmersParticularProduce = async (req, res) => {
  try {
    const farmerProduce = await FarmerProduce.findOne({
      farmerId: req.params.farmerId,
      itemname: req.params.itemname,
    });
    return res.status(200).json(farmerProduce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllProduce = async (req, res) => {
  try {
    const produce = await FarmerProduce.find();
    return res.status(200).json(produce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  createFarmerProduce,
  updateProduce,
  getAllProduce,
  getFarmersAllProduce,
  getProduceById,
  getAFarmersParticularProduce,
};
