import axios from 'axios'
var AUTH_TOKEN=''

import { Toast } from 'vant'

axios.defaults.baseURL = "http://localhost:3000/"; // 基路径   
axios.defaults.headers.common['token']=AUTH_TOKEN
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'

axios.interceptors.request.use(function(config){
    if(sessionStorage.userinfo){
        AUTH_TOKEN=JSON.parse(sessionStorage.userinfo).token
    }
   
    config.headers['token']=AUTH_TOKEN
    return config
})



axios.interceptors.response.use(function(response){
    if(response.data.code=='500'){
        Toast.fail(response.data.msg)
        // this.$router.push({name:'login'})
        location.href='/login'
    }
    return response
})


export default axios;

