<template>
    <div class="box">
        <div class="content" v-for='(theme,i) in themes' :key='i' @click="gonext(theme._id)">
            <div class="top">
                <img :src="theme.avatar" alt="">
                <div class="left">
                    <p class="name">{{theme.username}}</p>
                    <p class="time">{{theme.time}}</p>
                    <div class="del" v-if="theme.username==username" @click.stop="del(theme._id)">删除</div>
                </div>
            </div>
            <p class="word">
               {{theme.word}}
            </p>
            <img :src="theme.img?theme.img.replace(/static/,'http://localhost:3000'):''" alt="" class="addimg">
            <div class="icon">
                <van-icon size='0.5rem' v-if='show[i]' @click.stop='white(i)' name='good-job-o'  />
                <van-icon size='0.5rem' v-if='!show[i]' @click.stop='black(i)' name='good-job' />
                <span>{{count[i]*1}}</span>
                <van-icon name="chat-o" size='0.5rem'/>
            </div>
            <div class="publish" @click.stop="publish">
                <img src="../assets/images/theme/add.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            show:[],
            themes:[],
            username:JSON.parse(sessionStorage.userinfo).username,
            count:[]
        }
    },
    methods:{
        publish(){
            this.$router.push({name:'publish'})
        },
        gonext(data){
            this.$router.push({name:'comment',query:{_id:data}})
        },
        del(data){
            this.$axios.post('/vue/deltheme',{_id:data}).then(result=>{
                Toast(result.data.msg)
            })
        },
        white(i){
            this.$set(this.show,i,false)
            this.count[i]= this.count[i]*1+1
        },
        black(i){
            this.$set(this.show,i,true)
            this.count[i]= this.count[i]*1-1
        },
        ...mapMutations(['changeavatar'])
    },
    updated(){
        this.$axios.get('/vue/gettheme').then(result=>{
            this.themes=result.data.result
        })
    },
    mounted(){
        this.$axios.get('/vue/gettheme').then(result=>{
            this.themes=result.data.result
            this.themes.forEach((item,index)=>{
                this.show[index]=true,
                this.count[index]=item.count
            })
        })
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
    .box{
        margin-bottom: 1rem
    }
    .content{
        margin-top: 0.2rem;
        background: #fff;
        border-radius: 0.15rem;
    }
    .top{
        width: 100%;
        display: flex;
        padding: 0.2rem;
        justify-content: space-between;
        align-items: center
    }
    .top img{
        width: 11%;
        height: 0.76rem;
        border-radius: 50%
    }
    .top .left{
        width: 86%;
        margin-left: 0.1rem;
        line-height: 0.4rem;
        font-size: 0.32rem;
        font-weight: bold;
        position: relative;
    }
    .top .left .del{
        width: 15%;
        color: red;
        position:absolute;
        right: 0rem;
        top: 0rem
    }
    .top div .time{
        font-size: 0.28rem;
        color: #888
    }
    .word{
        text-indent: 0.6rem;
        padding:0 0.2rem 
    }
    .addimg{
        width:40%;
        height: auto;
        margin: 0.2rem 0.2rem 0.2rem 10%;
    }
    .icon{
        margin-left:65%; 
        width: 35%;
        padding-bottom: 0.2rem;
        height: 0.75rem;
    }
    .icon i{
        float: left;
    } 
    .icon span{
        margin-left: 0.1rem;
        line-height: 0.57rem;
        float: left;
        margin-right: 20%
    }
    .publish{
        position: fixed;
        right: 0.5rem;
        bottom:2rem
    }
    .publish img{
        width: 1rem;
        height: 1rem;
    }
</style>