Webcam.set({
    width: 370,
    height: 320,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#camera');

function takesnap() {
    Webcam.snap(function (data_uri) {
        document.getElementById('result').innerHTML =
            '<img id="img1" style= "object-fit: cover;" src="' + data_uri + '"/>';
    });
}

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5o_uBWlly/model.json", modelReady)

function modelReady() {
    console.log("modelReady")
}

var prediction1 = "";

function speak() {
    synth = window.speechSynthesis;
    var speakthis1 = new SpeechSynthesisUtterance("prediction 1 is" + prediction1);
    synth.speak(speakthis1);
}

function check() {
    var img = document.getElementById("img1");
    classifier.classify(img, gotResult);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        prediction1 = results[0].label;
        document.getElementById("emotion_result1").innerHTML = prediction1;

        if (prediction1 == "Thubs up") {
            document.getElementById("emoji1").innerHTML = "&#128077";
        }

        if (prediction1 == "Victory") {
            document.getElementById("emoji1").innerHTML = "&#9996";
        }

        if (prediction1 == "Thubs down") {
            document.getElementById("emoji1").innerHTML = "&#128078";
        }

        speak();
    }
}
