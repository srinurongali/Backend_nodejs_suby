const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    firm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',  // Ensure this is 'Firm' (capital 'F')
    }],
});

module.exports = mongoose.model('Vendor', vendorSchema);
