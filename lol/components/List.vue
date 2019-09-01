<template>
  <div>
        <ul>
            <li v-for='(list,i) in herolist' :key='i' @click="getdetail(list.heroId,list.name)">
                <img :src="`https://game.gtimg.cn/images/lol/act/img/champion/${list.alias}.png`"  alt="">
                <p>{{list.name}}</p>
            </li>
        </ul>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    props:['herolist'],
    methods:{
        getdetail(data,name){
            this.$router.push({name:'detail',query:{heroId:data,name:name}})
        }
    }
}
</script>

<style scoped>
    ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 1.0rem
    }
    li{
        margin-top: 0.2rem;
        width: 25%;
        height: 2rem;
        text-align: center;
    }
    img{width: 60%;height: auto;margin: 0 auto}
    p{line-height: 0.8rem}
</style>