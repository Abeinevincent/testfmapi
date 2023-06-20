const {
  updateFarmer,
  updateFarmerPassword,
  getFarmerById,
  getFarmerByDistrict,
  getFarmersInADistrict,
  getFarmerByEmail,
  getAllFarmers,
} = require("../../controllers/farmer/farmer");
const { verifyTokenAndAuthorisedFarmer } = require("../../helpers/token");

/**
 * @swagger
 * tags:
 *   name: Farmer
 *   description: Farmer management endpoints
 */

const farmerRoute = (router) => {
  // UPDATE FARMER *****************************
  /**
   * @swagger
   * /farmer/{id}:
   *   put:
   *     summary: Update a farmer
   *     tags: [Farmer]
   *     description: Update a farmer by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the farmer to update
   *         schema:
   *           type: string
   *       - in: header
   *         name: Authorization
   *         required: true
   *         description: Access token
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               age:
   *                 type: number
   *               address:
   *                 type: string
   *             example:
   *               name: John Doe
   *               age: 30
   *               address: Sample Address
   *     responses:
   *       200:
   *         description: Farmer has been updated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 updatedFarmer:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     name:
   *                       type: string
   *                     age:
   *                       type: number
   *                     address:
   *                       type: string
   *             example:
   *               message: Farmer has been updated
   *               updatedFarmer:
   *                 _id: 12345
   *                 name: John Doe
   *                 age: 30
   *                 address: Sample Address
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *             example:
   *               error: Unauthorized
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *             example:
   *               error: Internal Server Error
   */
  router.put("/:id", verifyTokenAndAuthorisedFarmer, updateFarmer);

  // UPDATE FARMER PASSWORD *****************************

  /**
   * @swagger
   * /farmer/updatepassword/{id}:
   *   put:
   *     summary: Update farmer's password
   *     tags: [Farmer]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the farmer to update password
   *     requestBody:
   *       description: New password data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               password:
   *                 type: string
   *                 required: true
   *     responses:
   *       200:
   *         description: Farmer's password updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The success message.
   *       500:
   *         description: Internal server error
   */

  router.put("/updatepassword/:id", updateFarmerPassword);

  // GET FARMER ***********************

  /**
   * @swagger
   * /farmer/{id}:
   *   get:
   *     summary: Get farmer by ID
   *     tags: [Farmer]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the farmer to retrieve
   *     responses:
   *       200:
   *         description: Farmer retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 fullName:
   *                   type: string
   *                 email:
   *                   type: string
   *                 password:
   *                   type: string
   *                 location:
   *                   type: object
   *                   properties:
   *                     longitude:
   *                       type: number
   *                     latitude:
   *                       type: number
   *                     country:
   *                       type: string
   *                     district:
   *                       type: string
   *                     subCounty:
   *                       type: string
   *                     distanceFromTarmac:
   *                       type: number
   *                 meta:
   *                   type: object
   *                   properties:
   *                     displayImage:
   *                       type: string
   *                     primaryPhoneNumber:
   *                       type: string
   *                     alternatePhoneNumber:
   *                       type: string
   *                 listingId:
   *                   type: array
   *                   items:
   *                     type: string
   *                 isFarmer:
   *                   type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/:id", getFarmerById);

  // GET FARMER BY DISTRICT ***********************

  /**
   * @swagger
   * /farmer/findbydistrict/{district}:
   *   get:
   *     summary: Get farmers by district
   *     tags: [Farmer]
   *     parameters:
   *       - in: path
   *         name: district
   *         schema:
   *           type: string
   *         required: true
   *         description: District of the farmers to retrieve
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                   fullName:
   *                     type: string
   *                   email:
   *                     type: string
   *                   password:
   *                     type: string
   *                   location:
   *                     type: object
   *                     properties:
   *                       longitude:
   *                         type: number
   *                       latitude:
   *                         type: number
   *                       country:
   *                         type: string
   *                       district:
   *                         type: string
   *                       subCounty:
   *                         type: string
   *                       distanceFromTarmac:
   *                         type: number
   *                   meta:
   *                     type: object
   *                     properties:
   *                       displayImage:
   *                         type: string
   *                       primaryPhoneNumber:
   *                         type: string
   *                       alternatePhoneNumber:
   *                         type: string
   *                   listingId:
   *                     type: array
   *                     items:
   *                       type: string
   *                   isFarmer:
   *                     type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/findbydistrict/:district", getFarmerByDistrict);

  // FIND FARMERS IN DISTRICT BY THEIR SCHEMA/MODEL

  /**
   * @swagger
   * /farmer/find/farmersindistrict:
   *   get:
   *     summary: Get farmers in a district
   *     tags: [Farmer]
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                   fullName:
   *                     type: string
   *                   email:
   *                     type: string
   *                   location:
   *                     type: object
   *                     properties:
   *                       longitude:
   *                         type: number
   *                       latitude:
   *                         type: number
   *                       country:
   *                         type: string
   *                       district:
   *                         type: string
   *                       subCounty:
   *                         type: string
   *                       distanceFromTarmac:
   *                         type: number
   *                   meta:
   *                     type: object
   *                     properties:
   *                       displayImage:
   *                         type: string
   *                       primaryPhoneNumber:
   *                         type: string
   *                       alternatePhoneNumber:
   *                         type: string
   *                   listingId:
   *                     type: array
   *                     items:
   *                       type: string
   *                   isFarmer:
   *                     type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/find/farmersindistrict", getFarmersInADistrict);

  // GET FARMER BY EMAIL ***********************

  /**
   * @swagger
   * /farmer/getfarmer/{email}:
   *   get:
   *     summary: Get farmer by email
   *     tags: [Farmer]
   *     parameters:
   *       - in: path
   *         name: email
   *         schema:
   *           type: string
   *         required: true
   *         description: Farmer's email address
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 fullName:
   *                   type: string
   *                 email:
   *                   type: string
   *                 location:
   *                   type: object
   *                   properties:
   *                     longitude:
   *                       type: number
   *                     latitude:
   *                       type: number
   *                     country:
   *                       type: string
   *                     district:
   *                       type: string
   *                     subCounty:
   *                       type: string
   *                     distanceFromTarmac:
   *                       type: number
   *                 meta:
   *                   type: object
   *                   properties:
   *                     displayImage:
   *                       type: string
   *                     primaryPhoneNumber:
   *                       type: string
   *                     alternatePhoneNumber:
   *                       type: string
   *                 listingId:
   *                   type: array
   *                   items:
   *                     type: string
   *                 isFarmer:
   *                   type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/getfarmer/:email", getFarmerByEmail);

  // GET ALL FARMERS ************************

  /**
   * @swagger
   * /farmer:
   *   get:
   *     summary: Get all farmers
   *     tags: [Farmer]
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                   fullName:
   *                     type: string
   *                   email:
   *                     type: string
   *                   location:
   *                     type: object
   *                     properties:
   *                       longitude:
   *                         type: number
   *                       latitude:
   *                         type: number
   *                       country:
   *                         type: string
   *                       district:
   *                         type: string
   *                       subCounty:
   *                         type: string
   *                       distanceFromTarmac:
   *                         type: number
   *                   meta:
   *                     type: object
   *                     properties:
   *                       displayImage:
   *                         type: string
   *                       primaryPhoneNumber:
   *                         type: string
   *                       alternatePhoneNumber:
   *                         type: string
   *                   listingId:
   *                     type: array
   *                     items:
   *                       type: string
   *                   isFarmer:
   *                     type: boolean
   *       500:
   *         description: Internal server error
   */

  router.get("/farmers/findall", getAllFarmers);
};

module.exports = farmerRoute;
