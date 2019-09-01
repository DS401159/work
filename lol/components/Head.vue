<template>
  <div class="head">
    <van-nav-bar :title="title" :left-text="show?'返回':''" :left-arrow='show' @click-left="goback" :right-text="login1?out?'退出登录':publish?'发布':'已登录':'未登录'" @click-right="goout">
      <van-icon name="search" v-if='search' slot="right" @click='gosearch()' />
      <img :src="avatar" alt="" slot="left" @click="gomine" v-if='login'>
    </van-nav-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    props:{
        title:{
            type:String,
            default:"首页"
        },
        show:{
            type:Boolean,
            default:false
        },
        search:{
            type:Boolean,
            default:false
        },
        out:{
            type:Boolean,
            default:false
        },
        login:{
            type:Boolean,
            default:false
        },
        publish:{
            type:Boolean,
            default:false
        },
        login1:{
            type:Boolean,
            default:false
        }
    },
    data(){
      return{
      }
    },
    computed:{
      ...mapState(['avatar'])
    },
    methods:{
      gosearch(){
        if(this.search){
          this.$router.push({name:'search'})
        }
        
      },
      goback(){
        if(this.show){
            this.$router.go(-1)
        }
      },
      goout(){
        if(this.out){
           sessionStorage.userinfo=''
          this.$router.push({name:'login'})
        }else if(this.publish){
          this.$emit("pushmsg");
        }
      },
      gomine(){
        if(this.login && !this.publish){
            this.$router.push({name:'lol-mine'})
        }
      }

    },
    mounted(){
      if(this.$route.name=='search'){
          this.search=false
      }
    }

};
</script>

<style scoped>
  .head{position: sticky;left: 0;top: 0;z-index: 100;width: 100%;}
  .head img{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 1px solid #000;
    box-sizing: border-box
  }
</style>