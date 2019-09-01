<template>
  <div>
    <van-tabbar class="foot" v-model="active">
      <van-tabbar-item  class="box" v-for="(hero,i) in heros" :icon="hero.icon"  :key="i" :name='hero.name'>{{hero.text}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions,mapGetters} from 'vuex'
export default {
  name: "foot",
  computed:{
    ...mapState(['active']),
    active:{
      get(){
        return this.$store.state.active
      },
      set(newval){
        this.changeactive(newval)
        // this.$store.commit('changeactive',newval)
      }
    }
  },
  methods:{
    ...mapMutations(['changeactive'])
  },
  data() {
    return {
      heros: [
        { text: "首页", name: "lol-home", icon: "home-o" },
        { text: "英雄商城", name: "lol-hero", icon: "apps-o" },
        { text: "论坛", name: "lol-forum", icon: "chat-o" },
        { text: "个人中心", name: "lol-mine", icon: "user-o" }
      ],
    };
  },
  watch:{
    active(newval){
      this.$router.push({name:newval})
    }
  },
  mounted(){
    this.changeactive(this.$route.name)
    // this.$store.commit('changeactive',this.$route,name)
  }

};





</script>

<style scoped>
  .box{
    text-align: center;
  }
  .foot{
    width: 100% !important;
    box-sizing: border-box
  }
</style>