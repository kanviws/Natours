<<<<<<< HEAD
const multer = require('multer');
const sharp = require('sharp');
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const User = require('./../models/usermodel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/apperror');
const factory = require('./../controller/handler');
<<<<<<< HEAD
const APIFeatures = require('./../utils/apiFeatures');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.path)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/user-${req.user.id}.jpeg`);
  next();
});
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUser = catchAsync(async (req, res) => {
<<<<<<< HEAD
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

=======
  const users = await User.find();
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

<<<<<<< HEAD
// exports.getAllUser = catchAsync(async (req, res) => {
//    let filter = {};
//       if (req.params.tourId) filter = { tour: req.params.tourId };
//       const queryData = req.query;
//       const features = new APIFeatures(Model.find(filter), queryData)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();
//       const doc = await features.query;

//       res.status(200).json({
//         status: 'success',
//         results: doc.length,
//         data: {
//           doc,
//         },
//       });
//     });

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log('FILE:', req.file);
  console.log('BODY:', req.body);
  // console.log('USER ID:', req.user.id);
=======
exports.updateMe = catchAsync(async (req, res, next) => {
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for the passwords updates .plz use /updateMyPassword',
        400,
      ),
    );
  }
  const filterBody = filterObj(req.body, 'name', 'email');
<<<<<<< HEAD
  if (req.file) filterBody.photo = `user-${req.user.id}-${Date.now()}.jpeg`;

=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
<<<<<<< HEAD
  // console.log('updated:-', updatedUser);
});

=======
});
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getUser = factory.getOne(User);

exports.createUser = catchAsync(async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'not defined yet.Plz use /signup',
  });
});
// not for password....
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
