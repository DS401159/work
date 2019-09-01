<template>
    <div class="box">
        <div class="top">
            <p icon='arrow-down'>游戏任务(1)</p>
            <div class="day">
                <span>每日首胜</span>
                <img src="../assets/images/mine/mine6.png" alt="">
            </div>
        </div>
        <div class="center">
            <p>我的战绩</p>
            <img src="../assets/images/mine/mine7.gif" alt="">
        </div>
        <div class="detail"> 
            <img src="https://game.gtimg.cn/images/lol/act/img/champion/LeeSin.png" alt="">
            <div class="right">
                <div>
                    <span>失败 7/9/28</span>
                    <p >排位赛</p>
                </div>
                <div class="time">
                    6-15 19:39
                </div>
            </div>
        </div>
        <div class="detail"> 
            <img src="https://game.gtimg.cn/images/lol/act/img/champion/Teemo.png" alt="">
            <div class="right">
                <div>
                    <span>失败 0/10/0</span>
                    <p >排位赛</p>
                </div>
                <div class="time">
                    6-15 18:46
                </div>
            </div>
        </div>
        <div class="detail"> 
            <img src="https://game.gtimg.cn/images/lol/act/img/champion/Yasuo.png" alt="">
            <div class="right">
                <div>
                    <span>胜利 13/3/16</span>
                    <p >排位赛</p>
                </div>
                <div class="time">
                    6-15 18:05
                </div>
            </div>
        </div>
        <p class="end"> 仅记录半年且500场内的战绩</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .box{
        background: #fff;
        margin-bottom:1.0rem 
    }
    .top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem 0.3rem 0.1rem 0rem;
    }
    .top p{
        border-left: 0.12rem solid goldenrod;
        height: 0.4rem;
        line-height: 0.4rem;
        text-indent: 0.15rem;
        color: goldenrod
    }
    .top .day{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.28rem;
        color: #888
    }
    .top .day img{
        width: 0.5rem;
        height: 0.5rem;
        margin-left: 0.2rem
    }
    .center{
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0 0.2rem 0.3rem;
        color: darkslategray
    }
    .center img{
        height: 0.45rem;
        width: auto
    }
     .detail{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.2rem
    }
    .detail img{ 
        border: 2px solid goldenrod;
        padding: 0.02rem;
        width: 15%;
        border-radius: 50%
    }

    .detail span,p{
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #666
    }
    .detail span{
        color: darkslategray
    }
    .detail .right{
        width: 80%;
        border-bottom: 1px solid #aaa;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.15rem
    }
    .detail .right .time{
        font-size: 0.24rem;
        color: #888
    }
    .end{
        text-align: center
    }
</style>