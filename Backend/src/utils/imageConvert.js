const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const convertToWebp = async (file) => {
  const fileName = Date.now() + ".webp";

  const outputPath = path.join(
    __dirname,
    "../../uploads",
    fileName
  );

  await sharp(file.buffer)
    .webp({ quality: 80 })
    .toFile(outputPath);

  return fileName;
};

module.exports = convertToWebp;