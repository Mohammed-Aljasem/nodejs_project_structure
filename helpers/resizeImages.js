const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const resizeImages = async (imageBuffer, dirName) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = `${uniqueSuffix}.png`;
    const originalPath = `public/uploads/${dirName}/original/`;

    if (!fs.existsSync(originalPath)) {
        fs.mkdirSync(originalPath, {recursive: true})
    }
    const outputOriginalPath = path.join(__dirname, `../${originalPath}`, fileName);
    fs.writeFileSync(outputOriginalPath, imageBuffer);


    const sizes= [1000, 600, 300, 60];

    for (const size of sizes) {
        const resizedImageBuffer = await sharp(imageBuffer)
            .resize({width: size}) // width: 300px, height: 300px
            .toFormat('png')
            .jpeg({quality: 90})
            .toBuffer();


        const resizedPath = `public/uploads/${dirName}/${size}/`;
        if (!fs.existsSync(resizedPath)) {
            fs.mkdirSync(resizedPath, {recursive: true})
        }

        const outputPathResized = path.join(__dirname, `../${resizedPath}`, fileName);
        fs.writeFileSync(outputPathResized, resizedImageBuffer);
    }

    return fileName;
}

module.exports = resizeImages;
