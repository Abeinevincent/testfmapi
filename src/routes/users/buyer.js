const {
  updateBuyer,
  updateBuyerPassword,
  getBuyerById,
  getBuyerByEmail,
} = require("../../controllers/buyer/buyer");
const { verifyTokenAndAuthorisedBuyer } = require("../../helpers/token");

/**
 * @swagger
 * tags:
 *   name: Buyer
 *   description: Buyer management endpoints
 */

const buyerRoutes = (router) => {
  // UPDATE USER *****************************

  /**
   * @swagger
   * /buyer/update/{id}:
   *   put:
   *     summary: Update buyer
   *     description: Update the details of a buyer.
   *     tags: [Buyer]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the buyer to update
   *       - in: header
   *         name: Authorization
   *         schema:
   *           type: string
   *         required: true
   *         description: Bearer token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullname:
   *                 type: string
   *               email:
   *                 type: string
   *               profileimage:
   *                 type: string
   *               phonenumber:
   *                 type: string
   *               password:
   *                 type: string
   *               isCommercialBuyer:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Buyer has been updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 updatedBuyer:
   *                   type: object
   *       500:
   *         description: Internal server error
   */

  router.put("/update/:id", verifyTokenAndAuthorisedBuyer, updateBuyer);

  // UPDATE FARMER PASSWORD *****************************

  /**
   * @swagger
   * /buyer/updatepassword/{id}:
   *   put:
   *     summary: Update buyer's password
   *     tags: [Buyer]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the buyer to update
   *       - in: body
   *         name: body
   *         description: Buyer's password
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             password:
   *               type: string
   *         example:
   *           password: newpassword123
   *     responses:
   *       200:
   *         description: Buyer's password has been updated
   *       500:
   *         description: Internal server error
   */

  router.put("/updatepassword/:id", updateBuyerPassword);

  // GET BUYER ***********************

  /**
   * @swagger
   * /buyer/{id}:
   *   get:
   *     summary: Get buyer by ID
   *     tags: [Buyer]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the buyer to retrieve
   *     responses:
   *       200:
   *         description: Buyer retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 fullName:
   *                   type: string
   *                 email:
   *                   type: string
   *                 profileImage:
   *                   type: string
   *                 phoneNumber:
   *                   type: string
   *                 isCommercialBuyer:
   *                   type: boolean
   *                 isBuyer:
   *                   type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/:id", getBuyerById);

  // GET FARMER BY EMAIL ***********************

  /**
   * @swagger
   * /buyer/getbuyer/{email}:
   *   get:
   *     summary: Get buyer by email
   *     tags: [Buyer]
   *     parameters:
   *       - in: path
   *         name: email
   *         schema:
   *           type: string
   *         required: true
   *         description: Buyer's email address
   *     responses:
   *       200:
   *         description: Buyer retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 fullName:
   *                   type: string
   *                 email:
   *                   type: string
   *                 profileImage:
   *                   type: string
   *                 phoneNumber:
   *                   type: string
   *                 isCommercialBuyer:
   *                   type: boolean
   *                 isBuyer:
   *                   type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/getbuyer/:email", getBuyerByEmail);
};

module.exports = buyerRoutes;
