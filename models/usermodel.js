const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
<<<<<<< HEAD
=======
    unique: true,
>>>>>>> b5d24688a2b5b47db6efaddfab57d9f417a9a708
    trim: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    required: [true, 'a user must have a email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'hey email is not validd!!!!'],
  },
  password: {
    type: String,
    required: [true, 'Enter a proper password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'plz confirm ur password'],
    validate: {
      // this only works on SAVE();
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function () {
  // only run this function if password is modified
  if (!this.isModified('password')) return;
  //hash the password with the cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete password confirm
  this.passwordConfirm = undefined;
});

userSchema.pre('save', function () {
  // only run this function if password is modified
  if (!this.isModified('password') || this.isNew) return;
  this.passwordChangesAt = Date.now - 1000;
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    console.log(this.changedTimeStamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
