const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;