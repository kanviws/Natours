const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// it is just for the confirmation that if the value is passing or not .
// console.log('JWT_SECRET:', process.env.JWT_SECRET);
// console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);

const app = require('./app');

const DB = process.env.DATABASE;
// console.log('url: ', DB);

mongoose.connect(DB).then(() => {
  //   console.log(con.connections);
<<<<<<< HEAD
  // console.log(mongoose.get('autoIndex'));
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
  console.log('DB connection Succesfull');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app running..${port}`);
});
