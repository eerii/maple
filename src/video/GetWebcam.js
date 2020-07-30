const cameraMode = "user"

export const getWebcam = async (stream) => {
    const constraints = {
        audio: true,
        video: {
            facingMode: cameraMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        }
    }

    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)

    if (navigator.mediaDevices.getUserMedia) {
        try {
            stream.current = await navigator.mediaDevices.getUserMedia(constraints)
            return true
        } catch (e) {
            console.log("Failed to get Webcam ", e)
            return false
        }
    }
    else {
        await navigator.getWebcam({ audio: true, video: true },
            (s) => {
                stream.current = s
                return true
            },
            () => {
                console.log("Web cam is not accessible.")
                return false
            });
    }
}