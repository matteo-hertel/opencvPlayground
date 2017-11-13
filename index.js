var cv = require('opencv');
var COLOR = [0, 255, 0]; // default red
var thickness = 6; // default 1
cv.readImage("./dummy.jpg", function(err, im){
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  im.detectObject(cv.FACE_CASCADE,{}, function(err, faces){
    if (err) throw err;
    for (var i = 0; i < faces.length; i++){
      var face = faces[i];
          im.rectangle([face.x, face.y], [face.width, face.height], COLOR, thickness);

    }

    im.save('./detection.jpg');
    console.log('Image saved as detection.jpg');
  });
});
