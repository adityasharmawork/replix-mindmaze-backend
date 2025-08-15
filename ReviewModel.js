const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, 'A rating is required.'],
        min: 1,
        max: 5,
    },
    tags: {
        type: [String],
        default: [],
    },
    comment: {
        type: String,
        trim: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;