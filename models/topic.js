const mongoose = require('mongoose');
const Lesson = mongoose.model('Lesson');

const TopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lesson'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  replies:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Reply'
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

TopicSchema.virtual('replies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'topic'
});

TopicSchema.virtual('numberOfReplies', {
  ref: 'Reply',
  localField: '_id',
  foreignField: 'topic',
  count: true
});

TopicSchema.statics.getLesson = async function (topicId) {
  const topic = await this.findById(topicId)
  const lesson = await Lesson.findById(topic.lesson)
  return new Promise(resolve => resolve(lesson))
}

TopicSchema.pre('find', function (next) {
  this.populate('user')
  this.populate('numberOfReplies')
  next()
})

TopicSchema.pre('findOneAndUpdate', function (next) {
  this.populate('replies')
  this.populate('user')
  this.populate('lesson')
  next()
})

module.exports = mongoose.model('Topic', TopicSchema)
