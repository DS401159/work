<template>
    <div class="box">
        <div class="top">
            <van-checkbox v-model="checkedAll" checked-color="goldenrod">
                全选
            </van-checkbox>
        </div>
        <van-checkbox-group v-model="result" class="big">
            <van-checkbox
                v-for="(list,i) in cartlist"
                :key="i"
                :name="i"
                checked-color="goldenrod"
                class="content"
            >
                <div class="detail"> 
                    <img :src="list.img" alt="">
                    <div>
                        <span>{{list.title}} {{list.name}}</span>
                        <p class="price">价格：¥ {{list.price}}</p>
                    </div>
                </div>
            </van-checkbox>
        </van-checkbox-group>
        <van-submit-bar
            :price="pay*100"
            button-text="提交订单"
            @submit="onSubmit"
            >
            <p class="del" @click="del">删除</p>
        </van-submit-bar>
        <div class="img" v-show="code">
            <img src="../assets/images/code.jpg" alt="">
            <p>请扫码支付</p>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
             checkedAll:false,
             result:[],
             pay:0,
             code:false
        }
    },
    props:['value','show'],
    computed:{
        ...mapState(['cartlist']),
    },
    watch:{
        checkedAll(newval){
            if(newval){
                this.result=[]
                this.cartlist.forEach((item,index)=>{
                    this.result.push(index)
                })
            }else if(!newval && this.cartlist.length==this.result.length){
                this.result=[]
            }
        },
        result(newval){
            if(newval.length==this.cartlist.length &&newval.length!=0){
                this.checkedAll=true
            }else{
                this.checkedAll=false
            }
            this.pay=0
            newval.forEach((item,index)=>{
                this.pay+=this.cartlist[item].price*1
            })
            return this.pay
        }
    },
    methods:{
        del(){
            var arr=[]
            if(this.cartlist.length && this.result.length){
                this.result.forEach((item,index)=>{ 
                arr.push({name:this.cartlist[item].name})
                })
                this.$axios.get('/vue/delcart',{params:{arr}}).then(res=>{
                    this.getcartAsync({url:'/vue/getcart',params:{
                        username:JSON.parse(sessionStorage.userinfo).username,
                    }})
                })
                this.result=[]
            }else{
                Toast('请选择你需要删除的商品')
            }
        },
        onSubmit(){
            if(!this.value){
                Toast('请选择大区')
            }else{
                if(this.result.length){
                    this.code=true
                    var timer=setTimeout(()=>{
                        this.code=false
                        clearTimeout(timer)
                        var arr=[]
                        this.result.forEach((item,index)=>{ 
                        arr.push({name:this.cartlist[item].name})
                        })
                        this.$axios.get('/vue/delcart',{params:{arr}}).then(res=>{
                            this.getcartAsync({url:'/vue/getcart',params:{
                                username:JSON.parse(sessionStorage.userinfo).username,
                            }})
                        })
                        this.result=[]
                    },2000)
                }else{
                    Toast('请选择需要购买的商品')
                }
            }
        },
        ...mapActions(['getcartAsync'])
    },
    mounted(){
        this.getcartAsync({url:'/vue/getcart',params:{
            username:JSON.parse(sessionStorage.userinfo).username,
        }})
    }
}
</script>


<style scoped>
   .box{
       background:#fff
    }
    .box .top{
        padding: 0.3rem;
        box-sizing: border-box
    }
    .box .content{
        background: whitesmoke;
        margin-bottom: 0.1rem;
        padding: 0.3rem;
        box-sizing: border-box
    }
    .detail{
        display: flex;
        align-items: center
    }
    .detail img{ 
        border: 2px solid gray;
        margin-left:0.4rem;
        margin-right: 0.4rem;
        width: 1.2rem;
        height: 1.2rem;
    }
    .detail span,p{
        font-size: 0.3rem;
        line-height: 0.5rem
    }
    .detail span{
        width: 100%
    }
    .del{
        margin-left: 0.3rem
    }
    .img{
        width: 4.5rem;
         box-shadow: 0px 0px 10px #000;
         position: absolute;
         left: 0;
         top: 0;
         right: 0;
         bottom: 0;
         margin: auto;
         height: 4.5rem;
    }
    .img p{
        height: 0.5rem;
        text-align: center;
        font-size: 0.4rem;
        line-height: 0.7rem
    }
    img{
        width: 100%;
        height: 100%;
       
    }
</style>