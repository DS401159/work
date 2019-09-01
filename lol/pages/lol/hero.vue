<template>
  <div class="home" v-if='show'>
    <Head title="英雄" :search='search' :login='login' :login1='login1'></Head>
      <van-tabs title-active-color='#f44'>
        <van-tab v-for='(type,i) in herotype' :title="type=='mage'?'法师':type=='fighter'?'战士':type=='tank'?'坦克':type=='assassin'?'刺客':type=='support'?'辅助':type=='marksman'?'射手':'错误'" :key='i'>
          <List :herolist='herolist.filter(item=>item.roles[0]==type||item.roles[1]==type)' @changesort="changesort"></List>
        </van-tab>
      </van-tabs>
    <Foot></Foot>
  </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
   data(){
        return{
            show:false,
            search:true,
            login:true,
            login1:true
        }
    },
   computed:{
        ...mapState(['herolist','herotype'])
    },
    methods:{
        ...mapActions(['getlistAsync','gettypeAsync']),
        changesort(){
          this.herolist.reverse()
        }
    },
    created(){
        this.getlistAsync({url:'/vue/herolist'})
    },
    mounted(){
        if(!this.herotype.length){
            this.gettypeAsync({url:'/vue/herotype',cb:()=>{
                Toast.loading({
                    mask: false,
                    message: '加载中...'
                });
                this.show=true
            }})
        }
        this.show=true
    }
}
</script>

<style scoped>
  
</style>