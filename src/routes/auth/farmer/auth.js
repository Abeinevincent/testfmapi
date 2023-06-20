const {
  createFarmer,
  loginFarmer,
} = require("../../../controllers/auth/farmer");

/**
 * @swagger
 * tags:
 *   name: Farmer Authentication
 *   description: Farmer Authentication endpoints
 */
const auth = (router) => {
  /**
   * @swagger
   * /auth/farmer/register:
   *   post:
   *     summary: Register a new farmer
   *     tags: [Farmer Authentication]
   *     requestBody:
   *       description: Farmer registration data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               fullName:
   *                 type: string
   *                 required: true
   *               email:
   *                 type: string
   *                 required: true
   *               password:
   *                 type: string
   *                 required: true
   *               location:
   *                 type: object
   *                 properties:
   *                   longitude:
   *                     type: number
   *                     required: true
   *                   latitude:
   *                     type: number
   *                     required: true
   *                   country:
   *                     type: string
   *                     required: true
   *                   district:
   *                     type: string
   *                     required: true
   *                   subCounty:
   *                     type: string
   *                   distanceFromTarmac:
   *                     type: number
   *                     required: true
   *               meta:
   *                 type: object
   *                 properties:
   *                   displayImage:
   *                     type: string
   *                   primaryPhoneNumber:
   *                     type: string
   *                     required: true
   *                   alternatePhoneNumber:
   *                     type: string
   *                     required: true
   *               listingId:
   *                 type: array
   *                 items:
   *                   type: string
   *               isFarmer:
   *                 type: boolean
   *                 default: true
   *     responses:
   *       200:
   *         description: User registered successfully
   *       400:
   *         description: Invalid request body or user already exists
   *       404:
   *         description: Route handler does not exist
   *       500:
   *         description: Internal server error
   */

  router.post("/auth/farmer/register", createFarmer);

  /**
   * @swagger
   * /auth/farmer/login:
   *   post:
   *     summary: Login a farmer
   *     tags: [Farmer Authentication]
   *     requestBody:
   *       description: Farmer login data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Farmer's email
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: User logged in successfully
   *       400:
   *         description: Invalid request body or incorrect credentials
   *       404:
   *         description: Farmer details do not exist
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/farmer/login", loginFarmer);
};

module.exports = auth;
