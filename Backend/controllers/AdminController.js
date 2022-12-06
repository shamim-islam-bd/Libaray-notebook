const Admin = require("../models/AdminSchema");

// Get All Admin -- (( Admin ))
exports.GetAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.find();

        res.status(200).json({
            success: true,
            All_Admin: admin
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 

// make Admin by user id-- (( Admin ))
exports.MakeAdmin = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user);
        
        const admin = await Admin.findOne({ user: user });
        if (admin) {
            res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        } else {
            const newAdmin = new Admin({
                admin: user,
                numOfAdmin: [],
                numOfReviews: 0
            });
            await newAdmin.save();
            res.status(200).json({
                success: true,
                message: "Admin created successfully"
            });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}