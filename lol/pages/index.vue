<template>
  <div class="big">
      <img src="../assets/images/guide.jpg" alt="">
      <div class="box">跳过{{num}}</div>
  </div>
</template>

<script>

export default {
    name:'index',
    data(){
      return{
        num:3
      }
    },
    methods:{
      change(){
        var number=3
        var timer=setInterval(()=>{
          number--
          this.num=number
          if(number==1){
            clearInterval(timer)
            this.$router.push({name:"lol-home"})
          }
        },1000)
      }
    },
    mounted(){
      this.change()
    }
}
</script>

<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  .big{position: relative;}
  .box{
    position: absolute;width: 2rem;height: 0.7rem;
    right: 0.4rem;top: 0.4rem;background: rgba(0, 0, 0, 0.4);
    text-align: center;line-height: 0.7rem;border-radius: 0.4rem;
    color: aliceblue;
  }
</style>