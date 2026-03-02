// # DATABASE_PASSWORD=kanviwsdb
// # mongodb+srv://kanviws_db_user:<db_password>@cluster0.fvfvsjb.mongodb.net/
// # DATABASE=mongodb+srv://kanviws_db_user:kanviws10@cluster0.lvjifpr.mongodb.net/natours
const cors = require('cors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/apperror');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');
const app = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:4000', 'http://localhost:4000'],
    credentials: true,
  }),
);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL middleswares
// Set security http headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cdnjs.cloudflare.com',
          'https://js.stripe.com',
        ],

        connectSrc: [
          "'self'",
          'http://127.0.0.1:4000',
          'http://localhost:4000',
          'https://api.stripe.com',
          'ws://127.0.0.1:*',
          'ws://localhost:*',
        ],

        frameSrc: ["'self'", 'https://js.stripe.com'],

        imgSrc: ["'self'", 'data:', 'https://*.stripe.com'],
      },
    },
  }),
);

// const app = express();
//

// GLOBAL middleswares
// Set security http headers
app.use(helmet());

// developement logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'more requestss, Try again later..... ',
});
// too many request from the same api

app.use('/api', limiter);

// body parser,reading data from the body in req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// DATA SANITIZATION against noSQl Query
// app.use(mongoSanitize());
app.use(
  mongoSanitize({
    replaceWith: '_',
    allowDots: true,
  }),
);
// app.use((req, res, next) => {
//   if (req.body) {
//     mongoSanitize.sanitize(req.body);
//   }
//   next();
// });

app.use(xss());

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
);
//serving static files
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/review', reviewRouter);

app.all(/.*/, (req, res, next) => {
  // const err = new Error(`cant find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;

// route handlerss
// app.get('/api/v1/tours', getAllTour);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'server:hii', app: 'natours' });
// });
// app.post('/', (req, res) => {
//   res.send('posting done');
// });
