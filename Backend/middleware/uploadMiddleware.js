const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

//Filter file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png formats are allowed'), false);
    }
};

//Upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;


// In the above snippet, I have created a middleware for uploading files. 
// I have used the multer package to handle file uploads. 
// I have created a storage object with a destination and filename. 
// I have also created a fileFilter function to filter the file type. 
// Finally, I have created a middleware called upload using multer and exported it. 
// This middleware can be used in routes to handle file uploads.