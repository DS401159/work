<template>
    <div v-if='show'>
        <Head :title="title" :show='show' :search='search'></Head>
        <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(skin,index) in skins"  :key="index" >
                    <img :src="skin.mainImg" alt="" class="skin"  >
                </van-swipe-item>
        </van-swipe>
        <div class="detail"> 
            <img :src="skins[0].iconImg" alt="" >
            <div>
                <span>{{hero.name}}</span>
                <span>{{hero.title}}</span>
                <p class="price">价格：¥ {{(hero.attackdamage*1).toFixed(2)}}</p>
            </div>
           
        </div>
        <ul>
            <li v-for='(spell,i) in spells' :key='i'> 
                <div class="box">
                    <img :src="spell.abilityIconPath" alt="" class="spell">
                    <span>{{spell.name}}({{spell.spellKey=='passive'?'被动技能':spell.spellKey}})</span>
                </div>
                <div class="msg" v-html="spell.description"></div>
            </li>
        </ul>
        <van-goods-action>
            <van-goods-action-icon
                icon="chat-o"
                text="客服"
                @click="kefu"
            />
            <van-goods-action-icon
                :info='total'
                icon="cart-o"
                text="购物车"
                @click="cart"
            />
            <van-goods-action-button
                type="warning"
                text="加入购物车"
                @click="addcart"
            />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="buy"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            heroId:this.$route.query.heroId,
            title:this.$route.query.name,
            show:true,
            skins:[],
            spells:[],
            hero:{},
            show:false,
            search:true
        }
    },
    mounted(){
        this.$http.get(`https://game.gtimg.cn/images/lol/act/img/js/hero/${this.heroId}.js`).then(result=>{
            this.detail=result.data
            var skin=this.detail.skins
            var spell=this.detail.spells
            this.skins=skin.filter(item=>{
                return item.mainImg
            })
            this.hero=this.detail.hero
            this.spells[0]=spell[1]
            this.spells[1]=spell[2]
            this.spells[2]=spell[4]
            this.spells[3]=spell[0]
            this.spells[4]=spell[3]
            this.show=true
        })
        this.getcartAsync({url:'/vue/getcart',params:{
             username:JSON.parse(sessionStorage.userinfo).username,
        }})
    },
    computed:{
        ...mapState(['total'])
    },
    methods:{
        kefu(){

        },
        cart(){
            this.$router.push({name:'cart'})
        },
        addcart(){
            this.$axios.post('/vue/addcart',{
                username:JSON.parse(sessionStorage.userinfo).username,
                heroId:this.heroId,
                img:this.skins[0].iconImg,
                price:(this.hero.attackdamage*1).toFixed(2),
                name:this.hero.name,
                title:this.hero.title
            }).then(res=>{
                if(!!res.data.type){
                    this.getcartAsync({url:'/vue/getcart',params:{
                        username:JSON.parse(sessionStorage.userinfo).username,
                    }})
                }
                Toast(res.data.msg)  
            })
        },
        buy(){
            this.$router.push({name:'cart'})
        },
        ...mapActions(['getcartAsync'])
    },
}
</script>

<style scoped>
    .skin{
        width: 100%;
        height: 3.8rem;
    }
    .spell{
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid gray;
    }
    li{
        margin-top: 0.3rem;
        padding: 0.15rem
    }
    ul{
        margin-bottom: 1.3rem
    }
    .box{
        display: flex
    }
    ul span{
        font-size: 0.4rem;
        line-height: 1.2rem;
        display:block;
        margin-left: 0.3rem;
        font-weight: bolder
    }
    .msg{
        overflow: hidden;
        font-size: 0.28rem;
        color:#444
    }
    .detail{
        border-bottom: 2px solid #555;
        display: flex;
        align-items: center
    }
    .detail img{ 
        border: 2px solid gray;
        margin-left:0.4rem;
        margin-right: 0.4rem ;
        width: 1.2rem;
        height: 1.2rem;
    }
    .detail span,p{
        font-size: 0.4rem;
        line-height: 0.8rem
    }
</style>