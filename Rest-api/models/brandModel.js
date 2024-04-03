const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    models: [{
        type: ObjectId,
        ref: "Model"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Brand', brandSchema);