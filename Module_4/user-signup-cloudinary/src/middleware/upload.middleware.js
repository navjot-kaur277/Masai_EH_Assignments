const multer = require("multer");
const path = require("path");

// Configure multer to use memory storage (buffer)
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
    files: 1, // Only one file
  },
});

// Middleware to handle single file upload
const uploadMiddleware = upload.single("profile");

// Custom middleware wrapper for better error handling
const handleFileUpload = (req, res, next) => {
  uploadMiddleware(req, res, function (err) {
    if (err) {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            error: "File size too large. Maximum size is 2MB",
          });
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            error: "Unexpected field. Use 'profile' for file upload",
          });
        }
      }

      // Handle file filter errors
      if (err.message === "Invalid file type. Only images are allowed") {
        return res.status(400).json({
          error:
            "Invalid file type. Only images (JPEG, PNG, GIF, WebP) are allowed",
        });
      }

      return next(err);
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Please upload a profile image",
      });
    }

    next();
  });
};

module.exports = handleFileUpload;
