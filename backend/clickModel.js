const mongoose = require('mongoose');

const ClickSchema = mongoose.Schema({

    count: {
        type: Number,
    }
});

module.exports = mongoose.model('Click', ClickSchema, "clicks");