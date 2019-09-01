<template>
    <div>
        <Head :title="title" :show='show' :search='search' :login='login' :login1='login1'></Head>
        <van-search
            v-model="keyword"
            placeholder="请输入英雄名称"
            show-action
            @search="onSearch"
            @cancel="onCancel"
        />
        <List :herolist='herolist'></List>
    </div>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            title:'搜索',
            show:true,
            search:false,
            login:false,
            login1:true
        }
    },
    computed:{
        ...mapState(['herolist']),
        keyword:{
            get(){
                return this.$store.state.keyword
            },
            set(newval){
                this.$store.commit('changekeyword',newval)
                // this.changekeyword(newval)
            }
        }
    },
    methods:{
        onCancel(){
            this.keyword=''
        },
        onSearch(){
             this.getlistAsync({url:'/vue/herolist',params:{keyword:this.keyword}})
        },
        ...mapActions(['getlistAsync']),
        ...mapMutations(['changekeyword'])
    }
}
</script>

<style>

</style>