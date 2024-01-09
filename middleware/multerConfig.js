const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
  
        cb(null, file.originalname)
    }
})



const multerConfig = {
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'welcomeVideo') {
         
            req.hasWelcomeVideo = true;
        }
        
        cb(null, true);
    }
};


module.exports = multerConfig;