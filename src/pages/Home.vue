<template>
    <!-- 首页 -->
    <div v-if="list" class="page-box">
        <!-- 有数据时 -->
        <div v-if="list.length>0" class="home">
            <div class="list_data">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载"
                    @load="onLoad">
                    <ul style="padding-top: 0.3rem;">
                        <li v-for="(item,i) in list" :key="i" :class="[item.sqzt == -1 ? 'defaut':'' ]">
                            <h3 class="item-title">
                                {{item.zzzcMc}}
                                <img class="db-icon" src="/static/img/drsq_icon.png" v-if="item.dbrId > 0" />
                            </h3>
                            <p>【<span>{{item.schoolMc}}</span>】<span>{{item.newDate}}</span>学年</p>
                            <div class="clearfix">
                                <div class="item_box left clearfix">
                                    <img v-if="item.sqzt == -1" src="/static/img/icon_student_i.png" alt="">
                                    <img v-else src="/static/img/icon_student_n.png" alt="">
                                    <span>{{item.studentXm}}</span>
                                </div>
                                <div class="time right">
                                    {{item.createTime&&item.createTime.split(' ')[0]}}
                                </div>
                            </div>
                            <div class="shzt">
                                <!-- <img v-if="item.sqzt == 1" src="/static/img/label_dsh.png" alt=""> -->
                                <img v-if="item.sqzt == 1" src="/static/img/label_shz.png" alt="">
                                <img v-else-if="item.sqzt == 2" src="/static/img/label_shtg.png" alt="">
                                <img v-else-if="item.sqzt == 3" src="/static/img/label_fsz.png" alt="">
                                <img v-else-if="item.sqzt == 4" src="/static/img/label_fstg.png" alt="">
                                <img v-else src="/static/img/label_shwtg.png" alt="">
                            </div>

                            <div class="btn_box">
                                <div class="ff_l">
                                    <span v-if="(item.sqzt == 2 || item.sqzt == 4) && item.ffzt == 0" class="ff_color1">待发放</span>
                                    <span v-else-if="(item.sqzt == 2 || item.sqzt == 4) && item.ffzt == 1" class="ff_color2">已发放</span>
                                    <!-- <span v-else-if="(item.sqzt == 2 || item.sqzt == 4) && item.ffzt == 2" class="ff_color2">已到账</span> -->
                                </div>
                                <div class="ff_r">
                                    <div class="ff_r_btn" @click="setId(item)">申请详情</div>
                                    <div class="ff_r_btn" v-if="item.sqzt == -1 && item.fsbj == 0" @click="sqEdit(item)">发起复议</div>
                                    <div v-if="(item.sqzt == 2 || item.sqzt == 4) && item.ffzt == 1" class="ff_r_btn" @click="ffxq(item)">发放详情</div>
                                    <div class="ff_r_btn ff_color1" v-if="((item.sqzt == 2 || item.sqzt == 4) && item.ffzt == 1) && item.qrff == 0"
                                        @click="qrdz(item.id)">确认到账</div>
                                </div>
                            </div>

                        </li>
                    </ul>
                </van-list>
            </div>

            <!-- 添加按钮 -->
            <div class="add_btn" @click="hangleShow">
                <div class="submit_btn">+</div>
            </div>
            <!-- 点击添加按钮显示的内容 -->
            <div class="popup" v-if="flag">
                <div class="popup_top" @click="gotoOtherApply()">
                    <img src="/static/img/drsq_icon.png" alt="">
                    <p>为他人代申请</p>
                </div>
                <div class="popup_bor"></div>
                <div class="popup_bottom" @click="gotoLink('/xzlx')">
                    <img src="/static/img/sq_icon.png" alt="">
                    <p>为自己申请</p>
                </div>
            </div>
            <div class="graphical" v-if="flag"></div>
            <!-- 用于撑开最下方的定位高度 -->
            <div v-if="list.length>2" style="height: 1.2rem;,width: 100%;">

            </div>

        </div>

        <!-- 没数据时 -->
        <div class="home home_bg" v-else>
            <div class="noda_img" style="overflow: hidden;">
                <img src="/static/img/img_index2.png" alt="">
            </div>
            <div class="mysqjl">
                <img src="/static/img/text_index.png" alt="">
            </div>
            <div class="wysq">
                <button @click="gotoLink('/xzlx')" class="submit_btn">我要申请</button>
                <button @click="gotoOtherApply()" class="submit_btn">为他人代申请</button>
            </div>
            <div class="wysq_text">
                查看《申请条件》
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: null,
                loading: false, //旋转动画
                finished: false, //出现没有更多了
                error: false, //请求失败
                flag: false, //弹出框显示隐藏
                pageTion: {
                    pageLimit: 10,
                    currPage: 1
                },
                submitFlag: false,
            }
        },
        mounted() {
            this.getData()
        },
        methods: {

            //自动加载数据
            onLoad() {
                this.pageTion.currPage = this.pageTion.currPage + 1;
                // 加载状态结束
                let _this = this;
                _this.getData();
            },
            //获取首页收据
            getData() {
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    loadingType: 'spinner',
                    duration: 0,
                });
                let _this = this;
                let arr = []
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'zzsq/index',
                        data: _this.pageTion,
                    }).then(function(json) {
                        let list = [];
                        if (json.data.data.count > 0 && json.data.data.count == 10) {
                            // 加载状态结束
                            arr = _this.changeTime('createTime', json.data.data.data, 'newDate')
                            for (let i = 0; i < arr.length; i++) {
                                list.push(arr[i]);
                            }
                            _this.loading = false;
                        } else if (json.data.data.count > 0 && json.data.data.count < 10) {
                            // 数据全部加载完成
                            arr = _this.changeTime('createTime', json.data.data.data, 'newDate')
                            for (let i = 0; i < arr.length; i++) {
                                list.push(arr[i]);
                            }
                            _this.loading = false;
                            _this.finished = true;
                        } else {
                            _this.finished = true;
                        }
                        _this.list = list;




                        _this.$toast.clear();
                    })
                    .catch(function(error) {
                        console.log(error);
                        _this.$toast.clear();
                    });
            },
            //时间修改
            changeTime(targetKeyName, arr, newKeyName) {
                for (let i of arr) {
                    if (i[targetKeyName] != null) {
                        let returnStr = Number(i[targetKeyName].slice(0, 4))
                        let m = i[targetKeyName].slice(5, 7)
                        m = Number(m)
                        if (m >= 9) returnStr = `${returnStr}-${returnStr + 1}`
                        else returnStr = `${returnStr - 1}-${returnStr}`

                        i[newKeyName] = returnStr
                    }
                }

                return arr
            },
            //跳转详情
            setId(item) {
                // let url = item.sqzt == 3 ? '/listdetail' : item.sqzt == -1 ? '/listdetailtwo' : item.sqzt == 2 ? '/listdetailthree' : ''
                this.$router.push({
                    path: '/listdetailthree',
                    query: {
                        id: item.id
                    }
                })
            },
            // 跳转发放详情
            ffxq(item) {
                this.$router.push({
                    path: '/ffxq',
                    query: {
                        id: item.id,
                        newDate: item.newDate,
                        reserved1: item.zzzcMc,
                        qrff: item.qrff
                    }
                })
            },
            //为他人申请
            gotoOtherApply() {
                //清空之前存的信息
                try {
                    localStorage.xm = '';
                    localStorage.sjh = '';
                    localStorage.sfz = '';
                    localStorage.schoolLb = null;
                    localStorage.scxdPickerVal = '';
                } catch (e) {};
                this.$router.push({
                    path: '/loginafterwrite',
                    query: {
                        db: '1',
                    }
                });
            },
            //跳转
            gotoLink(name) {
                this.$router.push(name);
            },
            // 显示弹出框
            hangleShow() {
                this.flag = !this.flag;
            },
            handleReset() {
                this.$refs.esign.reset()
            },
            handleGenerate() {
                this.$refs.esign.generate().then(res => {
                    this.resultImg = res;
                    console.log(this.resultImg)
                }).catch(err => {
                    alert(err) // 画布没有签字时会执行这里 'Not Signned'
                })
            },
            // 确认到账
            qrdz(id) {
                let _this = this
                _this.$dialog.confirm({
                    title: '确认到账',
                    message: '是否确认到账'
                }).then(() => { 
                    _this.$toast.loading({
                        message: '确认中...',
                        forbidClick: true,
                        duration: 0,
                    });

                    if(_this.submitFlag) return;
                    _this.submitFlag = true;
                    _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'my/acc',
                        data: {
                            zzsqId: id
                        },
                    }).then(json => {
                        _this.$toast.clear();
                        if (json.data.result === 200) {

                            setTimeout(()=>{ // 防重
                                _this.submitFlag = false;
                            }, 2000);

                            _this.$dialog.alert({
                                message: '您已确认到账'
                            }).then(() => {
                                _this.getData()
                            })
                        } else {
                            _this.submitFlag = false;
                        }
                    }).catch(function(error) {
                        _this.submitFlag = false;
                        _this.$toast.clear();
                        console.log(error);
                    });
                }).catch(() => {

                });
                
                
            },
            //申请编辑
            sqEdit(item) {
                let _this = this
                let queryData = {
                    zzsqId: item.id,
                    zzzcId: item.zzzcId
                }
                if(item.dbrId > 0) {
                    queryData.db = '1'
                }
                _this.$dialog.confirm({
                    title: '发起复议',
                    message: '仅有一次申请复议的机会，请仔细如实填报申请信息'
                }).then(() => { 
                    this.$router.push({
                        path: '/qrsf',
                        query: queryData,
                    });
                }).catch(() => {

                });
                
            },
        }
    }
