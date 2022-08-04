const multer = require('multer');

const multerStorage = multer.memoryStorage();
const upload = multer({
    storage: multerStorage,
    limits: { // Limit file size to maximum file size of a 720p image
        fileSize: 2.64 * 1024 * 1024,
    },
});

module.exports = {
    upload,
};
