// ref to tour/ref to user
const mongoose = require('mongoose');
<<<<<<< HEAD
const Tour = require('./tourmodel');
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a review buddy....'],
    },
    rating: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'a review must belong to tour buddy....'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'a review must belong to user buddy....'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

<<<<<<< HEAD
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function () {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  this.populate({
=======
reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'tour',
    select: 'name',
  }).populate({
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    path: 'user',
    select: 'name photo',
  });
});

<<<<<<< HEAD
reviewSchema.statics.calculateAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5, // default
    });
  }
};
reviewSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.tour);
  // console.log('save post :--', this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function () {
  this.r = await this.clone().findOne();
  // console.log('pre find one;--', this.r);
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calculateAverageRatings(this.r.tour._id);
  // console.log('post find one:---', this.r.tour._id);
});

reviewSchema.pre('remove', function () {
  this.constructor.calculateAverageRatings(this.tour);
  // console.log('pre remove:---', this.tour);
});

=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
