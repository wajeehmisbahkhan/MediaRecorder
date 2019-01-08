//Audio & Video
// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
// }).then(function (stream) {
//     displayVideo(stream);
//     //Record
//     $("#video-record").prop('disabled', false).click(function (e) {recordVideo(stream)});
// }).catch(function (err) {
//     document.writeln(err);
// });

//Screen
getScreen().then(function (stream) {
    displayVideo(stream);
    //Record
    $("#video-record").prop('disabled', false).click(function (e) {recordVideo(stream)}); //Closure
}).catch(function (err) {
    document.writeln(err);
});

function getScreen () {
    if (navigator.getDisplayMedia) {
        return navigator.getDisplayMedia({video: true, audio: true});
    } else if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
    } else {
        return navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}, audio: true});
    }
}

//All Utility Functions
function displayVideo (stream) {
    var video = document.getElementById("video");
    video.srcObject = stream;
    video.play();
}

function recordVideo (stream) {
    var options = {type: 'video/webm'};
    var chunks = [];
    var mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
    }
    mediaRecorder.start();
    $("#video-record").prop('disabled', true);
    $("#video-record-stop").prop('disabled', false).click(function (e) {stopRecording(mediaRecorder, chunks);});
}

function stopRecording (mediaRecorder, chunks) {
    $("#video-record").prop('disabled', false);
    $("#video-record-stop").prop('disabled', true);
    mediaRecorder.onstop = function (e) {

        var clipContainer = document.createElement('article');
        var clipLabel = document.createElement('p');
        var video = document.createElement('video');
        var deleteButton = document.createElement('button');
                
        clipContainer.classList.add('clip');
        video.setAttribute('controls', '');
        deleteButton.innerHTML = "Delete";
        clipLabel.innerHTML = "Produced Video";

        clipContainer.appendChild(video);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        document.body.appendChild(clipContainer);

        var superBuffer = new Blob(chunks);
        chunks = []; //Empty
        video.src = window.URL.createObjectURL(superBuffer);

        deleteButton.onclick = function(e) {
            var evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        }

    }
    mediaRecorder.stop();
}