<template>
    <div class="info-comp">
        <div id="views">
            viewers : {{ this.views }}
        </div>
        <div id="logout">
            <button v-on:click="logout">logout</button>
        </div>
    </div>    
</template>

<script>
import socket from './socket'


export default {
    name : "InfoComp",
    data(){
        return{
            views : 0
        }
    },
    mounted(){
        socket.on("no-view",noViewers => {
            console.log("no of viewers",noViewers)
            this.views = noViewers
        })
    },
    methods : {
        logout() {
            let userId = sessionStorage.getItem("userID")
            if (userId){
                fetch(`https://tele-backend.herokuapp.com/api/room-client-logout/${userId}`,{
                    method : "GET",
                    headers : { "Accept" : "application/json" }
                })
                .then(res => res.json())
                .then(data => {
                    if (data){
                        let roomName = sessionStorage.getItem("roomName")
                        let id = sessionStorage.getItem("socketID")
                        let info = {roomName : roomName,id : id}
                        socket.emit("disconnect", info)
                        this.deleteData()
                    }
                })
                .catch(err => {
                    if (err) alert("your logged out..")
                    this.deleteData()
                })
            }else{
                this.deleteData()
            }
        },
        deleteData() {
            sessionStorage.removeItem("roomName")
            sessionStorage.removeItem("userID")
            sessionStorage.removeItem("userName")
            sessionStorage.removeItem("socketID")
            this.$router.push({ path : "/"})
        }
    }
}
</script>

<style scoped>
    .info-comp{
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    #views{
        margin-right: 20px;
        margin-left: 20px;
        border: 2px solid white;
        padding: 15px;
        font-size: 20px;
        color: white;
        border-radius: 10px;
    }
    #views:hover{
        background: white;
        color: #080820;
    }

    #logout > button{
        margin-right: 20px;
        margin-left: 20px;
        background: transparent;
        border: 2px solid white;
        padding: 15px;
        font-size: 20px;
        color: white;
        border-radius: 10px;
    }
    #logout > button:hover{
        background: white;
        color: #080820;   
    }
</style>