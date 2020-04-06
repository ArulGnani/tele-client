<template>
    <div class="send"> 
        <div id="in">
            <input type="text" name="msg" v-model="msg">
        </div>
        <div id="btn">
            <button v-on:click="sendMsg">send</button>
        </div>
    </div>    
</template>

<script>
import socket from './socket'

export default {
    name : "MsgSendComp",
    data() {
        return {
            msg : "",
            roomName : sessionStorage.getItem("roomName"),
            userName : sessionStorage.getItem("userName")
        }
    },
    methods : {
        sendMsg(){
            if (this.msg !== ""){
                socket.emit("new-msg",{
                    room : "sample",
                    sender : this.userName,
                    msg : this.msg
                })
                this.msg = ""
            }else{
                console.log("can't send msg")
            }
        }
    }
}
</script>

<style scoped>
    .send{
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-areas: "input-field send-btn";
        margin-top: 10px;
    }
    #in > input{
        width: 80%;
        grid-area: "input-field";
        padding: 15px 20px;
        border-radius: 10px;
        margin-right: 10px;
        font-size: 15px;
    }
    #btn > button {
        grid-area: "send-btn";
        width: 100%;
        padding: 15px 20px;
        font-size: 15px;
        border-radius: 10px;
        border: 2px solid white;
        background: transparent;
        color: white;
    }
    #btn > button:hover{
        background: white;
        color: #080820;
    }
</style>