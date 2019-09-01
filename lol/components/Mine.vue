<template>
    <div>
        <div class="head">
            <img :src="avatar" alt=""  @click='changehead'>
            <input type="file" name="" id="inputbox" ref="inp" @change="changeimg">
            <p class="name">{{name}}</p>
            <p class="state">游戏离线</p>
        </div>
        <div class="mine">
            <div class="left">
                <img src="../assets/images/mine/mine2.jpg" alt="">
            </div>
            <div class="right">
                <div class="top">
                    <p>总局数904</p>
                    <p>胜率25%</p>
                </div>
                <div class="bottom">
                    <div>
                        <img src="../assets/images/mine/mine3.png" alt="">
                        <p>超神</p>
                    </div>
                    <div>
                        <img src="../assets/images/mine/mine4.png" alt="">
                        <p>五杀</p>
                    </div>
                    <div>
                        <img src="../assets/images/mine/mine5.png" alt="">
                        <p>四杀</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            name:JSON.parse(sessionStorage.userinfo).username,
        }
    },
    computed:{
        ...mapState(['avatar'])
    },
    methods:{
        changehead(){
            this.$refs.inp.click()
        },
        changeimg(){
            var file=this.$refs.inp.files[0]
            var data=new FormData()
            data.append('avatar',file)
            this.$axios.post('/vue/updateavatar',data).then(result=>{  
                var url=result.data.pic.replace(/static/,'http://localhost:3000')
                this.changeavatar(url)
                this.$axios.post('/vue/newavatar',{url}).then(result=>{
                })       
            })
        },
        ...mapMutations(['changeavatar'])
    },
    mounted(){
        if(sessionStorage.userinfo){
            var username=JSON.parse(sessionStorage.userinfo).username
        }
        if(username){
            this.$axios.post('/vue/getavatar',{username}).then(result=>{
                if(result.data.type==1){
                    var url=result.data.avatar.replace(/static/,'http://localhost:3000')  
                    this.changeavatar(url) 
                }
            })
        }
    }
}
</script>

<style scoped>
    .head{
        width: 100%;
        height: 2.8rem;
        background: url('../assets/images/mine/mine1.jpg');
        background-size: 100% 100%;
        text-align: center;
        overflow: hidden;
    }
    .head img{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin: 0.2rem auto 0rem
    }
    input{
        display: none
    }
    .name{
        font-size: 0.6rem;
        line-height: 0.7rem;
        color: #0e477c;
        font-weight: bolder;
    }
    .state{
        font-size: 0.2rem;
        color: #46477e;
    }
    .mine{
        display: flex;
        height: 2.6rem;
        color: goldenrod;
        background: #ffffff;
        margin-bottom: 0.2rem
    }
    .left{
        width: 35%;
        height: 100%;
    }
    .left img{
        width: 100%;
        height: 100%;
       
    }
   .right{
        width: 75%;
        height: 2.2rem;
        margin: 0.2rem 0;
        border-left: 1px solid #ddd;
        box-sizing: border-box
   }
   .right .top{
       padding:0 0.4rem;
       height: 20%;
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-bottom: 0.15rem
   }
   .right .bottom{
       height: 80%;
       width: 100%;
       display: flex;
       justify-content: space-between;
       align-items: center;
       font-size: 0.26rem
   }
   .right .bottom img{
       width: 55%;
       height: 55%;
       margin: auto;
       margin-bottom: 0.15rem
   }
   .right .bottom p{
       height: 45%;
       text-align: center;
       color: #888
   }
</style>