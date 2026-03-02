const express = require('express');
<<<<<<< HEAD
const multer = require('multer');

const usercontroller = require('./../controller/userController');
const authcontroller = require('./../controller/authController');

const upload = multer({ dest: 'public/img/users' });
const router = express.Router();
router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);
router.get('/logout', authcontroller.logout);

router.post('/forgotpassword', authcontroller.forgotPassword);
router.patch('/resetPassword/:token', authcontroller.resetPassword);

router.use(authcontroller.protect);

router.patch('/updateMyPassword', authcontroller.updatePasswords);
router.get('/me', usercontroller.getMe, usercontroller.getUser);
router.patch('/updateMe', upload.single('photo'), usercontroller.updateMe);
router.delete('/deleteMe', usercontroller.deleteMe);

router.use(authcontroller.restrictTo('admin'));
=======
const usercontroller = require('./../controller/userController');
const authcontroller = require('./../controller/authController');

const router = express.Router();
router.post('/signup', authcontroller.signup);

router.post('/login', authcontroller.login);

router.post('/forgotpassword', authcontroller.forgotPassword);

router.patch('/resetPassword/:token', authcontroller.resetPassword);

router.patch(
  '/updateMyPassword',
  authcontroller.protect,
  authcontroller.updatePasswords,
);

router.patch('/updateMe', authcontroller.protect, usercontroller.updateMe);

router.delete('/deleteMe', authcontroller.protect, usercontroller.deleteMe);

>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
router
  .route('/')
  .get(usercontroller.getAllUser)
  .post(usercontroller.createUser);

router
  .route('/:id')
  .get(usercontroller.getUser)
  .patch(usercontroller.updateUser)
  .delete(usercontroller.deleteUser);

module.exports = router;
