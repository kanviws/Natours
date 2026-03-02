const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
const bookingController = require('../controller/bookingController');

const router = express.Router();
// router.use();
router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isloggedIn,
  viewController.getOverview,
);
router.get('/tour/:slug', authController.isloggedIn, viewController.getTour);
router.get('/login', authController.isloggedIn, viewController.getLoginForm);
// router.get('/logout', viewController.getLogoutForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updatedUserData,
);

module.exports = router;
