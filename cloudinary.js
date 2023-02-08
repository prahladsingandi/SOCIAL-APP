const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "pranals",
  api_key: "555496974668629",
  api_secret: "oTtdKt70GPYgP6HHZOtEvP6fCME",
  secure: true
});

module.exports = {cloudinary};
