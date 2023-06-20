const {
  getBuyerNotifications,
  getFarmerNotifications,
  createNotifications,
  ceateSupplierNotifications,
  getSupplierNotifications,
} = require("../../controllers/notifications/notifications");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications Endpoints
 */

const notificationsRoute = (router) => {
  // Create notifications(buyers & sellers)

  /**
   * @swagger
   * /notifications:
   *   post:
   *     summary: Create notifications (buyers & sellers)
   *     tags: [Notifications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               buyerId:
   *                 type: string
   *                 description: The unique identifier of the buyer.
   *               farmerId:
   *                 type: string
   *                 description: The unique identifier of the farmer.
   *               itemname:
   *                 type: string
   *                 description: The name of the item.
   *               buyerprice:
   *                 type: number
   *                 description: The price set by the buyer.
   *               quantitybuyerneeds:
   *                 type: number
   *                 description: The quantity needed by the buyer.
   *               farmername:
   *                 type: string
   *                 description: The name of the farmer.
   *               bidId:
   *                 type: string
   *                 description: The unique identifier of the bid (optional).
   *               sendTo:
   *                 type: string
   *                 description: The recipient of the notification (e.g., "Buyer" or "Seller").
   *               message:
   *                 type: string
   *                 description: The notification message.
   *     responses:
   *       '201':
   *         description: The notification was created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 farmerId:
   *                   type: string
   *                   description: The unique identifier of the farmer.
   *                 buyerId:
   *                   type: string
   *                   description: The unique identifier of the buyer.
   *                 itemname:
   *                   type: string
   *                   description: The name of the item.
   *                 buyerprice:
   *                   type: number
   *                   description: The price set by the buyer.
   *                 quantitybuyerneeds:
   *                   type: number
   *                   description: The quantity needed by the buyer.
   *                 farmername:
   *                   type: string
   *                   description: The name of the farmer.
   *                 bidId:
   *                   type: string
   *                   description: The unique identifier of the bid.
   *                 sendTo:
   *                   type: string
   *                   description: The recipient of the notification.
   *                 message:
   *                   type: string
   *                   description: The notification message.
   *       '400':
   *         description: Notification already sent to the buyer.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   *       '500':
   *         description: An error occurred while creating the notification.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.post("/notifications", createNotifications);

  // Get all notifications of a partcular farmer

  /**
   * @swagger
   * /notifications/findfarmer/{farmerId}:
   *   get:
   *     summary: Get all notifications of a particular farmer
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: farmerId
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the farmer.
   *     responses:
   *       '200':
   *         description: The notifications were retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   farmerId:
   *                     type: string
   *                     description: The unique identifier of the farmer.
   *                   buyerId:
   *                     type: string
   *                     description: The unique identifier of the buyer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   buyerprice:
   *                     type: number
   *                     description: The price set by the buyer.
   *                   quantitybuyerneeds:
   *                     type: number
   *                     description: The quantity needed by the buyer.
   *                   farmername:
   *                     type: string
   *                     description: The name of the farmer.
   *                   bidId:
   *                     type: string
   *                     description: The unique identifier of the bid.
   *                   sendTo:
   *                     type: string
   *                     description: The recipient of the notification.
   *                   message:
   *                     type: string
   *                     description: The notification message.
   *       '500':
   *         description: An error occurred while retrieving the notifications.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get("/notifications/findfarmer/:farmerId", getFarmerNotifications);

  // Get all notifications of a partcular buyer

  /**
   * @swagger
   * /notifications/finduser/{id}:
   *   get:
   *     summary: Get all notifications of a particular buyer or farmer
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the buyer or farmer.
   *     responses:
   *       '200':
   *         description: The notifications were retrieved successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   farmerId:
   *                     type: string
   *                     description: The unique identifier of the farmer.
   *                   buyerId:
   *                     type: string
   *                     description: The unique identifier of the buyer.
   *                   itemname:
   *                     type: string
   *                     description: The name of the item.
   *                   buyerprice:
   *                     type: number
   *                     description: The price set by the buyer.
   *                   quantitybuyerneeds:
   *                     type: number
   *                     description: The quantity needed by the buyer.
   *                   farmername:
   *                     type: string
   *                     description: The name of the farmer.
   *                   bidId:
   *                     type: string
   *                     description: The unique identifier of the bid.
   *                   sendTo:
   *                     type: string
   *                     description: The recipient of the notification.
   *                   message:
   *                     type: string
   *                     description: The notification message.
   *       '500':
   *         description: An error occurred while retrieving the notifications.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get("/notifications/finduser/:id", getBuyerNotifications);

  // Create notifications(suppliers)

  /**
   * @swagger
   * /notifications/suppliers:
   *   post:
   *     summary: Create a notification for suppliers
   *     tags: [Notifications]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               supplierId:
   *                 type: string
   *                 description: The unique identifier of the supplier.
   *               userId:
   *                 type: string
   *                 description: The unique identifier of the user.
   *               message:
   *                 type: string
   *                 description: The notification message.
   *     responses:
   *       '200':
   *         description: The notification was created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                   description: The unique identifier of the notification.
   *                 supplierId:
   *                   type: string
   *                   description: The unique identifier of the supplier.
   *                 userId:
   *                   type: string
   *                   description: The unique identifier of the user.
   *                 message:
   *                   type: string
   *                   description: The notification message.
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                   description: The creation timestamp of the notification.
   *                 updatedAt:
   *                   type: string
   *                   format: date-time
   *                   description: The last update timestamp of the notification.
   *       '500':
   *         description: An error occurred while creating the notification.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.post("/notifications/suppliers", ceateSupplierNotifications);

  // Get all notifications of a partcular supplier

  /**
   * @swagger
   * /notifications/supplier/findsupplier/{supplierId}:
   *   get:
   *     summary: Get notifications of a particular supplier
   *     tags: [Notifications]
   *     parameters:
   *       - in: path
   *         name: supplierId
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the supplier.
   *     responses:
   *       '200':
   *         description: The notifications retrieval was successful.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   _id:
   *                     type: string
   *                     description: The unique identifier of the notification.
   *                   supplierId:
   *                     type: string
   *                     description: The unique identifier of the supplier.
   *                   userId:
   *                     type: string
   *                     description: The unique identifier of the user.
   *                   message:
   *                     type: string
   *                     description: The notification message.
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                     description: The creation timestamp of the notification.
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *                     description: The last update timestamp of the notification.
   *       '500':
   *         description: An error occurred while retrieving the notifications.
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
    "/notifications/supplier/findsupplier/:supplierId",
    getSupplierNotifications
  );
};

module.exports = { notificationsRoute };
