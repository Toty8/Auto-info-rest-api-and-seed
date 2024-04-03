const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const generationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    yearStarted: {
        type: Number,
        required: true
    },
    yearAborted: {
        type: Number,
        required: false
    },
    specifications: [{
        type: ObjectId,
        ref: "Specification"
    }],
    model: {
        type: ObjectId,
        ref: "Model"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Generation', generationSchema);