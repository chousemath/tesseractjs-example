const fs = require('fs');
const Jimp = require('jimp');
const { spawn } = require('child_process');
const Tesseract = require('tesseract.js');

const colors = {
  HEADER: '\033[95m',
  OKBLUE: '\033[94m',
  OKGREEN: '\033[92m',
  WARNING: '\033[93m',
  FAIL: '\033[91m',
  ENDC: '\033[0m',
  BOLD: '\033[1m',
  UNDERLINE: '\033[4m'
};

const recognize = async (myImage) => {
  const result = await Tesseract.recognize(myImage, { lang: 'kor' });
  return result;
};

const process = async (imageName) => {
  const img = await Jimp.read(`./${imageName}`);
  const greyName = `./tmp/grey-${imageName}`;
  img.greyscale().write(greyName, () => {
    console.log(`${colors.OKGREEN}Greyscale operation complete...${colors.ENDC}`);
    fs.readFile(greyName, (err, imageBuffer) => {
      console.log(`${colors.OKGREEN}Grey image read operation complete...${colors.ENDC}`);
      if (err) {
        console.log(`${colors.FAIL}Error: ${err}${colors.ENDC}`);
      } else {
        recognize(imageBuffer).then(result => {
          console.log(`${colors.WARNING}========================\n========================${colors.ENDC}`);
          console.log(`${colors.BOLD}EXTRACTED TEXT DATA:\n${colors.ENDC}`);
          console.log(`${colors.OKBLUE}${result.text}${colors.ENDC}`);
          console.log(`${colors.WARNING}========================\n========================${colors.ENDC}`);
          spawn('rm', [greyName]);
        }).catch(err => console.log(err));
      }
    });
  });
};

const imageName = 'license.png';
process(imageName)