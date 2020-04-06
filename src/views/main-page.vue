<template>
    <div class="main-comp">
        <div id="main">
            <div>
                <MainComp/>
            </div>
            <div>
                <InfoComp />
            </div>
        </div>
        <div id="msg">
            <MsgComp />
        </div>
    </div>
</template>

<script>
import MainComp from '../components/watch'
import InfoComp from '../components/info-comp'
import MsgComp from '../components/msg-comp'

export default {
    name : "MainPage",
    components : { 
        MainComp,
        InfoComp,
        MsgComp
    }
}
</script>

<style scoped>
    *{
        background: #080820;
    }
    .main-comp{
        height: 100vh;
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-area: "video msg";
        overflow: hidden;
    }
    #main{
        grid-area: "video";
        width: 100%;
    }
    #msg{
        grid-area: "msg";
    }
</style>