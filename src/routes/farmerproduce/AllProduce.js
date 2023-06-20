const {
  createAllProduce,
  getAllProduce,
} = require("../../controllers/farmerproduce/allproduce");

/**
 * @swagger
 * tags:
 *   name: All Produce
 *   description: All Produce Endpoints
 */

const allProduceRoutes = (router) => {
  // CREATE ALL PRODUCE *****************************

  /**
   * @swagger
   * /allproduce:
   *   post:
   *     summary: Create a new produce item or update existing item's quantity.
   *     tags: [All Produce]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
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
   *       '201':
   *         description: The newly created produce item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: The ID of the produce item.
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
   *       '200':
   *         description: The quantity of an existing produce item has been updated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The success message.
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

  router.post("/allproduce", createAllProduce);

  // GET ALL PRODUCE IN THE DB *******************

  /**
   * @swagger
   * /allproduce:
   *   get:
   *     summary: Get all produce items in the database.
   *     tags: [All Produce]
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
   *                   _id:
   *                     type: string
   *                     description: The ID of the produce item.
   *                   itemname:
   *                     type: string
   *                     description: The name of the produce item.
   *                   itemquantity:
   *                     type: number
   *                     description: The quantity of the produce item.
   *                   itemunit:
   *                     type: string
   *                     description: The unit of measurement for the produce item.
   *                   __v:
   *                     type: number
   *                     description: The version key.
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

  router.get("/allproduce", getAllProduce);

  // UPDATE PRODUCE ****************************

  /**
   * @swagger
   * /allproduce/update/{itemname}/{farmerId}:
   *   put:
   *     summary: Update the quantity of a produce item.
   *     tags: [All Produce]
   *     parameters:
   *       - in: path
   *         name: itemname
   *         required: true
   *         schema:
   *           type: string
   *         description: The name of the produce item.
   *       - in: path
   *         name: farmerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the farmer.
   *       - in: body
   *         name: requestBody
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             itemquantity:
   *               type: number
   *               description: The new quantity of the produce item.
   *     responses:
   *       '200':
   *         description: Successfully updated the quantity of the produce item.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The success message.
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

  router.put("/allproduce/update/:itemname/:farmerId");
};

module.exports = { allProduceRoutes };
