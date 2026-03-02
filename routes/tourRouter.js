const express = require('express');
const tourcontroller = require('../controller/tourController');
const authcontroller = require('../controller/authController');
const reviewrouter = require('../routes/reviewRoutes');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourcontroller.aliasTopTour, tourcontroller.getAllTours);

router.route('/tour-stats').get(tourcontroller.getTourStats);
router.route('/monthly-plan/:year').get(tourcontroller.getMonthlyPlan);
<<<<<<< HEAD

router
  .route('/tour-within/:distance/center/:latlng/unit/:unit')
  .get(tourcontroller.getTourWithin);

router
  .route('/distance/:latlng/unit/:unit')
  .get(tourcontroller.getTourDistance);

router
  .route('/')
  .get(tourcontroller.getAllTours)
  .post(
    authcontroller.protect,
    authcontroller.restrictTo('admin', 'lead-guide'),
    tourcontroller.createTour,
  );
=======
router
  .route('/')
  .get(authcontroller.protect, tourcontroller.getAllTours)
  .post(tourcontroller.createTour);
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

router
  .route('/:id')
  .get(tourcontroller.getTour)
  .patch(tourcontroller.updateTour)
  .delete(
    authcontroller.protect,
    authcontroller.restrictTo('admin', 'lead-guide'),
    tourcontroller.deleteTour,
  );

router.use('/:tourId/review', reviewrouter);
// router
//   .route('/:tourId/review',reviewrouter)
//   .post(
//     authcontroller.protect,
//     authcontroller.restrictTo('user'),
//     reviewcontroller.createReview,
//   );

module.exports = router;
