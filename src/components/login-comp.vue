<template>
    <div class="login-comp">
        <div id="login">
            <div>
                <div v-if="loading" class="loading">
                    <p>loading...</p>
                </div>
                <div v-else class="err">
                    <p v-html="err"></p>
                </div>
            </div>
            <input 
                type="text" placeholder="room name" name="roomName" 
                v-model="roomName"
            /><br/>
            <input 
                type="text" placeholder="user name" name="userName" 
                v-model="userName"
            /><br/>
            <input 
                type="password" placeholder="room password" name="roomPassword" 
                v-model="roomPassword"
            /><br/>
            <button v-on:click="login">login</button>
        </div>
    </div>    
</template>

<script>

export default {
    name : "LoginComp",
    data() {
        return {
            roomName : "",
            userName : "",
            roomPassword : "",
            err : "",
            loading : false
        }
    },
    methods : {
        login() {
            let valid = this.validate()
            if (valid){
                this.loading = true
                let loginObj = {
                    roomName : this.roomName,
                    userName : this.userName,
                    roomPassword : this.roomPassword
                }
                console.log(loginObj)
                fetch("https://tele-backend.herokuapp.com/api/room-client-login",{
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body : JSON.stringify(loginObj)
                })
                .then(res => res.json())
                .then(data => {
                    this.loading = false
                    if (!data.err){
                        let { id, userName } = data
                        console.log(data)
                        sessionStorage.removeItem("userID")
                        sessionStorage.removeItem("userName")
                        sessionStorage.removeItem("roomName")
                        sessionStorage.setItem("userID",id)
                        sessionStorage.setItem("userName",userName)
                        sessionStorage.setItem("roomName",this.roomName)
                        this.$router.push({ path : "/main" })
                    }else{
                        this.err = ""
                        this.err = data.err    
                        console.log(data)
                    }
                })
                .catch(err => {
                    this.loading = false
                    if (err){
                        this.err = ""
                        this.err = "something went wrong..."
                    }
                })
            }
        },
        validate() {
            if (this.roomName !== "" && this.roomPassword !== "" && 
                this.userName !== ""){
                    return true
            }else{
                this.err = "all fields are required"
                return false
            }               
        }
    }
}
</script>

<style scoped>
.login-comp{
    background: #080820;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#login{
    border: 2px solid white;
    width: 50%;
    padding: 50px 30px;
    padding-bottom: 60px;
    background: white;
    border-radius: 10px;
}

#login > input {
    border: 3px solid #080820;
    margin-bottom: 20px; 
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
}

#login > button {
    margin-top: 10px;
    width: 100%;
    padding: 15px;
    font-size: 20px;
    border-radius: 10px;
    border: 3px solid #080820;
}

#login > button:hover{
    background: #080820;
    color: white;
}

.err {
    color: red;
    text-align: center;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: 600;
}

.loading {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
}
</style>
