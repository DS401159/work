<template>
    <div>
        <Head title="个人中心" :out='out' :login='login' :login1='login1'></Head>
        <div v-if='token'>
            <Mine></Mine>
            <Success></Success>
        </div>
        <div v-else class="login">
            <van-button type="primary" @click="gologin">登录</van-button>
            <p>你还未未登录，请先登录!!!</p>
        </div>
        <Foot></Foot>
    </div>
</template>

<script>
import Mine from '@/components/Mine.vue'
import Success from '@/components/Success.vue'
export default {
    data(){
        return{
            token:false,
            out:true,
            login:false,
            login1:false
        }
    },
    components:{
        Mine,
        Success
    },
    methods:{
        gologin(){
            this.$router.push({name:'login'})
        }
    },
    mounted(){
        if(sessionStorage.userinfo){
            this.token=JSON.parse(sessionStorage.userinfo).token
            this.username=JSON.parse(sessionStorage.userinfo).username
            if(this.username!=''){
                this.login=true
                this.login1=true
            }
        }
    }
}
</script>

<style scoped>
    .login{
        width: 100%;
        height: 1.5rem;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        text-align: center
    }
    .login button{
        margin: 0 auto;
        margin-bottom: 0.5rem
    }

</style>