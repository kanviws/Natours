const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./usermodel');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'name is way too long to be called a tour'],
      minlength: [5, 'name is way too short to be called a tour'],
    },
    slug: String,
    rating: {
      type: Number,
      default: 5,
    },
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    difficulty: {
      type: String,
      required: [true, 'a Tour must have some difficulties'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: '3 j type che:-easy, dificult, medium',
      },
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have a limitation in a group'],
    },
    ratingsAverage: {
      type: Number,
      default: 2.5,
      min: [2, 'iitna bhi bura nahi hoga 2-5'],
      max: [
        5,
        'bus bhai hava mein udaiga kya juthe 5 highest hai aukat mein likh',
      ],
<<<<<<< HEAD
      set: (val) => Math.round(val * 10) / 10,
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'a price must have a value'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //this only points at the currect doc on new doc creation
          return val < this.price;
        },
        message:
          'discount price({VALUE}) should be less then the regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // geoJson
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },

    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Review',
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
<<<<<<< HEAD
tourSchema.index({ startLocation: '2dsphere' });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

// Document Middleware: runs before.save() and .create() aana lidhej execute thase.
tourSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
});

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function () {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
});

tourSchema.pre(/^find/, function () {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
});

tourSchema.post(/^find/, function (docs) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  // console.log(docs);
});

// Aggregation Middleware
<<<<<<< HEAD
// tourSchema.pre('aggregate', function () {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
// });
=======
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline);
});
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

// tourSchema.pre('save', async function () {
//   const guidesPromises = this.guides.map(async (id) => User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
// });

// tourSchema.pre('save', function () {
//   console.log('will save doc...');

// });
// tourSchema.post('save', function (doc) {
//   console.log(doc);
<<<<<<< HEAD
// });]
=======
// });
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
