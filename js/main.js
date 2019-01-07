var mediaRecorders = {video, screen};
var chunks = {video: [], screen: []};
//Audio & Video
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(function (stream) {
    displayVideo(stream);
    $("#video-record").prop('disabled', false).click(function (e) {recordVideo(stream)}); //Closure
}).catch(function (err) {
    document.writeln(err);
});

function displayVideo (stream) {
    var video = document.getElementById("video");
    video.srcObject = stream;
    video.play();
}

function recordVideo (stream) {
    var options = {type: 'video/webm'};
    mediaRecorders.video = new MediaRecorder(stream, options);
    mediaRecorders.video.ondataavailable = function(e) {
        chunks.video.push(e.data);
    }
    mediaRecorders.video.start();
    $("#video-record").prop('disabled', true);
    $("#video-record-stop").prop('disabled', false).click(function (e) {stopRecording()});
}

function stopRecording () {
    $("#video-record").prop('disabled', false);
    $("#video-record-stop").prop('disabled', true);
    mediaRecorders.video.onstop = function (e) {

        // var clipContainer = document.createElement('article');
        // var clipLabel = document.createElement('p');
        // var audio = document.createElement('audio');
        // var deleteButton = document.createElement('button');
                
        // clipContainer.classList.add('clip');
        // audio.setAttribute('controls', '');
        // deleteButton.innerHTML = "Delete";
        // clipLabel.innerHTML = "Produced Audio";

        // clipContainer.appendChild(audio);
        // clipContainer.appendChild(clipLabel);
        // clipContainer.appendChild(deleteButton);
        // document.body.appendChild(clipContainer);


        // var blob = new Blob(chunks.video, { 'type' : 'audio/ogg; codecs=opus' });
        // chunks.video = []; //Empty
        // var audioURL = window.URL.createObjectURL(blob);
        // audio.src = audioURL;

        // deleteButton.onclick = function(e) {
        //     var evtTgt = e.target;
        //     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        // }
        var videoElement = document.createElement('video');
        var superBuffer = new Blob(chunks.video);
        videoElement.src = window.URL.createObjectURL(superBuffer);
        document.body.appendChild(videoElement);
        
        // var clipContainer = document.createElement('article');
        // var clipLabel = document.createElement('p');
        // var audio = document.createElement('audio');
        // var deleteButton = document.createElement('button');
                
        // clipContainer.classList.add('clip');
        // audio.setAttribute('controls', '');
        // deleteButton.innerHTML = "Delete";
        // clipLabel.innerHTML = "Produced Audio";

        // clipContainer.appendChild(audio);
        // clipContainer.appendChild(clipLabel);
        // clipContainer.appendChild(deleteButton);
        // document.body.appendChild(clipContainer);


        // var blob = new Blob(chunks.video, { 'type' : 'audio/ogg; codecs=opus' });
        // chunks.video = []; //Empty
        // var audioURL = window.URL.createObjectURL(blob);
        // audio.src = audioURL;

        // deleteButton.onclick = function(e) {
        //     var evtTgt = e.target;
        //     evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        // }
    }
    mediaRecorders.video.stop();
    mediaRecorders = null;
}

//Screen
/*getScreen().then(function (stream) {
    var video = document.createElement('video');
    document.body.appendChild(video);
    video.srcObject = stream;
    video.play();
}).catch(function (err) {
    document.writeln(err);
});

function getScreen () {
    if (navigator.getDisplayMedia) {
        console.log();
        return navigator.getDisplayMedia({video: true});
    } else if (navigator.mediaDevices.getDisplayMedia) {
        return navigator.mediaDevices.getDisplayMedia({video: true});
    } else {
        console.log("Video");
        return navigator.mediaDevices.getUserMedia({video: {mediaSource: 'screen'}});
    }
}*/