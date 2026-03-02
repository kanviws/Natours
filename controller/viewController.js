const Tour = require('./../models/tourmodel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/apperror');
const User = require('./../models/usermodel');
const Booking = require('./../models/bookingmodel');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', { title: 'All tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next(
      new AppError('There is no tour with that particular name', 404),
    );
  }
  res.status(200).render('tour', { title: tour.name, tour });
});
exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', { title: 'Log in your account' });
});

// exports.getLogoutForm = catchAsync(async (req, res) => {
//   res.status(200).render('logout', { title: 'Log out your account' });
// });

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
    user: req.user,
  });
};
exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  // 2) find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  res.status(200).render('overview', { title: 'My Tours', tours });
});

exports.updatedUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  res
    .status(200)
    .render('account', { title: 'Your account', user: updatedUser });
});
