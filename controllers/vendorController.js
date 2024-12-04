const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const Firm = require('../models/Firm'); // Ensure this path is correct


dotenv.config();

const secretkey = process.env.WhatIsYourName;

// Vendor Registration Function
const VendorRegister = async (req, res) => {
    console.log('Request Body:', req.body); // Debugging Line
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields (username, email, password) are required." });
    }

    try {
        // Check if email already exists
        const VendorEmail = await Vendor.findOne({ email });
        if (VendorEmail) {
            return res.status(400).json({ error: "Email already taken." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new vendor
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword,
        });

        // Save vendor to database
        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully." });
        console.log("Vendor registered successfully.");
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Vendor Login Function
const VenderLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        // Find vendor by email
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        // Generate JWT token
        const token = jwt.sign({ vendorId: vendor._id }, secretkey, { expiresIn: "1h" });

        res.status(200).json({ success: "Login successful", token });
        console.log("Vendor logged in:", email, "Token:", token);
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

const getAllVendors= async (req,res)=>{

    try{
        const vendors = await Vendor.find().populate('firm'); // Populating 'firm' field in Vendor
 
        res.json({vendors})

    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})

    }
}

const getVendorById= async (req,res)=>{
    const vendorId= req.params.id;
    try{
        const vendor= await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return  res.status(404).json({message:"vender is not found"})
        }
        res.status(200).json({vendor})
        

    }catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})

    }
};

module.exports = { VendorRegister, VenderLogin , getAllVendors,getVendorById};
