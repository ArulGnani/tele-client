<template>
    <div class="video-comp">
        <video controls id="videoElement">
        </video>
    </div>
</template>

<script>
import socket from './socket'
const config = {
    'iceServers' : [{ 
        'urls': ['stun:stun.l.google.com:19302']
    }]
}
let peerConnction

export default {
    name : "WatchComp",
    mounted() {
        socket.on('offer',(id,description) => {
            sessionStorage.removeItem("socketID")
            sessionStorage.setItem("socketID",id)
            let videoElement = document.getElementById("videoElement")
            console.log("broadcaster spd",description)
            peerConnction = new RTCPeerConnection(config)
            peerConnction.setRemoteDescription(description)
            .then(() => peerConnction.createAnswer())
            .then(sdp => peerConnction.setLocalDescription(sdp))
            .then(() => {
                console.log("sending sdp to broadcaster",peerConnction.localDescription)
                socket.emit("answer",id,peerConnction.localDescription)
            })
            peerConnction.ontrack = (event) => {
            console.log("start streaming from broadcaster")
            videoElement.srcObject = event.streams[0]
            } 
            peerConnction.onicecandidate = (event) => {
                if (event.candidate){
                    console.log("send identity to broadcaster",event.candidate)
                    socket.emit("candidate",id,event.candidate)
                }
            }
        })

        socket.on('candidate',function (id,candidate) {
            console.log("add broadcaster identy to peer")
            peerConnction.addIceCandidate(new RTCIceCandidate(candidate))
            .catch(err => console.log(err))
        })
        
        socket.on("connect",() => {
            let roomName = sessionStorage.getItem("roomName")
            socket.emit("watcher",roomName)
        })

        socket.on("broadcaster",roomName => {
            socket.emit("watcher",roomName)
        })

        socket.on("bye",() => {
            peerConnction.close()
        })
    },
    beforeCreate() {
        let userID = sessionStorage.getItem("userID")
        let userName = sessionStorage.getItem("userName")
        let roomName = sessionStorage.getItem("roomName")
        if (userName === "" && userID === "" && 
            roomName === ""){
                this.$router.push("/")
        }
    }
}
</script>

<style scoped>
    #videoElement{
        width: 100%;
        height: auto;
    }
</style>