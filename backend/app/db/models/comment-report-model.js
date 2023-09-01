const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reportSchema = new Schema({
    reason: {
        type: String,
        required: [true, "Wpisz treść komentarza"]
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: String,
    },
    status: {
        default: 1,
        type: Number,
    },
    deleteDate : {
        type: String,
    },
    rejectedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

})

const Report = mongoose.model('Report', reportSchema )


module.exports = Report