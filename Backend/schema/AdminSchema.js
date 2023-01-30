const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  numOfAdmin: {
    type: Array,
    default: []
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  books: {
    type: Array,
    default: []
  }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;