const multer = require("multer");
const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const dirPath = 'uploads/';
//         if(fs.existsSync(dirPath)){
//             fs.mkdirSync(dirPath, {recursive: true})
//         }
//         cb(null, dirPath)
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         let fileName = file.fieldname + '-' + uniqueSuffix;
//         const splitOriginalName =(file.originalname).split('.');
//         const extFile = splitOriginalName[splitOriginalName.length -1];
//         const fullFileName = `${fileName}.${extFile}`
//         cb(null, fullFileName)
//     },
//
// })

const fileFilter = (req, file, cb) =>  {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
        return;
    }
    cb(new Error('The files allowed to upload just .jpeg or .png'), false)
}
const storage = multer.memoryStorage();

const upload = multer({ storage: storage, fileFilter,
})

module.exports = upload;
