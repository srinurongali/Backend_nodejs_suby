const Product = require('../models/Product'); // Correct import
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path'); // Import the correct `path` module

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Fix file extension
    }
});
const upload = multer({ storage: storage });

const addproduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

        // Verify that the firm exists
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: 'No firm found' });
        }

        // Create the product
        const newProduct = new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm: firm._id, // Associate with the firm
        });

        // Save the product
        const savedProduct = await newProduct.save();

        // Add product to the firm's products array if it exists
        if (firm.product) {
            firm.product.push(savedProduct._id);
            await firm.save();
        }

        res.status(200).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the function with multer middleware
module.exports = { addproduct: [upload.single('image'), addproduct] };
