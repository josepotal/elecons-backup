const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  createdAt: {type: Number, default: 
    Date.now},
  firstName: {type: String},
  lastName:{type: String},
  email: {type: String},
  contractedPower: String,
  energyTariff: String,
  updatedAt: {type: Number},
  maxPower: {type: String},
  urlCurrentPower: {type: String},
  consumption2016: {type: Number},
  consumption2017: {type: Number},
  dataUser: {type: Object}
});

User.plugin( passportLocalMongoose );

module.exports = mongoose.model('User', User);