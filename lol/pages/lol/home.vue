<template>
  <div class="home">
    <Head title="首页" :login='login' :out='out' :login1='login1'></Head>
    <van-notice-bar
      text="9.16版本更新公告：不屈之枪潘森重做归来 海克斯新皮肤来袭！"
      left-icon="volume-o"
    />
    <van-swipe :autoplay="2000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="msg">
      <div class="content" v-for='(obj,i) in msg' :key=i>
        <p @click="gonext">{{obj.word}}</p>
        <img :src="obj.pic" alt="">
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      login:false,
      login1:false,
      out:true,
      images:[
        require('@/assets/images/banner/banner1.jpeg'),
        require('@/assets/images/banner/banner2.jpeg'),
        require('@/assets/images/banner/banner3.jpeg'),
        require('@/assets/images/banner/banner4.jpeg'),
        require('@/assets/images/banner/banner5.jpeg'),
      ],
      msg:[
        {word:'意志坚不可摧！不屈之枪潘森重组来袭',pic:require('@/assets/images/pic/pic1.png')},
        {word:'2019全球总决赛售票信息',pic:require('@/assets/images/pic/pic2.png')},
        {word:'2019夏季季后赛内容专题 全球赛区战报信息一手掌握',pic:require('@/assets/images/pic/pic3.png')},
        {word:'RNG差56滴血未能取胜之后，米勒喜提新称号，真水晶守护者',pic:require('@/assets/images/pic/pic4.png')},
        {word:'SKT一穿三挺进S9 赛后与GRF官推激情互动',pic:require('@/assets/images/pic/pic5.png')},
        {word:'圣枪哥预言成真，Uzi丝血反杀青钢影，解说：阿修罗站出来了！',pic:require('@/assets/images/pic/pic6.png')},
        {word:'SKT的灵魂人物 faker与kkoma 即将携手第五次S赛',pic:require('@/assets/images/pic/pic7.png')},
        {word:'2019年全球总决赛场地和时间表',pic:require('@/assets/images/pic/pic8.png')},
        {word:'李哥4分钟单杀DWG中单，Watch：把妖姬的ID改成李哥！',pic:require('@/assets/images/pic/pic9.png')}
      ]
    }
  },
  methods:{
    gonext(){
      this.$router.push({name:'lol-forum'})
    }
  },
  mounted(){
    if(sessionStorage.userinfo){
      if(JSON.parse(sessionStorage.userinfo).username){
        this.login=true
        this.login1=true
      }
    }
  }
}
</script>

<style scoped>
  .van-swipe,img{width: 100%;height: 100%;}
  .msg{width:100%;padding: 0rem 0.2rem;box-sizing: border-box;margin-bottom:0.9rem }
  .content{width: 100%;height: 2rem;border-bottom: 1px solid gray;box-sizing: border-box;
    display: flex;justify-content: center;align-items: center
   }
   p{
     width: 70%;
     margin-right: 0.2rem;
     line-height: 0.7rem
   }
   .content img{
     width: 30%;
     height: auto;
   }

</style>
