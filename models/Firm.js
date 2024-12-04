const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg'],
            },
        ],
        required: true,
    },
    region: {
        type: [
            {
                type: String,
                enum: ['south-indian', 'north-indian', 'chinese', 'bakery'],
            },
        ],
        required: true,
    },
    offer: {
        type: String,
        default: 'No current offer',
    },
    image: {
        type: String,
        default: 'default-image.jpg',
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Referencing Vendor model
        required: true,
    },

    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',  // Ensure this is 'Firm' (capital 'F')
    }],
});

// Register the model
const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;
