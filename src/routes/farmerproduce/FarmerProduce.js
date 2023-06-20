const { verifyTokenAndFarmer } = require("../../helpers/token");

const {
  createFarmerProduce,
  updateProduce,
  getProduceById,
  getAllProduce,
  getAFarmersParticularProduce,
  getFarmersAllProduce,
} = require("../../controllers/farmerproduce/farmerproduce");

/**
 * @swagger
 * tags:
 *   name: Farmer Produce
 *   description: Farmer Produce End Points
 */

const farmerProduceRoutes = (router) => {
  // CREATE FARMER PRODUCE *****************************

  /**
   * @swagger
   * /farmerproduce:
   *   post:
   *     summary: Create a new farmer produce item.
   *     tags: [Farmer Produce]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               itemname:
   *                 type: string
   *                 required: true
   *               itemimage:
   *                 type: string
   *                 required: true
   *               itemquantity:
   *                 type: number
   *               itemunit:
   *                 type: string
   *               itemstatus:
   *                 type: string
   *                 required: true
   *               itemprice:
   *                 type: string
   *                 required: true
   *               farmerId:
   *                 type: string
   *                 required: true
   *     responses:
   *       '201':
   *         description: The created farmer produce item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 itemname:
   *                   type: string
   *                 itemimage:
   *                   type: string
   *                 itemquantity:
   *                   type: number
   *                 itemunit:
   *                   type: string
   *                 itemstatus:
   *                   type: string
   *                 itemprice:
   *                   type: string
   *                 farmerId:
   *                   type: string
   *       '400':
   *         description: Item already exists.
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

  router.post("/farmerproduce", verifyTokenAndFarmer, createFarmerProduce);

  // UPDATE FARMER PRODUCE *****************************

  /**
   * @swagger
   * /farmerproduce/{id}:
   *   put:
   *     summary: Update a farmer produce item.
   *     tags: [Farmer Produce]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer produce item.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               itemname:
   *                 type: string
   *               itemimage:
   *                 type: string
   *               itemquantity:
   *                 type: number
   *               itemunit:
   *                 type: string
   *               itemstatus:
   *                 type: string
   *               itemprice:
   *                 type: string
   *               farmerId:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Farmer produce item has been updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Success message.
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

  router.put("/:id", updateProduce);

  // GET FARMER LISTING ********************************************************

  /**
   * @swagger
   * /farmerproduce/{id}:
   *   get:
   *     summary: Get a farmer produce item by ID.
   *     tags: [Farmer Produce]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer produce item.
   *     responses:
   *       '200':
   *         description: Farmer produce item retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: The ID of the farmer produce item.
   *                 itemname:
   *                   type: string
   *                   description: The name of the produce item.
   *                 itemimage:
   *                   type: string
   *                   description: The image of the produce item.
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
   *                 farmerId:
   *                   type: string
   *                   description: The ID of the farmer associated with the produce item.
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

  router.get("/:id", getProduceById);

  // GET A FARMER'S ALL LISTINGS ***********************************************************

  /**
   * @swagger
   * /farmerproduce/findfarmer/{farmerId}:
   *   get:
   *     summary: Get all produce items for a specific farmer.
   *     tags: [Farmer Produce]
   *     parameters:
   *       - in: path
   *         name: farmerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer.
   *     responses:
   *       '200':
   *         description: List of produce items for the specified farmer.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The ID of the farmer produce item.
   *                   itemname:
   *                     type: string
   *                     description: The name of the produce item.
   *                   itemimage:
   *                     type: string
   *                     description: The image of the produce item.
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
   *                   farmerId:
   *                     type: string
   *                     description: The ID of the farmer associated with the produce item.
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

  router.get("/findfarmer/:farmerId", getFarmersAllProduce);

  // GET A FARMER'S PARTICULAR LISTING ****************************************************

  /**
   * @swagger
   * /farmerproduce/findfarmer/{farmerId}/{itemname}:
   *   get:
   *     summary: Get a particular produce item for a specific farmer.
   *     tags: [Farmer Produce]
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
   *         description: The name of the produce item.
   *     responses:
   *       '200':
   *         description: The produce item for the specified farmer.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 farmerId:
   *                   type: string
   *                   description: The ID of the farmer.
   *                 itemname:
   *                   type: string
   *                   description: The name of the produce item.
   *                 itemimage:
   *                   type: string
   *                   description: The image of the produce item.
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

  router.get("/findfarmer/:farmerId/:itemname", getAFarmersParticularProduce);

  // GET ALL PRODUCE IN THE DB ****************************************
  /**
   * @swagger
   * /farmerproduce:
   *   get:
   *     summary: Get all produce items.
   *     tags: [Farmer Produce]
   *     responses:
   *       '200':
   *         description: A list of all produce items.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   farmerId:
   *                     type: string
   *                     description: The ID of the farmer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the produce item.
   *                   itemimage:
   *                     type: string
   *                     description: The image of the produce item.
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
  router.get("/", getAllProduce);
};

module.exports = farmerProduceRoutes;
