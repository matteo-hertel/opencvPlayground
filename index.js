const cv = require('opencv');
const {
    promisify
} = require("util");
const fetch = require("node-fetch");
const COLOR = [0, 255, 0];
const thickness = 1;
const output = "detection.jpg";

async function faceDetection(url, output) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const img = await readImageAsync(buffer);
    img.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
        if (err) throw err;
        for (var i = 0; i < faces.length; i++) {
            var face = faces[i];
            img.rectangle([face.x, face.y], [face.width, face.height], COLOR, thickness);
        }
        img.save(`./${output}`);
        console.log(`Image saved as ${output}`);
    });
}

faceDetection("https://source.unsplash.com/M6qtPP5JYo4", output);

function readImageAsync(buffer) {
    return new Promise((resolve, reject) => {
        cv.readImage(buffer, function(err, img) {
            if (err) reject(err);
            if (img.width() < 1 || img.height() < 1) reject(new Error('Image has no size'));
            resolve(img);
        });

    });

}

