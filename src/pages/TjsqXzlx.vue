<!-- 选择资助类型 -->
<template>
    <div class="page">
        <div class="page-box" v-if="chooseData">
            <div v-if="chooseData.length>0">
                <p class="page-dec" v-if="isMyfrom">针对您的家庭及个人情况，您符合相关业务的申请条件，已为您自动匹配相关申请业务，您可在此进行申请填报。</p>
                <h3 class="page-title" v-else>请选择资助类型</h3>
                <div class="option-box">
                    <div v-for="(item, index) in chooseData" :key="index" class="option-item" :class="activeIndex == index ? 'active':''"
                        @click="chooseType(index)">
                        <div class="item-title">{{item.mc}}</div>
                        <div class="item-time">
                            <span>填报时间：{{item.tbkssj&&item.tbkssj.slice(5,10)}} -
                                {{item.tbjssj&&item.tbjssj.slice(5,10)}}</span>
                            <span>复审时间：{{item.fskssj&&item.fskssj.slice(5,10)}} -
                                {{item.fsjssj&&item.fsjssj.slice(5,10)}}</span>
                        </div>
                    </div>

                </div>

                <div class="btn-box">
                    <button @click="isShowInform = true" class="submit_btn">下一步</button>
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
                    <li>{{chooseData&&chooseData[activeIndex].mc}}</li>
                    <li>申请须知内容</li>
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
                chooseData: null,
                //是不是智慧申请匹配
                isMyfrom: null,
                //是否代办
                db: null,
                submitFlag:false
            }
        },
        created() {
            //是不是从我的页面智慧申请匹配进来的
            this.isMyfrom = !!this.$route.query.isMyfrom;
            //是否代办
            let db = this.$route.query.db;
            this.db = !!db;
            //获取当前可以申请的类型
            this.getType()
        },
        mounted() {

        },
        components: {},
        methods: {
            // 告知内容确认事件
            informConfirm() {
                this.gotoNext();
            },
            // 选择申请类型
            chooseType(i) {
                this.activeIndex = i;
            },
            //点击下一步事件
            gotoNext() {
                let _this = this;
                let idx = _this.activeIndex;
                let zzzcId = _this.chooseData[idx].id;
                let submitData = {
                    zzzcId,
                }
                submitData.db = _this.db ? '1' : '2';
                _this.$toast.loading({
					message: '提交中...',
                    forbidClick: true,
                    duration: 0,
                });
                if(_this.submitFlag) return
                _this.submitFlag = true;
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'zzrd/judgeZg',
                    data: submitData,
                }).then(json => {
                    let data = json.data;
                    let queryData = {
                        zzzcId,
                    };
                    //是否代办
                    if(_this.db){
                        queryData.db = '1';
                    }

                    if (data.result == 200) {

                        setTimeout(()=>{ // 防重
                            _this.submitFlag = false;
                        }, 2000);

                        if(data.data.tsqt > 0){
                            queryData.tsqt = '1';
                        }
                        setTimeout(()=>{
                            _this.$router.push({
                                path: '/knbzsq',
                                query: queryData,
                            });
                        }, 300)
                    } else {
                        if (data.errorcode == '1000') {
                            _this.$dialog.alert({
                                title: '没有获取到您的证件照片',
                                message: '请前往个人中心完善您的资料'
                            }).then(() => {
                                _this.$router.push('/name');
                            });
                        } else if (data.errorcode == '1001' || data.errorcode == '1002') {
                            _this.$dialog.alert({
                                title: '您还没有资助对象认定',
                                message: '请前往进行资助对象认定'
                            }).then(() => {
                                _this.$router.push({
                                    path: '/zzdxrd',
                                    query: queryData,
                                })
                            });
                        }else{
                            _this.$dialog.alert({
                                message: data.errorcode,
                            });
                        }
                        _this.submitFlag = false;
                    }
                    _this.$toast.clear();

                }).catch(function(error) {
                    _this.submitFlag = false;
                    _this.$toast.clear();
                    console.log(error);
                });

            },
            // 获取所有的申请类型
            getType() {
                let _this = this;
                let formData = new FormData();
                let db = !!_this.db ? '1' : '2';
                formData.append('db', db);
                this.$toast.loading({
					message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'zzsq/getType',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(json => {
                    let data = json.data;
                    if (data.result == 200) {
                        _this.chooseData = data.data.list;
                    } else {
                        _this.$dialog.alert({
                            message: data.errorcode,
                        })
                    }
                    _this.$toast.clear();
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
    .inform-dialog {
        max-height: 60vh;
        overflow: auto;
    }

    .inform-dialog-ul {
        padding: .12rem .24rem .24rem;
        box-sizing: border-box;
    }

    .noData {
        width: 100%;
        height: 10rem;
        padding: 1rem;
        box-sizing: border-box;
    }

    .noData img {
        width: 100%;
    }

    .noData p {
        text-align: center;
    }
</style>
