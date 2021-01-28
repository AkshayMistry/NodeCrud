const path = require('path');
const fs = require('fs');

exports.removeFileFromStorage = (filepath) => {
    const names = filepath.split("/");
    const fileName = names[names.length - 1];
    const folderName = names[names.length - 2];

    const actualPath = path.join(__dirname, `../public/${folderName}/${fileName}`);

    try {
        fs.unlinkSync(actualPath);
    } catch (e) {
        console.log(e)
    }
}

exports.productPicImagePath = (filename) => {
    return `${process.env.API_URL}/product/${filename}`;
}