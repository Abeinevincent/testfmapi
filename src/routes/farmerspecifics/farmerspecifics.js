const {
  createFarmerSpecifics,
  getAllFarmerSpecificsOfAParticularFarmer,
  getItemsByFarmerIdAndDistrict,
  updateFarmerSpecifics,
  filterFarmerSpecifics,
} = require("../../controllers/farmerspecifics/farmerspecifics");
const { verifyToken } = require("../../helpers/token");

/**
 * @swagger
 * tags:
 *   name: Farmer Specifics
 *   description: Farmer Specifics Endpoints
 */

const farmerSpecificsRoutes = (router) => {
  // Create farmerspecifics

  /**
   * @swagger
   * /farmerspecifics:
   *   post:
   *     summary: Create farmer-specific produce item.
   *     tags: [Farmer Specifics]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               farmername:
   *                 type: string
   *                 description: The name of the farmer.
   *               itemname:
   *                 type: string
   *                 description: The name of the produce item.
   *               itemquantity:
   *                 type: number
   *                 description: The quantity of the produce item.
   *               itemunit:
   *                 type: string
   *                 description: The unit of measurement for the produce item.
   *               itemstatus:
   *                 type: string
   *                 description: The status of the produce item.
   *               itemprice:
   *                 type: string
   *                 description: The price of the produce item.
   *     responses:
   *       '200':
   *         description: The farmer-specific produce item has been created.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 farmername:
   *                   type: string
   *                   description: The name of the farmer.
   *                 itemname:
   *                   type: string
   *                   description: The name of the produce item.
   *                 itemquantity:
   *                   type: number
   *                   description: The quantity of the produce item.
   *                 itemunit:
   *                   type: string
   *                   description: The unit of measurement for the produce item.
   *                 itemstatus:
   *                   type: string
   *                   description: The status of the produce item.
   *                 itemprice:
   *                   type: string
   *                   description: The price of the produce item.
   *       '400':
   *         description: Farmer has already uploaded this produce item.
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               description: The error message.
   *       '500':
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

  router.post("/farmerspecifics", verifyToken, createFarmerSpecifics);

  // Get all items in a farmerspecifics of a partcular farmer

  /**
   * @swagger
   * /farmerspecifics/findall/{itemname}:
   *   get:
   *     summary: Get all farmer-specific produce items of a particular farmer.
   *     tags: [Farmer Specifics]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the produce item.
   *     responses:
   *       '200':
   *         description: Returns all farmer-specific produce items of the particular farmer.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   farmername:
   *                     type: string
   *                     description: The name of the farmer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the produce item.
   *                   itemquantity:
   *                     type: number
   *                     description: The quantity of the produce item.
   *                   itemunit:
   *                     type: string
   *                     description: The unit of measurement for the produce item.
   *                   itemstatus:
   *                     type: string
   *                     description: The status of the produce item.
   *                   itemprice:
   *                     type: string
   *                     description: The price of the produce item.
   *       '500':
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
    "/farmerspecifics/findall/:itemname",
    getAllFarmerSpecificsOfAParticularFarmer
  );

  // Get all items in a farmerspecifics of a partcular farmer oof a particular district

  /**
   * @swagger
   * /farmerspecifics/findall/{itemname}/{districtname}/{pricerange}/{quantity}:
   *   get:
   *     summary: Get farmer-specific produce items of a particular item, district, price range, and quantity.
   *     tags: [Farmer Specifics]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the produce item.
   *       - in: path
   *         name: districtname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the district.
   *       - in: path
   *         name: pricerange
   *         required: true
   *         schema:
   *           type: string
   *         description: The price range of the produce items.
   *       - in: path
   *         name: quantity
   *         required: true
   *         schema:
   *           type: string
   *         description: The quantity of the produce items.
   *     responses:
   *       '200':
   *         description: Returns farmer-specific produce items matching the specified item, district, price range, and quantity.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   farmername:
   *                     type: string
   *                     description: The name of the farmer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the produce item.
   *                   itemquantity:
   *                     type: number
   *                     description: The quantity of the produce item.
   *                   itemunit:
   *                     type: string
   *                     description: The unit of measurement for the produce item.
   *                   itemstatus:
   *                     type: string
   *                     description: The status of the produce item.
   *                   itemprice:
   *                     type: string
   *                     description: The price of the produce item.
   *       '500':
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
    "/farmerspecifics/findall/:itemname/:districtname/:pricerange/:quantity",
    getItemsByFarmerIdAndDistrict
  );

  // UPDATE ITEM **********************************************************************

  /**
   * @swagger
   * /farmerspecifics/{itemname}/{farmername}:
   *   put:
   *     summary: Update item quantity in farmer-specifics.
   *     tags: [Farmer Specifics]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the item.
   *       - in: path
   *         name: farmername
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the farmer.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               itemquantity:
   *                 type: number
   *                 description: The updated quantity of the item.
   *     responses:
   *       '200':
   *         description: Item quantity has been successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The success message.
   *       '400':
   *         description: Farmer or item does not exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   *       '500':
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

  router.put("/farmerspecifics/:itemname/:farmername", updateFarmerSpecifics);

  // FILTER BY DISTRICT OR PRICE OR QUANTITY

  /**
   * @swagger
   * /farmerspecifics/filter/{itemname}/{farmerdistrict}/{itemprice}/{itemquantity}:
   *   get:
   *     summary: Filter farmer-specifics by district, price, and quantity.
   *     tags: [Farmer Specifics]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the item.
   *       - in: path
   *         name: farmerdistrict
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the farmer district.
   *       - in: path
   *         name: itemprice
   *         required: true
   *         schema:
   *           type: number
   *         description: The minimum price of the item.
   *       - in: path
   *         name: itemquantity
   *         required: true
   *         schema:
   *           type: number
   *         description: The maximum quantity of the item.
   *     responses:
   *       '200':
   *         description: Farmer-specifics filtered by district, price, and quantity.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The unique identifier of the farmer-specifics.
   *                   farmername:
   *                     type: string
   *                     description: The name of the farmer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   farmerdistrict:
   *                     type: string
   *                     description: The district of the farmer.
   *                   itemprice:
   *                     type: number
   *                     description: The price of the item.
   *                   itemquantity:
   *                     type: number
   *                     description: The quantity of the item.
   *       '500':
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
    "/farmerspecifics/filter/:itemname/:farmerdistrict/:itemprice/:itemquantity",
    filterFarmerSpecifics
  );
};

module.exports = farmerSpecificsRoutes;
