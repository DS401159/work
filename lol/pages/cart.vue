<template>
    <div>
        <Head :title="'购物车('+total+')'" :show='show' :search='search' :login1='login1'></Head>
        <hr>
        <van-field
        readonly
        clickable
        label="当前大区"
        :value="value"
        placeholder="请选择大区"
        @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
        </van-popup>
        <p class="text">本服务由道聚城提供</p>
        <Cartlist :value='value' :show='show'></Cartlist>
    </div>
</template>

<script>

import {mapState,mapMutations,mapActions} from 'vuex'
import Cartlist from '@/components/Cartlist'
export default {
    data(){
        return{
            show:true,
            value: '',
            showPicker: false,
            columns:['艾欧尼亚','祖安','诺克萨斯','德玛西亚','裁决之地','黑色玫瑰','暗影岛','钢铁烈阳','水晶之痕','征服之海','卡拉曼达','皮城警备','男爵领域'],
            search:false,
            login1:true
        }
    },
    components:{
        Cartlist
    },
    computed:{
        ...mapState(['total'])
    },
    methods:{
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        }
    }
}
</script>

<style scoped>
    .text{
        font-size: 0.34rem;
        line-height: 0.7rem;
        text-indent: 0.35rem;
        background: rgba(0, 0, 0, 0.02)
    }
    .van-cell{
        font-size: 0.32rem
    }
</style>