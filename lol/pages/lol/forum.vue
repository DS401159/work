<template>
    <div>
        <Head title="论坛" :login='login'  :login1='login1'></Head>
            <div class="top">
                <img src="../../assets/images/theme/logo.png" alt="">
                <div>
                    <h2>英雄联盟</h2>
                    <span>560.5万话题</span>
                    <span>7329.1万成员</span>
                </div>
            </div>
        <Theme></Theme>
        <Foot></Foot>
    </div>
</template>
<script>
import Theme from '@/components/Theme.vue'
export default {
    data(){
        return{
            login:true,
            login1:true
        }
    },
    components:{
        Theme
    }
}
</script>

<style scoped>
    .top{
        width: 100%;
        display: flex;
        padding: 0.3rem;
        justify-content: space-between;
        background: #fff;
        border-bottom:1px solid #aaa 
    }
    .top img{
        width: 20%;
        height: 1.3rem;
    }
    .top div{
        width: 80%;
        margin-left: 0.3rem;
        line-height: 0.6rem;
        font-size: 0.2rem;
        color: #888
    }
    .top div h2{
        font-size: 0.45rem;
        color: #000;
        font-weight: bold
    }

</style>