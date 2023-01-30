const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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