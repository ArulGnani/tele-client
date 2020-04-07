<template>
    <div class="render-msg">
        <div 
            v-for="msg in allMsg" :key="msg.id" 
            class="msg-comp">
                <p>{{ msg.msg }}</p>
                <small>sender : {{ msg.sender }}</small>
        </div>
    </div>    
</template>

<script>
import socket from './socket'


export default {
    name : "RenderMsgComp",
    data() {
        return {
            allMsg : []
        }
    },
    mounted(){                
        socket.on("new-msg",newMsg => {
            console.log("recived new msg",newMsg)
            newMsg["id"] = Math.floor(Math.random() * 10000) 
            this.allMsg = [...this.allMsg,newMsg]      
        })
    }
}
</script>

<style scoped>
    .render-msg{
        margin-left: 5px;
        margin-right: 5px;
        height: 90vh;
        overflow-y: auto;
    }
    .render-msg::-webkit-scrollbar{
        display: none;
    }
    .msg-comp {
        background : #6b6be7;
        border-radius: 10px;
        margin-top: 10px;
        margin-bottom: 10px;        
        padding: 10px;
        color: white;
    }
    .msg-comp > p {
        font-size: 20px;
        letter-spacing: 1px;
        word-spacing: 3px;
    }
    .msg-comp > small {
        letter-spacing: 0.5px;
        word-spacing: 3px;
    }
</style>