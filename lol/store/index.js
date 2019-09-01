
import axios from '@/plugins/axios'
export const state = () => ({
    herolist:[],
    herotype:[],
    keyword:'',
    active:'guide-home',
    cartlist:[],
    total:0,
    avatar:require('@/assets/images/avatar/img3.jpg')
})

export const actions={
  gettypeAsync({commit},{url,cb}){
    axios.get(url).then(res=>{
      commit('gettype',res.data.result)
    }) 
  },
  getlistAsync({commit},{url,params}){
    axios.get(url,{params}).then(res=>{
      commit('getlist',res.data.result)
    }) 
  },
  getcartAsync({commit},{url,params}){
    axios.get(url,{params}).then(res=>{
      commit('getcartlist',res.data.result)
    })
  }
}

export const mutations = {
  gettype(state,data){
    state.herotype=data
  },
  getlist(state,data){
    state.keyword=''
    state.herolist=data
    
  },
  changeactive(state,data){
    state.active=data
  },
  changekeyword(state,data){
    state.keyword=data
  },
  getcartlist(state,data){
    state.cartlist=data
    state.total=data.length
  },
  changeavatar(state,data){
    state.avatar=data
  }
}




 