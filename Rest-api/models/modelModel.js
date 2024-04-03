const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    generations: [{
        type: ObjectId,
        ref: "Generation"
    }],
    brand: {
        type: ObjectId,
        ref: "Brand"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Model', modelSchema);