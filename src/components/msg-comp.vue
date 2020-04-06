<template>
    <div class="msg-comp">
        <div>
            <MessageRender />
        </div>
        <div>
            <SendMsg/>
        </div>
    </div>    
</template>

<script>
import MessageRender from './render-msg-comp'
import SendMsg from './send-msg-comp'

export default {
    name : "MsgComp",
    components : {
        MessageRender,
        SendMsg
    }
}
</script>

<style scoped>

</style>