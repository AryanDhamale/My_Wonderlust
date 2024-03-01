const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KET,
    api_secret:process.env.CLOUD_API_SECRET
})


const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'wonderlust_DEV',
    allowedFormats: ['jpg', 'png','jpeg','avif'],
  });

  module.exports={
     storage,
     cloudinary,
  }