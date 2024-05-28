const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, required: true },
});

const PropertySchema = new Schema({
  proprtyType: String,
  area: Number,
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  hospitalsNearByKM: Number,
  collegesNearByKM: Number,
  sellerEmail: String,
  likes: Number
});

const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema)
module.exports = {User, Property}