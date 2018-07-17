const fs = require('fs');
const Tesseract = require('tesseract.js');

const recognize = async (myImage) => {
  const result = await Tesseract.recognize(myImage, { lang: 'kor' });
  return result;
};

fs.readFile('./license.png', (err, imageBuffer) => {
  if (err) {
    console.log('Error:', err);
  } else {
    recognize(imageBuffer).then(result => {
      console.log(result.text);
    }).catch(err => console.log(err));
  }
});