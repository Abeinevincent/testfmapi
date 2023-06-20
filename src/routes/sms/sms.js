const { createSMS } = require("../../controllers/sms/sms");

/**
 * @swagger
 * tags:
 *   name: Send SMS
 *   description: Send SMS Endpoints
 */

const smsRoute = (router) => {
  /**
   * @swagger
   * /sms:
   *   post:
   *     summary: Send SMS to users' phones.
   *     tags: [Send SMS]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *                 description: The message to be sent.
   *               number:
   *                 type: string
   *                 description: The phone number of the recipient.
   *     responses:
   *       '200':
   *         description: The SMS has been sent successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The status of the SMS sending operation.
   *                 message_id:
   *                   type: string
   *                   description: The unique identifier of the sent message.
   *       '500':
   *         description: Internal server error or failed to send the SMS.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: The error message.
   */

  router.post("/", createSMS);
};

module.exports = smsRoute;
