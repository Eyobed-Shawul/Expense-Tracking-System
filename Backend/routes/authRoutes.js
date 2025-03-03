const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { registerUser, loginUser, getUserInfo } = require("../controller/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user-info", protect, getUserInfo);

//The upload.single() middleware is used to upload a single file.
router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).json({ message: "Please upload a file" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
});

module.exports = router;