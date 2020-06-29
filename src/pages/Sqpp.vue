<!-- 选择资助类型 -->
<template>
    <div class="page">
        <div class="page-box">
            <div v-if="chooseData.length>0">
                <p class="page-dec" v-if="isMyfrom">针对您的家庭及个人情况，您符合相关业务的申请条件，已为您自动匹配相关申请业务，您可在此进行申请填报。</p>
                <h3 class="page-title" v-else>请选择资助类型</h3>
                <div class="option-box">
                    <div v-for="(item, index) in chooseData" :key="index" class="option-item" :class="activeIndex == index ? 'active':''"
                        @click="chooseType(index)">
                        <div class="item-title">{{item.mc}}</div>
                        <div class="item-time">
                            <span>填报时间：{{item.tbkssj&&item.tbkssj.slice(5,10)}} - {{item.tbjssj&&item.tbjssj.slice(5,10)}}</span>
                            <span>复审时间：{{item.fskssj&&item.fskssj.slice(5,10)}} - {{item.fsjssj&&item.fsjssj.slice(5,10)}}</span>
                        </div>
                    </div>

                </div>

                <div class="btn-box">
                    <button @click="gotoNext" class="submit_btn">下一步</button>
                </div>
            </div>

            <div v-else class="noData">
                <img src="/static/img/img_black.png" alt="">
                <p>对不起，没有为您匹配到相应资助业务 </p>
            </div>
        </div>
        <!-- 告知内容弹窗 -->
        <van-dialog v-model="isShowInform" title="申请条件告知" @confirm="informConfirm" :close-on-click-overlay="true">
            <div class="inform-dialog">
                <ul class="inform-dialog-ul">
                    <li>发多少发多少发的发生发斯蒂芬发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬</li>
                    <li>发多少发多少发的发生发斯蒂芬1</li>
                </ul>

            </div>
        </van-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShowInform: false,
                activeIndex: 0,
                chooseData: [],
                //是不是智慧申请匹配
                isMyfrom: null,
            }
        },
        created(){
            //是不是从我的页面智慧申请匹配进来的
            this.isMyfrom = !!this.$route.query.isMyfrom;
            console.log(this.isMyfrom)
            //获取当前可以申请的类型
            this.getType()
        },
		mounted(){

		},
        components: {
        },
        methods: {
            // 告知内容确认事件
            informConfirm(){
                let idx = this.activeIndex;
                let jumpUrl = idx == 0 ? '/gjjxjsqjbxx' : idx == 1 ? '/gjlzjxjsqjbxx' : idx == 2 ? '/gjzxjsqjbxx' : idx ==
                    3 ? '' : '';
                this.$router.push(jumpUrl);
            },
            // 选择申请类型
            chooseType(i) {
                this.activeIndex = i;
            },
            //点击下一步事件
            gotoNext() {
                let idx = this.activeIndex;
                let jumpUrl = idx == 0 ? '/gjjxjsqjbxx' : idx == 1 ? '/gjlzjxjsqjbxx' : idx == 2 ? '/gjzxjsqjbxx' : idx ==
                    3 ? '' : '';
                if(jumpUrl != ''){
                    this.$dialog.confirm({
                        title: '没有获取到您的证件照片',
                        message: '请前往个人中心完善您的资料'
                    }).then(() => {
						if(idx == 1 || idx == 2){
							this.$router.push('/qrsftwo');
						}else{
							this.$router.push('/grzlxg');
						}
                    }).catch(() => {
                        this.$router.push(jumpUrl);
                    });
                }

            },
            // 获取所有的申请类型
            getType(){
                let _this = this;
                let formData = new FormData();
                formData.append('db', 0)
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
                        method: 'post',
                        url: PUBLICURL + 'zzsq/getType',
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" }
                    }).then(json => {
                        _this.$toast.clear();
                        _this.chooseData = json.data.data.list
                        console.log(json)
					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .page {
        display: flex;
        min-height: 100vh;
        padding: .3rem;
        box-sizing: border-box;
        background-color: #eee;
    }

    .page-box {
        width: 100%;
        box-sizing: border-box;
        padding: .6rem 0;
        background-color: #fff;
        box-shadow: 0 0 .15rem 0 rgba(237, 237, 238, 0.8);
        border-radius: .1rem;
    }
    .page-title {
        text-align: center;
        font-size: .4rem;
        color: #1D5687;
        font-weight: 600;
    }
    .page-dec {
        padding: 0 .4rem;
        font-size: .3rem;
        color: #595969;
        line-height: 1.5;
    }

    .option-box {
        margin-top: .8rem;
        padding: 0 .4rem;
        /* height: 5.4rem;
    overflow: auto; */
    }

    .option-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* height: 1.4rem; */
        box-sizing: border-box;
        margin-bottom: .6rem;
        padding: .3rem .34rem;
        border: 1px solid #E0E0E0;
        border-radius: .2rem;
        position: relative;
    }

    .option-item:last-child {
        margin-bottom: 0;
    }

    .item-title {
        color: #171520;
        font-weight: 600;
        font-size: .32rem;
    }

    .item-time {
        margin-top: .2rem;
        color: #9A9A9A;
        font-size: .24rem;
    }

    .item-time span:last-child {
        margin-left: .2rem;
    }

    /* 选中后的样式 */
    .option-item.active {
        border-color: #636BF6;
    }

    .option-item.active .item-title {
        color: #636BF6;
    }

    .option-item.active .item-time {
        color: #636BF6;
    }

    .option-item.active:after {
        content: '';
        position: absolute;
        top: .32rem;
        right: .32rem;
        width: .44rem;
        height: .44rem;
        background: url(/static/img/icon_choose.png);
        background-size: 100%;
    }


    .btn-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1.6rem;
    }
    /* 告知内容弹窗 */
    .inform-dialog{
        max-height: 60vh;
        overflow: auto;
    }
    .inform-dialog-ul{
        padding: .12rem .24rem .24rem;
        box-sizing: border-box;
    }
    .noData {
        width: 100%;
         height: 10rem;
        padding: 1rem;
        box-sizing: border-box;
    }
    .noData img{
        width: 100%;
    }
    .noData p {
        text-align: center;
    }
</style>
