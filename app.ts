import * as fs from 'fs';
import * as Jimp from 'jimp';
import * as Tesseract from 'tesseract.js';

const recognize = (myImage: any): any => {
  Tesseract.recognize(myImage, { lang: 'kor' }).then(result => {
    console.log(result.text);
  }).catch(err => {
    console.log(err);
  });
};

const imageName = 'license.png';

const process = async (imageName) => {
  const img = await Jimp.read(`./${imageName}`);
  const greyName = `./tmp/grey-${imageName}`;
  img.greyscale().write(greyName, () => {
    fs.readFile(greyName, (err, imageBuffer) => {
      if (err) {
        console.log('Error:', err);
      } else {
        recognize(imageBuffer)
      }
    });
  });
};

process(imageName);