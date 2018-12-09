const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    types: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('profiles', ProfileModel)