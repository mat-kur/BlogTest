const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
    description: {
        type: String,
        required: [true, "Wpisz treść komentarza"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'Thread',
    },
    date: {
        type: String,
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    likes: {
        type: Number,
        default: 0
    },
    reportContent: {
        type: String,
    },
    reportApprover: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Comment = mongoose.model('Comment', commentSchema )


module.exports = Comment