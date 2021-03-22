const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Topic'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

function autopopulate (next) {
  this.populate('user');
  next();
}

ReplySchema.pre('find', autopopulate);
ReplySchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Reply', ReplySchema);
