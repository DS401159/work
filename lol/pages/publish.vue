<template>
    <div class="box">
        <Head title="发布到我的主页" :show='show' :publish='publish' v-on:pushmsg='push'></Head>
        <div class="push">
           <textarea class="pushword" cols="30" rows="6" placeholder="来吧,尽情发挥吧" v-model="word" v-focus></textarea>
            <van-uploader  v-model="fileList" multiple />   
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            show:true,
            publish:true,
            fileList: [],
            word:''
        }
    },
    computed:{
        ...mapState(['avatar'])
    },
    directives:{
        focus:{
            inserted(el){
                el.focus()
            }
        }
    },
    methods: {
        push(){
            var count=0
            var username=JSON.parse(sessionStorage.userinfo).username
            var avatar=this.avatar
            var word=this.word
            var time=new Date()
            var year=time.getFullYear()
            var month=time.getMonth()+1
            var day=time.getDate()
            var hour=time.getHours()
            var min=time.getMinutes()
            var time=`${year}-${month}-${day} ${hour}:${min}`
            var data=new FormData()
            if(this.fileList[0]){
                var file=this.fileList[0].file
                data.append('avatar',file)
            }
            data.append('username',username)
            data.append('avatar',avatar)
            data.append('word',word)
            data.append('time',time)
            data.append('count',count)
            this.$axios.post('/vue/settheme',data).then(result=>{
                Toast(result.data.msg)
                this.$router.push({name:'lol-forum'})
            })
        }
    }
}
</script>

<style scoped>
    .box{
        background: #0000;
        height: 100%;
    }
    .pushimg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: pointer;
        opacity: 0;
    }
    .pushword{
        width: 100%;
        padding:0.25rem 0.2rem;
        outline: 0;
        border: none;
        font-size:0.42rem;
        line-height: 0.6rem;
    }

</style>