const {
  createBid,
  graphData,
  findBidsByFarmerId,
  findUniformBidsByFarmerId,
  updateBidAFterFarmerAccepts,
  handleBuyerResponseWithOtherUpdates,
} = require("../../controllers/biditem/biditem");

/**
 * @swagger
 * tags:
 *   name: Bid Items
 *   description: Bid Items End Points
 */

const bidItemsRoute = (router) => {
  // SIMPLIFIED END POINTS**************************************************************************

  // CREATE  A BID

  /**
   * @swagger
   * /biditem/newbid:
   *   post:
   *     summary: Create a new bid.
   *     description: Creates a new bid item with the provided information.
   *     tags: [Bid Items]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               farmerId:
   *                 type: string
   *                 description: The ID of the farmer.
   *               buyerId:
   *                 type: string
   *                 description: The ID of the buyer.
   *               quantitybuyerneeds:
   *                 type: number
   *                 description: The quantity the buyer needs.
   *               itemname:
   *                 type: string
   *                 description: The name of the item.
   *               itemquantity:
   *                 type: number
   *                 description: The quantity of the item.
   *               buyername:
   *                 type: string
   *                 description: The name of the buyer.
   *               itemprice:
   *                 type: string
   *                 description: The price of the item.
   *               buyerContact:
   *                 type: string
   *                 description: The contact information of the buyer.
   *               buyerprice:
   *                 type: number
   *                 description: The price set by the buyer.
   *             example:
   *               farmerId: 1234567890
   *               buyerId: abcdefghij
   *               quantitybuyerneeds: 10
   *               itemname: Apple
   *               itemquantity: 50
   *               buyername: John Doe
   *               itemprice: 2500
   *               buyerContact: john@example.com
   *               buyerprice: 2.00
   *     responses:
   *       400:
   *         description: Invalid request body or buyer already exists
   *       500:
   *         description: Internal server error
   *       201:
   *         description: The created bid.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: The ID of the bid item.
   *                 farmerId:
   *                   type: string
   *                   description: The ID of the farmer.
   *                 buyerId:
   *                   type: string
   *                   description: The ID of the buyer.
   *                 quantitybuyerneeds:
   *                   type: number
   *                   description: The quantity the buyer needs.
   *                 itemname:
   *                   type: string
   *                   description: The name of the item.
   *                 itemquantity:
   *                   type: number
   *                   description: The quantity of the item.
   *                 buyername:
   *                   type: string
   *                   description: The name of the buyer.
   *                 itemprice:
   *                   type: string
   *                   description: The price of the item.
   *                 buyerContact:
   *                   type: string
   *                   description: The contact information of the buyer.
   *                 buyerprice:
   *                   type: number
   *                   description: The price set by the buyer.
   *                 isAccepted:
   *                   type: boolean
   *                   description: Indicates if the bid is accepted or not.
   *                 status:
   *                   type: string
   *                   description: The status
   *
   */

  router.post("/biditem/newbid", createBid);

  // FIND GRAPH DATA BY ITEMNAME AND TIMERANGE

  /**
   * @swagger
   * /biditem/graphdata/{itemname}/{timerange}:
   *   get:
   *     summary: Find graph data by item name and time range.
   *     tags: [Bid Items]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the item.
   *       - in: path
   *         name: timerange
   *         required: true
   *         schema:
   *           type: string
   *         description: The time range for the graph data.
   *     responses:
   *       200:
   *         description: The graph data matching the item name and time range.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The ID of the graph data.
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   timerange:
   *                     type: string
   *                     description: The time range for the graph data.
   *                   data:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         x:
   *                           type: number
   *                           description: The x-coordinate value.
   *                         y:
   *                           type: number
   *                           description: The y-coordinate value.
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get("/biditem/graphdata/:itemname/:timerange", graphData);

  // FIND BIDS BY FARMERID AND ITEMNAME ***

  /**
   * @swagger
   * /biditem/findbidsbyfarmerId/{farmerId}/{itemname}:
   *   get:
   *     summary: Find bids by farmer ID and item name.
   *     tags: [Bid Items]
   *     parameters:
   *       - in: path
   *         name: farmerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer.
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the item.
   *     responses:
   *       200:
   *         description: The bids matching the farmer ID and item name.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   buyername:
   *                     type: string
   *                     description: The name of the buyer.
   *                   itemquantity:
   *                     type: number
   *                     description: The quantity of the item.
   *                   quantitybuyerneeds:
   *                     type: number
   *                     description: The quantity needed by the buyer.
   *                   itemprice:
   *                     type: string
   *                     description: The price of the item.
   *                   buyerContact:
   *                     type: string
   *                     description: The contact information of the buyer.
   *                   buyerprice:
   *                     type: number
   *                     description: The price set by the buyer.
   *                   isAccepted:
   *                     type: boolean
   *                     description: Indicates if the bid is accepted.
   *                   status:
   *                     type: string
   *                     description: The status of the bid.
   *                   accepteddate:
   *                     type: string
   *                     description: The date when the bid was accepted.
   *                   buyerResponded:
   *                     type: boolean
   *                     description: Indicates if the buyer has responded.
   *                   acceptedtime:
   *                     type: string
   *                     description: The time when the bid was accepted.
   *                   buyerId:
   *                     type: string
   *                     description: The ID of the buyer.
   *                   farmerId:
   *                     type: string
   *                     description: The ID of the farmer.
   *                   auctionId:
   *                     type: string
   *                     description: The ID of the auction.
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get(
    "/biditem/findbidsbyfarmerId/:farmerId/:itemname",
    findBidsByFarmerId
  );

  // FIND UNIFORM BIDS BY FARMERID ***

  /**
   * @swagger
   * /biditem/finduniformbidsbyfarmerId/{farmerId}:
   *   get:
   *     summary: Find uniform bids by farmer ID.
   *     tags: [Bid Items]
   *     parameters:
   *       - in: path
   *         name: farmerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer.
   *     responses:
   *       200:
   *         description: The uniform bids matching the farmer ID.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   farmerId:
   *                     type: string
   *                     description: The ID of the farmer.
   *                   itemimage:
   *                     type: string
   *                     description: The image of the item.
   *                   numberOfBids:
   *                     type: number
   *                     description: The number of bids for the item.
   *                   itemprice:
   *                     type: number
   *                     description: The price of the item.
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get(
    "/biditem/finduniformbidsbyfarmerId/:farmerId",
    findUniformBidsByFarmerId
  );

  // UPDATE BID UPON FARMER ACCEPTANCE ******************************************************

  /**
   * @swagger
   * /biditem/acceptbid/{bidId}:
   *   put:
   *     summary: Update bid upon farmer acceptance.
   *     tags: [Bid Items]
   *     parameters:
   *       - in: path
   *         name: bidId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the bid.
   *     responses:
   *       200:
   *         description: The updated bid after farmer acceptance.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BidItem'
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.put("/biditem/acceptbid/:bidId", updateBidAFterFarmerAccepts);

  // HANDLE BUYER RESPONSE BY MAKING OTHER UPDATES  ********************************************************

  /**
   * @swagger
   * /biditem/buyerresponse/updatebid/{bidId}:
   *   put:
   *     summary: Handle buyer response and make other updates to bid
   *     tags: [Bid Items]
   *     parameters:
   *       - in: path
   *         name: bidId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the bid to update.
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               currentTime:
   *                 type: string
   *                 description: The current time.
   *               range:
   *                 type: string
   *                 description: The range for the graph data.
   *             example:
   *               currentTime: "12:34 PM"
   *               range: "1 week"
   *     responses:
   *       '200':
   *         description: The updated bid with additional updates.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 itemname:
   *                   type: string
   *                   description: The name of the item.
   *                 buyername:
   *                   type: string
   *                   description: The name of the buyer.
   *                 itemquantity:
   *                   type: number
   *                   description: The quantity of the item.
   *                 quantitybuyerneeds:
   *                   type: number
   *                   description: The quantity of the item needed by the buyer.
   *                 itemprice:
   *                   type: string
   *                   description: The price of the item.
   *                 buyerContact:
   *                   type: string
   *                   description: The contact information of the buyer.
   *                 buyerprice:
   *                   type: number
   *                   description: The price offered by the buyer.
   *                 isAccepted:
   *                   type: boolean
   *                   description: Indicates if the bid is accepted by the farmer.
   *                 status:
   *                   type: string
   *                   description: The status of the bid.
   *                 accepteddate:
   *                   type: string
   *                   description: The date when the bid is accepted.
   *                 buyerResponded:
   *                   type: boolean
   *                   description: Indicates if the buyer has responded.
   *                 acceptedtime:
   *                   type: string
   *                   description: The time when the bid is accepted.
   *                 buyerId:
   *                   type: string
   *                   description: The ID of the buyer.
   *                 farmerId:
   *                   type: string
   *                   description: The ID of the farmer.
   *                 auctionId:
   *                   type: string
   *                   description: The ID of the auction.
   *               example:
   *                 itemname: "Apple"
   *                 buyername: "John Doe"
   *                 itemquantity: 10
   *                 quantitybuyerneeds: 5
   *                 itemprice: "10 USD"
   *                 buyerContact: "john.doe@example.com"
   *                 buyerprice: 8
   *                 isAccepted: true
   *                 status: "Pending"
   *                 accepteddate: "2023-06-20"
   *                 buyerResponded: true
   *                 acceptedtime: "12:34 PM"
   *                 buyerId: "123456789"
   *                 farmerId: "987654321"
   *                 auctionId: "555555555"
   */

  router.put(
    "/biditem/buyerresponse/updatebid/:bidId",
    handleBuyerResponseWithOtherUpdates
  );
};

module.exports = { bidItemsRoute };
