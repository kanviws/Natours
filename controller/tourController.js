<<<<<<< HEAD
const Tour = require('../models/tourmodel');
=======
const Tour = require('./../models/tourmodel');
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/apperror');
const factory = require('./../controller/handler');

exports.aliasTopTour = (req, res, next) => {
  // req.query.limit = '5';
  // req.query.sort = '-ratingsAverage,price';
  // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  req.aliasQuery = {
    limit: 5,
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };
  next();
};
exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
<<<<<<< HEAD
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    next(new AppError('No tour found with that ID', 404));
  }
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  // console.log(distance, lat, lng, unit);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourDistance = catchAsync(async (req, res, next) => {
  console.log('getTourDistance');
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  if (!lat || !lng) {
    next(new AppError('No tour found with that ID', 404));
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
      },
    },
  ]);
  // console.log(distance, lat, lng, unit);
  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
=======

exports.deleteTour = factory.deleteOne(Tour);
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }

//   res.status(201).json({
//     status: 'success',
//     data: null,
//   });
// });

>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);
  res.status(201).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(201).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
