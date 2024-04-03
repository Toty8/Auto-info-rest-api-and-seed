const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const specificationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    torque: {
        type: Number,
        required: true
    },
    engineType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    generation: {
        type: ObjectId,
        ref: "Generation"
    },
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Specification', specificationSchema);