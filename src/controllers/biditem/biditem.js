const AllProduce = require("../../models/AllProduce");
const BidItem = require("../../models/BidItem");
const FarmerProduce = require("../../models/FarmerProduce");
const FarmerSpecifics = require("../../models/FarmerSpecifics");
const Graph = require("../../models/Graph");
const UniformBid = require("../../models/UniformBid");

// CREATE  A BID
const createBid = async (req, res) => {
  try {
    const { farmerId, buyerId, quantitybuyerneeds, itemname, itemquantity } =
      req.body;
    // Check if the buyer trying to bid has already made a bid on this very item of the same farmer
    const alreadyBidItem = await BidItem.findOne({
      farmerId,
      buyerId,
      itemname,
      itemquantity,
    });

    // CHECK FOR QUANTITY BEING BID

    const availableItemQuantity = await FarmerProduce.findOne({
      farmerId,
      itemname,
    });

    if (availableItemQuantity.itemquantity < quantitybuyerneeds) {
      return res.status(403).json("Cannot bid higher than available quantity!");
    } else {
      if (alreadyBidItem) {
        return res
          .status(400)
          .json("You have already submitted a bid for this item!");
      } else {
        const newBid = new BidItem(req.body);
        const savedBid = await newBid.save();

        //   CREATE A UNIFORM BID HERE(CAPTURES NUMBER OF BIDS PER ITEM)
        //   REGISTER FARMER IN DISTRICT HERE *******
        try {
          const existingBid = await UniformBid.findOneAndUpdate(
            { farmerId: req.body.farmerId, itemname: req.body.itemname },
            { $inc: { numberOfBids: 1 } },
            { new: true }
          );
          if (existingBid) {
            existingBid.numberOfBids += 1;
            console.log("field updated");
          } else {
            const { farmerId, itemname, itemprice, itemimage } = req.body;
            const newUniformBid = new UniformBid({
              farmerId,
              itemname,
              itemprice,
              itemimage,
            });
            const savedUniformBid = await newUniformBid.save();
            console.log(savedUniformBid);
          }
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }

        return res.status(201).json(savedBid);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const graphData = async (req, res) => {
  try {
    const { itemname, timerange } = req.params;
    const graphdata = await Graph.find({ itemname, timerange });
    return res.status(200).json(graphdata);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const findBidsByFarmerId = async (req, res) => {
  try {
    const { farmerId, itemname } = req.params;

    const bidItems = await BidItem.find({
      farmerId,
      itemname,
    });
    return res.status(200).json(bidItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const findUniformBidsByFarmerId = async (req, res) => {
  try {
    const { farmerId, itemname } = req.params;

    const bidItems = await UniformBid.find({
      farmerId,
    });
    return res.status(200).json(bidItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateBidAFterFarmerAccepts = async (req, res) => {
  try {
    const { bidId } = req.params;
    const availableBid = await BidItem.findById(bidId);
    const updatedBid = await BidItem.findByIdAndUpdate(bidId, {
      $set: { status: "Pending", isAccepted: true },
      new: true,
    });

    return res.status(200).json(updatedBid);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const handleBuyerResponseWithOtherUpdates = async (req, res) => {
  try {
    // GET TIME AND DATE AT THE MOMENT THIS ENDPOINT IS HIT
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const isAM = hours < 12;

    let formattedHours = hours % 12;
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const meridiem = isAM ? "AM" : "PM";

    const currentTime = `${formattedHours}:${formattedMinutes}${meridiem}`;

    console.log(currentTime, "current time upper");

    const formattedTime = currentTime;

    const updatedBid = await BidItem.findByIdAndUpdate(req.params.bidId, {
      $set: {
        buyerResponded: true,
        accepteddate: formattedDate,
        acceptedtime: req.body.currentTime,
      },
      new: true,
    });

    // ALSO UPDATE FARMER PRODUCE ITEM TO DEDUCT WHAT HAS BEEN BID
    try {
      const availableBid = await BidItem.findById(req.params.bidId);

      const { itemname, farmerId, quantitybuyerneeds, buyerId } = availableBid;

      if (availableBid) {
        // UPDATE PAYMENTS FOR THIS BUYER
        const updatedPayments = await Payments.findOneAndUpdate(
          { userId: buyerId },
          {
            $set: { seen_farmer_details: true },
          }
        );

        console.log(updatedPayments);

        // UPDATE FARMER PRODUCE
        const testItem = await FarmerProduce.findOne({ itemname, farmerId });
        console.log(testItem);
        const updatedFarmerProduce = await FarmerProduce.findOneAndUpdate(
          { itemname, farmerId },
          {
            $set: {
              itemquantity: testItem.itemquantity - quantitybuyerneeds,
            },
            new: true,
          }
        );

        console.log(updatedFarmerProduce, "produce for farmer");

        // UDPATE LIST OF FARMERS(FARMERSPECIFICS)
        const listOfFarmers = await FarmerSpecifics.findOne({
          itemname,
          farmerId,
        });

        const updatedListOfFarmers = await FarmerSpecifics.findOneAndUpdate(
          { itemname, farmerId },
          {
            $set: {
              itemquantity: listOfFarmers.itemquantity - quantitybuyerneeds,
            },
            new: true,
          }
        );

        console.log(updatedListOfFarmers, "listof farmers");

        // UPDATE ALL PRODUCE
        const allproduce = await AllProduce.findOne({
          itemname,
          farmerId,
        });

        const updatedProduce = await AllProduce.findOneAndUpdate(
          { itemname },
          {
            $set: {
              itemquantity: allproduce.itemquantity - quantitybuyerneeds,
            },
            new: true,
          }
        );

        console.log(updatedProduce, "listof farmers");
      } else {
        return res.status(400).json("No bid with this id");
      }

      // ALSO UPDATE GRAPH DATA
      // UPDATE THE GRAPH SECTION TOO TO CAPTURE THIS RANGE
      /**
               
              // Special fields to use to search are itemname and timerange
               
               */

      try {
        // GET TIME NOW
        const currentDate = new Date();

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const isAM = hours < 12;

        let formattedHours = hours % 12;
        if (formattedHours === 0) {
          formattedHours = 12;
        }

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const meridiem = isAM ? "AM" : "PM";

        const currentTime = `${formattedHours}:${formattedMinutes}${meridiem}`;

        console.log(currentTime, "current time upper");

        const graphData = new Graph({
          itemname: availableBid.itemname,
          yAxis: Number(availableBid.buyerprice),
          xAxis: req.body.currentTime,
          timerange: req.body.range,
        });
        const savedGraphData = await graphData.save();
        console.log(savedGraphData, "graph data ---");
      } catch (err) {
        console.log(err);
      }

      // RETURN UPDATED BID
      return res.status(200).json(availableBid);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    // return res.status(200).json(updatedBid);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  createBid,
  graphData,
  findBidsByFarmerId,
  findUniformBidsByFarmerId,
  updateBidAFterFarmerAccepts,
  handleBuyerResponseWithOtherUpdates,
};
