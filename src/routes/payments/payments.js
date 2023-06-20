const {
  initiatePayment,
  getTransactionStatus,
  getPaymentDetails,
} = require("../../controllers/payments/payments");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment Endpoints
 */

const paymentsRoute = (router) => {
  /**
   * @swagger
   * /payments/initiatepayment:
   *   post:
   *     summary: Initiate a payment
   *     tags: [Payments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               phone_number:
   *                 type: string
   *                 description: The phone number of the user.
   *               amount:
   *                 type: number
   *                 description: The amount of the payment.
   *               userId:
   *                 type: string
   *                 description: The unique identifier of the user.
   *               full_name:
   *                 type: string
   *                 description: The full name of the user.
   *               email_address:
   *                 type: string
   *                 description: The email address of the user.
   *               city:
   *                 type: string
   *                 description: The city of the user.
   *     responses:
   *       '200':
   *         description: The payment initiation was successful.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 order_tracking_id:
   *                   type: string
   *                   description: The order tracking ID generated for the payment.
   *                 merchant_reference:
   *                   type: string
   *                   description: The merchant reference generated for the payment.
   *       '500':
   *         description: An error occurred while initiating the payment.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.post("/payments/initiatepayment", initiatePayment);

  // GET TRANSACTION STATUS
  /**
   * @swagger
   * /payments/transaction-status/{userId}:
   *   get:
   *     summary: Get transaction status
   *     tags: [Payments]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the user.
   *     responses:
   *       '200':
   *         description: The transaction status retrieval was successful.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 payment_status_description:
   *                   type: string
   *                   description: The description of the payment status.
   *                 // Add more properties if needed based on the response structure
   *       '400':
   *         description: The user with the provided ID doesn't have any payment history.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   *       '500':
   *         description: An error occurred while retrieving the transaction status.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get("/payments/transaction-status/:userId", getTransactionStatus);

  // GET PAYMENT DETAILS OF A PARTICULAR USER BY USERID

  /**
   * @swagger
   * /payments/getdetails/{userId}:
   *   get:
   *     summary: Get payment details of a particular user by userId
   *     tags: [Payments]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique identifier of the user.
   *     responses:
   *       '200':
   *         description: The payment details retrieval was successful.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: string
   *                   description: The unique identifier of the user.
   *                 amount:
   *                   type: number
   *                   description: The payment amount.
   *                 notification_id:
   *                   type: string
   *                   description: The notification ID associated with the payment.
   *                 phone_number:
   *                   type: string
   *                   description: The phone number associated with the payment.
   *                 order_tracking_id:
   *                   type: string
   *                   description: The order tracking ID associated with the payment.
   *                 merchant_reference:
   *                   type: string
   *                   description: The merchant reference associated with the payment.
   *                 full_name:
   *                   type: string
   *                   description: The full name of the user.
   *                 city:
   *                   type: string
   *                   description: The city associated with the payment.
   *                 email_address:
   *                   type: string
   *                   description: The email address associated with the payment.
   *                 seen_farmer_details:
   *                   type: boolean
   *                   description: Indicates whether the farmer details have been seen.
   *                 status:
   *                   type: string
   *                   description: The payment status.
   *       '500':
   *         description: An error occurred while retrieving the payment details.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.get("/payments/getdetails/:userId", getPaymentDetails);
};

module.exports = { paymentsRoute };
