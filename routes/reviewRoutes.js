const express = require('express');
const ReviewController = require('../controller/reviewController');
const authcontroller = require('../controller/authController');
const router = express.Router({ mergeParams: true });

// get /api/v1/tours/5c88fa8cf4afda39709c295a[tour id],
// post/api/v1/tours/5c88fa8cf4afda39709c295a/review
// get /review
//post /review
<<<<<<< HEAD
router.use(authcontroller.protect);
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

router
  .route('/')
  .get(ReviewController.getAllReview)
  .post(
    authcontroller.protect,
    authcontroller.restrictTo('user'),
    ReviewController.setByIds,
    ReviewController.createReview,
  );

// in patch add reviews id not tours.

router
  .route('/:id')
  .get(ReviewController.getReview)
<<<<<<< HEAD
  .patch(
    authcontroller.restrictTo('user', 'admin'),
    ReviewController.updateReview,
  )
  .delete(
    authcontroller.restrictTo('user', 'admin'),
    ReviewController.deleteReview,
  );
=======
  .patch(ReviewController.updateReview)
  .delete(ReviewController.deleteReview);
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

module.exports = router;
