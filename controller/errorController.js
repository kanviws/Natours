const AppError = require('./../utils/apperror');
<<<<<<< HEAD

// ==========================
// DB ERROR HANDLERS
// ==========================

=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
<<<<<<< HEAD

// const handleDuplicateFieldsDB = (err) => {
//   const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
//   const message = `Duplicate field value ${value}. Please use another value!`;
//   return new AppError(message, 400);
// };
const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

=======
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  // console.log(value)
  const message = `duplicate ${value}: enter another name for that`;
  return new AppError(message, 400);
};
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

<<<<<<< HEAD
// ==========================
// JWT ERROR HANDLERS
// ==========================

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleExpiredToken = () =>
  new AppError('Your token has expired. Please log in again.', 401);

// ==========================
// SEND ERROR (DEV)
// ==========================

const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // Rendered website
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};

// ==========================
// SEND ERROR (PROD)
// ==========================

const sendErrorProd = (err, req, res) => {
  // API errors
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error('PRODUCTION ERROR 💥', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }

  // Rendered website errors
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }

  console.error('PRODUCTION ERROR 💥', err);

  return res.status(500).render('error', {
    title: 'Something went wrong',
    msg: 'Please try again later.',
  });
};

// ==========================
// GLOBAL ERROR MIDDLEWARE
// ==========================

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // DEVELOPMENT
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, req, res);
  }

  // PRODUCTION
  if (process.env.NODE_ENV === 'production') {
=======
const handleJWTError = () =>
  new AppError('invalid token. Plz try again....', 401);

const handleExpiredToken = () =>
  new AppError('your token has been expired.plz try again....', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational,trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknoen error:dont leak error details
  else {
    // 1] log error
    console.error('pachi Error', err);

    // 2] Send generic message
    res.status(500).json({
      status: 'error',
      message: 'are yrr su kare error aai gai ne ,Something went wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  //  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    error.code = err.code;
<<<<<<< HEAD

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleExpiredToken();

    console.log(err);
    console.log(error);
    return sendErrorProd(error, req, res);
=======
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    if (error.name === 'TokenExpiredError') error = handleExpiredToken(error);
    sendErrorProd(error, res);
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  }
};
