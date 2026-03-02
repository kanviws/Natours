const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourmodel');
<<<<<<< HEAD
const User = require('./../../models/usermodel');
const Review = require('./../../models/reviewmodel');
=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708

dotenv.config({ path: `${__dirname}/../../config.env` });
const DB = process.env.DATABASE;
// console.log('url: ', DB);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connection Succesfull');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
<<<<<<< HEAD
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
// );

const importData = async () => {
  try {
    await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);

=======
const importData = async () => {
  try {
    await Tour.create(tours);
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    console.log('data properly imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
<<<<<<< HEAD
    // await User.deleteMany();
    // await Review.deleteMany();

=======
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    console.log('data properly deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