</script>

<style scoped>
    .page-box {
        flex: 1;
        display: flex;
        flex-direction: column;
    }





    .btn_box {
        display: flex;
        justify-content: space-between;
        padding-top: 0.6rem;
    }

    .ff_l {
        display: flex;
        align-items: center;
    }

    .ff_r {
        display: flex;
    }

    .ff_r_btn {
        width: 1.6rem;
        height: 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        border: 1px solid #CFCFCF;
        color: #A7A7A6;
        margin-left: 0.2rem;
    }

    .btn_box .ff_color1 {
        color: #CAAC73;
        border-color: #CAAC73;
    }

    .btn_box .ff_color2 {
        color: #1D5687;
    }





    .wysq_text {
        color: #636BF6;
        text-align: center;
    }

    .wysq {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 .3rem .3rem;
    }

    .wysq>.submit_btn:last-child {
        margin-left: .3rem;
    }

    .mysqjl {
        width: 5.07rem;
        margin: 8% auto 8%;
    }

    .mysqjl img {
        width: 100%;
        height: auto;
    }

    .noda_img img {
        width: 100%;
        height: auto;
        border-radius: 0.2rem 0.2rem 0 0;
    }

    .posi {
        width: 100%;
        height: 1rem;
        background-color: #EEEEEE;
        position: fixed;
        bottom: 0.4rem;
        left: 0;
    }

    .add_btn {
        position: fixed;
        right: 0.5rem;
        height: 1.3rem;
        width: 1.3rem;
        bottom: 2rem;
    }

    .add_btn>.submit_btn {
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 0.8rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 1.3rem;
    }

    .home {
        background-color: #EEEEEE;
        min-height: 100%;
    }

    .home_bg {
        flex: 1;
        margin: 10px 0.3rem;
        background-color: #FFFFFF;
        border-radius: 0.2rem;
    }

    .list_data {
        padding: 0 0.3rem;
    }

    .list_data li {
        background-color: #FFFFFF;
        margin-bottom: 0.3rem;
        padding: 0.4rem 0.3rem;
        border-radius: 0.1rem;
        color: #1D5687;
        position: relative;
    }

    .list_data .defaut {
        color: #DADADA;
    }

    .list_data li>h3 {
        font-size: 0.36rem;
    }
    .list_data li .item-title{
        padding-right: 1.4rem;
    }
    .list_data li .item-title .db-icon{
        display: inline-block;
        height: .36rem;
        vertical-align: baseline;
    }

    .list_data li>p {
        font-size: 0.24rem;
        margin: 0.25rem 0 0.25rem -0.1rem;
    }

    .item_box img {
        width: 0.38rem;
        height: 0.42rem;
    }

    .item_box span {
        display: inline-block;
        line-height: 0.42rem;
        font-size: 0.32rem;
        margin-left: 0.1rem;
    }

    .time {
        line-height: 0.42rem;
        color: #171520;
        font-size: 0.24rem;
    }

    .defaut .time {
        color: #DADADA;
    }

    .shzt {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
    }

    .shzt img {
        width: 1.3rem;
        height: auto;
    }

    /* 按钮弹出框 */
    .popup {
        background-color: #1F1F25;
        border-radius: .2rem;
        position: fixed;
        right: 0.3rem;
        height: 2.01rem;
        width: 2.8rem;
        bottom: 3.6rem;
    }

    .popup_top {
        height: 50%;
        display: flex;
        align-items: center;
        /* opacity:0.2; */
    }

    .popup_top>img {
        width: .41rem;
        height: .48rem;
        padding-left: 0.19rem;
    }

    .popup_top>p {
        font-size: .26rem;
        color: #fff;
        padding-left: 0.27rem;
    }

    .popup_bor {
        width: 2.8rem;
        height: .01rem;
        background-color: #fff;
        opacity: 0.2;
    }

    .popup_bottom {
        height: 50%;
        display: flex;
        align-items: center;
    }

    .popup_bottom>img {
        width: .41rem;
        height: .48rem;
        padding-left: 0.19rem;
    }

    .popup_bottom>p {
        font-size: .26rem;
        color: #fff;
        padding-left: 0.27rem;
    }

    .graphical {
        position: fixed;
        right: 1rem;
        height: .28rem;
        border-left: .18rem solid transparent;
        border-right: .18rem solid transparent;
        border-top: .18rem solid #1F1F25;
        bottom: 3.2rem;
    }
</style>
