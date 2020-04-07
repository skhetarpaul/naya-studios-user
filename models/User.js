const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // isMaker: {
  //   type: Boolean,
  //   default: true,
  //   required: true
  // },
  genre:{
    type: String,
    // default: 'Maker',
    required: true,
    enum: ['Maker', 'Designer']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// UserSchema.pre('save', function(next) {
//   let user = this;
//   if(!user.isModified('password')) return next();

//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if(err) return next(err)
//         user.password = hash;
//         next();
//     })
//   })
// })

// UserSchema.methods.comparePassword = function(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if(err) return callback(err);
//     callback(undefined, isMatch);
//   })
// }
module.exports = User = mongoose.model("users", UserSchema);