const router = require("express").Router();
const {
  ceateSupplierNotifications,
  getSupplierNotifications,
} = require("../../controllers/notifications/notifications");
const { verifyToken } = require("../../helpers/token");
const Notifications = require("../../models/Notifications");
const SupplierNotifications = require("../../models/SupplierNotifications");

// Get all notifications of a partcular buyer
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const notifications = await Notifications.find({
      _id: req.params.id,
    });
    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
