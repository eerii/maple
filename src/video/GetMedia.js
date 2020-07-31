import React, {useEffect} from "react"

const mediaConstraints = {
    audio: true,
    video: {
        aspectRatio: {
            ideal: 1.333333
        }
    }
}

const GetMedia = ({ pc, localVideo }) => {
    useEffect(() => {
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints)

                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                    console.log("[MEDIA]: Adding Track -> ", track)
                })

                localVideo.current.srcObject = stream

                console.log("[MEDIA]: User Media is Processed")
            } catch (e) {
                switch(e.name) {
                    case "NotFoundError":
                        alert("Unable to open your call because no camera and/or microphone were found.")
                        break
                    case "SecurityError":
                    case "PermissionDeniedError":
                        // Do nothing; this is the same as the user canceling the call.
                        break
                    default:
                        console.log("[MEDIA]: Error opening your camera and/or microphone " + e.message)
                        break
                }

                //TODO: Close Video Call
            }
        })()
    }, [pc, localVideo])

    return (
        <div>
            Get media
        </div>
    )
}

export default GetMedia