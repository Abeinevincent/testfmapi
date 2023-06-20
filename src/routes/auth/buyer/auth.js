const { createBuyer, loginBuyer } = require("../../../controllers/auth/buyer");

/**
 * @swagger
 * tags:
 *   name: Buyer Authentication
 *   description: Buyer Authentication endpoints
 */
const buyerAuth = (router) => {
  /**
   * @swagger
   * /auth/buyer/register:
   *   post:
   *     summary: Register a new buyer
   *     tags: [Buyer Authentication]
   *     requestBody:
   *       description: Buyer registration data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullname:
   *                 type: string
   *                 required: true
   *               email:
   *                 type: string
   *                 required: true
   *               phonenumber:
   *                 type: string
   *                 required: true
   *               isCommercialBuyer:
   *                 type: boolean
   *               password:
   *                 type: string
   *                 required: true
   *     responses:
   *       201:
   *         description: Buyer registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 fullname:
   *                   type: string
   *                 email:
   *                   type: string
   *                 phonenumber:
   *                   type: string
   *                 isCommercialBuyer:
   *                   type: boolean
   *       400:
   *         description: Invalid request body or buyer already exists
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/buyer/register", createBuyer);

  /**
   * @swagger
   * /auth/buyer/login:
   *   post:
   *     summary: Login as a buyer
   *     tags: [Buyer Authentication]
   *     requestBody:
   *       description: Buyer login data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Buyer's email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Buyer logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The success message.
   *                 user:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     fullname:
   *                       type: string
   *                     email:
   *                       type: string
   *                     phonenumber:
   *                       type: string
   *                     isCommercialBuyer:
   *                       type: boolean
   *                 token:
   *                   type: string
   *                   description: The access token.
   *       400:
   *         description: Incorrect password or buyer not found
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/buyer/login", loginBuyer);
};

module.exports = buyerAuth;
