const express = require('express');
const bookingController = require('../controller/bookingController');
const authcontroller = require('../controller/authController');
const router = express.Router({ mergeParams: true });

router.use(authcontroller.protect);
router.get('/checkoutSession/:tourId', bookingController.getCheckoutSession);

router.use(authcontroller.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);
router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
