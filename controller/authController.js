const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/apperror');
<<<<<<< HEAD
const Email = require('./../utils/email');
=======
const sendEmail = require('./../utils/email');
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;
  res.cookie('jwt', token, cookiesOptions);

  // password remove karva mate form the output in signup
  ((user.password = undefined),
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user,
      },
    }));
};

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
<<<<<<< HEAD
  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log('URL:', url);
  new Email(newUser, url).sendWelcome();
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
<<<<<<< HEAD
  // 1] check if tbhe email and password exist
  const { email, password } = req.body;
=======
  const { email, password } = req.body;
  // 1] check if tbhe email and password exist
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }
  // 2] check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email and password', 401));
  }
  // 3]if everything is okay,send token to the client
  createSendToken(user, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

<<<<<<< HEAD
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
exports.protect = catchAsync(async (req, res, next) => {
  // 1] get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  }
  console.log(token);
  if (!token) {
    return next(new AppError('you are not logged in to get access', 401));
  }
  // 2] validate the token ||verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3]check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'the user is belonging to this token does no longer exist',
        401,
      ),
    );
  }

  // 4] check if user changed password after the token was issued.
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! plz log in.', 401),
    );
  }

  req.user = currentUser;

  next();
});

<<<<<<< HEAD
// logged in
exports.isloggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      if (currentUser.changedPasswordAfter(decoded.iat)) return next();

      res.locals.user = currentUser;
    } catch (err) {
      return next();
    }
  }

  next();
};
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles:- admin,lead guide
    console.log('Roles ', roles);
    if (!roles.includes(req.user.role)) {
      console.log('User role: ', req.user.role);
      return next(new AppError('you do not this permisiion to perform', 403));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1 get user using POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with email address', 404));
  }

  // 2 Generated the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3 send it to users email
<<<<<<< HEAD
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'your password reset token (valid for 4 min)',
    //   message,
    // });
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
=======
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
  const message = `forgot your password? submit a patch req with new and confirm oone to :${resetURL}.\n If you didnt forget your password, plz ignore this email and next time notes ma lakhi lejoo :) `;
  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset token (valid for 4 min)',
      message,
    });
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    res.status(200).json({
      status: 'success',
      message: 'token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(' Aw, snap! There is an error buddy ', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2. if token has not expired ,and user is there, set new password
  if (!user) {
    return next(new AppError(' Token is invalid ', 500));
  }

  // 3. update changedpasswordAt property for the user.
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  // user.passwordResetToken = undefined;
  // user.passwordResetExpires = undefined;
  await user.save();
  // log the user in,send jwt
  createSendToken(user, 200, res);
});

exports.updatePasswords = catchAsync(async (req, res, next) => {
  // 1 collection=> user
  const user = await User.findById(req.user.id).select('+password');
  // 2 POSTed passwords are correct or not
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(' Token is invalid ', 500));
  }
  //3  if so,Update it
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //log user in,send JWT
  createSendToken(user, 200, res);
});
