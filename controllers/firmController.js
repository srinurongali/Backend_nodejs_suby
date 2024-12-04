const Firm = require('../models/Firm'); // Correct naming for model
const Vendor = require('../models/Vendor');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path2D.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Controller to add a firm
const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body; // Updated to firmName
        const image = req.file ? req.file.filename : undefined;

        // Validate vendor
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Create and save firm
        const firm = new Firm({
            firmName, // Updated to firmName
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id,
        });
        const savedFirm=  await firm.save();
        vendor.firm .push(savedFirm);
        await vendor.save();

        return res.status(200).json({ message: "Firm added successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




// Export with multer middleware
module.exports = { addFirm: [upload.single('image'), addFirm] };
