<template>
  <div class="login">
    <div class="content">
    <van-tabs v-model="active" background='rgba(0, 0, 0, 0.2)' color='orange' title-active-color='orange' title-inactive-color='white'>
        <van-tab title="登录">
            <van-cell-group>
            <van-field
                background='#000'
                v-model="login.username"
                label="账号"
                left-icon="manager"
                placeholder="请输入账号"
                color='white'
            />
            <van-field
                v-model="login.userpwd"
                type="password"
                left-icon="lock"
                label="密码"
                placeholder="请输入密码"
                color='white'
            />
            </van-cell-group>
            <!-- <van-button type="primary" size="large" @click="gologin">登录</van-button> -->
            <div class="button" @click="gologin">登录</div>
        </van-tab>
        <van-tab title="注册">
             <van-cell-group>
            <van-field
                v-model="register.username"
                left-icon="manager"
                label="账号"
                placeholder="请输入账号"
            />
            <van-field
                v-model="register.usertel"
                left-icon="phone"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="register.userpwd"
                left-icon="lock"
                type="password"
                label="密码"
                placeholder="请输入密码"
            />
            <van-field
                v-model="register.dbpwd"
                left-icon="lock"
                type="password"
                label="确认密码"
                placeholder="请再次输入密码"
            />
            </van-cell-group>
            <!-- <van-button type="primary" size="large" @click="goregister">注册</van-button> -->
            <div class="button" @click="goregister">注册</div>
        </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
    data(){
        return{
            login:{},
            register:{},
            active:0
        }
    },
    methods:{
        goregister(){
            if(/^[a-zA-Z][a-z0-9A-Z]{5,9}$/.test(this.register.username)==false|| !this.register.username){
                Toast.fail('请输入不以数字开头的6到10位数字或字母')
                this.register.username=''
                return
            }
            if(/^['1'][\d]{10}$/.test(this.register.usertel)==false || !this.register.usertel){
                Toast.fail('请输入正确的手机号')
                this.register.usertel=''
                return
            }
            if(/^[0-9a-zA-Z]{6,12}$/.test(this.register.userpwd)==false || !this.register.userpwd){
                Toast.fail('请输入6到12位数字或字母')
                this.register.userpwd=''
                return
            }
            if(this.register.userpwd!=this.register.dbpwd|| !this.register.dbpwd){
                Toast.fail('两次密码不一致'  )
                 this.register.dbpwd=''
                 return
            }
            this.$axios.post('/vue/register',this.register).then(res=>{
                Toast(res.data.msg)
                this.active=0
            })
        },
        gologin(){
            this.$axios.post('/vue/login',this.login).then(res=>{
                Toast(res.data.msg)
                if(res.data.type==1){
                    sessionStorage.userinfo=JSON.stringify({
                        username:this.login.username,
                        token:res.data.token
                    })
                    this.$router.push({name:'lol-mine'})
                }else{
                    sessionStorage.userinfo=JSON.stringify({
                        token:''
                    })
                }
            })
        }
    }
}
</script>

<style scoped>  
    .content{
        height: 70vh;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        overflow: hidden;
    }
    .login{
        width: 100%;
        height: 100vh;
        background: url('../assets/images/login.png');
        background-size: 100% 100%
    }
    .van-cell-group{
        background: rgba(0, 0, 0,0);
        width: 80%;
        margin: 0 auto;
        border:1px solid rgba(0, 0, 0,0);
    }
    .van-cell{
        margin: 0.4rem 0;
        border-radius: 1rem;
        /* border:1px solid rgba(0, 0, 0,0); */
    }
    .button{
        text-align: center;
        line-height: 1rem;
        font-size: 0.5rem;
        margin: 0.2rem auto;
        color: white;
        width:3.5rem;
        height: 1rem;
        background: url('../assets/images/loginbg.png');
        background-size: 100% 100%
    }
</style>