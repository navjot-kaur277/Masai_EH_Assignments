require("dotenv").config();
const cloudinary = require("cloudinary").v2;

console.log("=== Verifying Cloudinary Credentials ===\n");

console.log("1. Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("2. API Key:", process.env.CLOUDINARY_API_KEY);
console.log("3. API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);
console.log(
  "4. API Secret length:",
  process.env.CLOUDINARY_API_SECRET?.length,
  "characters\n",
);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Test connection
cloudinary.api
  .ping()
  .then((result) => {
    console.log("✅ SUCCESS! Cloudinary connection established.");
    console.log("✅ Your credentials are CORRECT!");
    console.log("✅ Status:", result.status);
    console.log("\n🎉 You are ready to upload images!");

    // Optional: List resources to verify
    return cloudinary.api.resources({
      max_results: 1,
      type: "upload",
    });
  })
  .then((resources) => {
    console.log("\n📁 Your Media Library has", resources.total_count, "items");
    if (resources.resources.length > 0) {
      console.log("Latest upload:", resources.resources[0].secure_url);
    }
  })
  .catch((error) => {
    console.error("❌ ERROR:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check if API Secret is correct (copied fully)");
    console.log("2. Check for extra spaces in .env file");
    console.log("3. Make sure .env is in project root");
    console.log("4. Restart terminal and try again");
  });
