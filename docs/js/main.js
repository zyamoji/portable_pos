Quagga

let localCanvas = document.getElementById('canvas');

function startVideo() {
    // disable other button
    start_btn.style.visibility = "hidden";
    stop_camera_btn.style.visibility = "visible";
    localCanvas.hidden = true;
    localVideo.hidden = false;

    navigator.mediaDevices.getUserMedia(
        {video: {facingMode: {exact: "environment"}}})
	.then(function (stream) {
            localStream = stream;
            localVideo.srcObject = stream;
        })
        .catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
        });
}

function stopVideo() {
    // disable other button
    start_btn.style.visibility = "visible";
    stop_camera_btn.style.visibility = "hidden";

    for (track of localStream.getTracks()) {
        track.stop();
    }
    localStream = null;
    localVideo.pause();
    window.URL.revokeObjectURL(localVideo.src);
    localVideo.src='';
}