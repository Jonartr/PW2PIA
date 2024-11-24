const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  idcomment: {
    type: Number,
    required: true,
    unique: true
  },
  iduser: {
    type: String,
    required: true
  },
  idmanga: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
