const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// it is just for the confirmation that if the value is passing or not .
// console.log('JWT_SECRET:', process.env.JWT_SECRET);
// console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

const DB = process.env.DATABASE;
// console.log('url: ', DB);

mongoose.connect(DB).then(() => {
  //   console.log(con.connections);
  // console.log(mongoose.get('autoIndex'));
  console.log('DB connection Succesfull');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app running..${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
