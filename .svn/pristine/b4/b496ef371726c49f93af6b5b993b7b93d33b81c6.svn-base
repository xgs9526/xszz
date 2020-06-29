<!-- 国家奖学金申请第二步填写信息 -->
<template>
    <div>
        <div class="page-box">
            <div class="page">
                <div class="section">
                    <div class="section-title">学习情况</div>
                    <div class="section-content">
                        <div class="item-title" :class="pmError||zrsError?'error':''">成绩排名</div>
                        <div class="item-content">
                            <van-field v-model="pm" class="input-box half" type="digit" label="" placeholder="校级排名"  maxlength="6" />
                            <span class="separator">/</span>
                            <van-field v-model="zrs" class="input-box half" type="digit" label="" placeholder="总人数" maxlength="6" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="bxkError?'error':''">必修课（门）</div>
                        <div class="item-content">
                            <van-field v-model="bxk" class="input-box" type="digit" label="" placeholder="必修课共几门" maxlength="2" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="jgysError?'error':''">及格以上</div>
                        <div class="item-content">
                            <van-field v-model="jgys" class="input-box" type="digit" label="" placeholder="必修课及格以上几门" maxlength="2" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title">综合考评</div>
                        <div class="item-content">
                            <van-field class="input-box" readonly label="" :value="zhkpPickerVal" placeholder="是否实行综合考评排名"
                                @click="showZhkpPicker = true" />
                            <van-popup v-model="showZhkpPicker" position="bottom">
                                <van-picker show-toolbar :columns="zhkpColumns" @cancel="showZhkpPicker = false"
                                    @confirm="zhkpPickerChange" />
                            </van-popup>
                        </div>
                        <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                    </div>
                    <div class="section-content" v-if="isShowZhkpInput">
                        <div class="item-title" :class="isShowZhkpInput&&(zhkppmError||zhkpzrsError)?'error':''">综合考评排名</div>
                        <div class="item-content">
                            <van-field v-model="zhkppm" class="input-box half" type="digit" label="" placeholder="综合考评排名" maxlength="6" />
                            <span class="separator">/</span>
                            <van-field v-model="zhkpzrs" class="input-box half" type="digit" label="" placeholder="总人数" maxlength="6" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title">获奖情况</div>
                        <div class="item-content">
                            <van-field class="input-box" readonly label="" :value="ishjPickerVal" placeholder="大学期间是否获奖"
                                @click="showIshjPicker = true" />
                            <van-popup v-model="showIshjPicker" position="bottom">
                                <van-picker show-toolbar :columns="ishjColumns" @cancel="showIshjPicker = false"
                                    @confirm="ishjPickerChange" />
                            </van-popup>
                        </div>
                        <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                    </div>
                    <div class="section-content prize-box" v-if="isShowhjqk">
                        <div class="prize-top">
                            <div class="section-title">大学期间获奖情况<span class="sub-title">（最多添加5项）</span></div>
                            <div class="add-btn" v-if="prizeData.length < 5" @click="addHjqkClick">添加</div>
                        </div>
                        <div class="prize-list" v-if="prizeData && prizeData.length > 0">
                            <div class="prize-item" v-for="(item, idx) in prizeData" :key="idx" @click="editHjqk(item, idx)">
                                <div class="item-left">
                                    <i class="icon-medal"></i>
                                    <div class="prize-content">
                                        <p class="prize-title">【{{item.prizeType}}】{{item.name}}</p>
                                        <p class="prize-time"><span>{{item.time}}</span><span>{{item.prizeFrom}}【颁】</span></p>
                                    </div>
                                </div>
                                <i class="icon-edit"></i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title" :class="applyReasonError?'error':''">申请理由<span class="sub-title">（200字）</span></div>
                    <van-field v-model="applyReason" rows="2" autosize clearable class="input-box"
                        type="textarea" label="" placeholder="申请理由" />
                </div>
                <div class="autograph" :class="autographImgUrl ? '' : 'autograph-center'" @click="showAutograph">
                    <img :class="autographImgUrl ? 'autograph-img' : 'autograph-defult-img'" :src="autographImgUrl ? autographImgUrl : '/static/img/text_autograph.png'" />
                    <div class="autograph-time">
                        <span>签名时间</span>
                        <div class="time">
                            <span>{{autographYear}}</span>年
                            <span>{{autographMonth}}</span>月
                            <span>{{autographDay}}</span>日
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <button class="submit_btn" @click="handleSubmitClick">提交</button>
                </div>
            </div>

        </div>
        <!-- 添加获奖情况组件 -->
        <add-hjqk v-if="isShowAddHjqk" @hideAddHjqk="hideAddHjqk" @saveHjqk="saveHjqk" @delHjqk="delHjqk" :isEdit="isEdit" :hjqkData="hjqkData"></add-hjqk>
        <!-- 签名 -->
        <autograph v-if="isShowAutograph" @hideAutograph="hideAutograph" @saveAutograph="saveAutograph"></autograph>
    </div>
</template>

<script>
    import AddHjqk from '@/components/AddHjqk'
    import Autograph from '@/components/Autograph'
    import {formatDate} from '@/common/date'
    export default {
        components: {
            AddHjqk,
            Autograph,
        },
        data() {
            return {
                //文本框字段
                pm: '',
                zrs: '',
                bxk: '',
                jgys: '',
                zhkppm: '',
                zhkpzrs: '',
                //申请理由
                applyReason: '',
                //校验字段
                pmError: false,
                zrsError: false,
                bxkError: false,
                jgysError: false,
                zhkppmError: false,
                zhkpzrsError: false,
                applyReasonError: false,

                //综合考评选择器
                zhkpPickerVal: '',
                showZhkpPicker: false,
                zhkpColumns: ['是', '否'],
                isShowZhkpInput: false,
                //获奖情况选择器
                ishjPickerVal: '',
                showIshjPicker: false,
                ishjColumns: ['是', '否'],
                isShowhjqk: false,
                //获奖情况内容列表
                prizeData: [],
                //添加获奖情况组件显示隐藏
                isShowAddHjqk: false,
                //是否编辑获奖情况
                isEdit: false,
                //编辑获奖情况数据
                hjqkData: {
                    prizeType: '',
                    name: '',
                    prizeFrom: '',
                    time: '',
                },
                //编辑的获奖情况下标
                currentIdx: 0,
                //签名
                isShowAutograph: false,
                autographImgUrl: '',
                autographYear: '',
                autographMonth: '',
                autographDay: '',
            }
        },
        methods: {
            //综合考评选择器
            zhkpPickerChange(value) {
                this.isShowZhkpInput = value == '是' ? true : false;
                this.zhkpPickerVal = value;
                this.showZhkpPicker = false;
            },
            //获奖情况选择器
            ishjPickerChange(value) {
                this.isShowhjqk = value == '是' ? true : false;
                this.ishjPickerVal = value;
                this.showIshjPicker = false;
            },
            //添加获奖情况按钮事件
            addHjqkClick() {
                //清空添加获奖情况页面内容
                this.clearHjqkData();

                this.isEdit = false;
                document.title = '添加获奖情况';
                this.isShowAddHjqk = true;
            },
            //编辑按钮事件
            editHjqk(data, idx) {
                this.currentIdx = idx;
                this.isEdit = true;
                this.hjqkData = data;
                document.title = '编辑获奖情况';
                this.isShowAddHjqk = true;
            },
            //添加获奖情况页面隐藏
            hideAddHjqk() {
                document.title = '国家奖学金申请';
                this.isShowAddHjqk = false;
            },
            //添加获奖情况
            saveHjqk(data) {
                if(this.isEdit){
                    let idx = this.currentIdx;
                    this.prizeData[idx] = data;
                }else{
                    this.prizeData.push(data);
                }

                //添加获奖情况页面隐藏
                this.hideAddHjqk();
            },
            //删除
            delHjqk(){
                let idx = this.currentIdx;
                this.prizeData.splice(idx, 1);
                //添加获奖情况页面隐藏
                this.hideAddHjqk();
            },
            //清空添加获奖情况页面内容
            clearHjqkData(){
                let data = {
                    prizeType: '',
                    name: '',
                    prizeFrom: '',
                    time: '',
                }
                this.hjqkData = data;
            },
            //显示签名组件
            showAutograph() {
                document.title = '手动签名';
                this.isShowAutograph = true;
            },
            //隐藏签名组件
            hideAutograph() {
                document.title = '国家奖学金申请';
                this.isShowAutograph = false;
            },
            //保存签名
            saveAutograph(imgUrl, date){
                this.autographImgUrl = imgUrl;
                this.autographYear = formatDate(date, 'yyyy');
                this.autographMonth = formatDate(date, 'MM');
                this.autographDay = formatDate(date, 'dd');
                this.hideAutograph();
            },
            //提交
            handleSubmitClick(){
                //填写错误提示
                this.pmError = this.pm == '' ? true : false;
                this.zrsError = this.zrs == '' ? true : false;
                this.bxkError = this.bxk == '' ? true : false;
                this.jgysError = this.jgys == '' ? true : false;
                this.zhkppmError = this.zhkppm == '' ? true : false;
                this.zhkpzrsError = this.zhkpzrs == '' ? true : false;
                this.applyReasonError = this.applyReason.length < 200 ? true : false;

                if(this.pmError || this.zrsError || this.bxkError || this.jgysError || this.isShowZhkpInput&&(this.zhkppmError || this.zhkpzrsError)){
                    this.$dialog.confirm({
                      title: '信息不完整',
                      message: '填完表格所有信息后才能提交'
                    }).then(() => {

                    }).catch(() => {

                    });
                    return;
                }
                if(this.applyReasonError){
                    this.$toast('申请理由至少输入200字');
                    return;
                }
                if(this.autographImgUrl = ''){
                    this.$toast('您还没有签名');
                    return;
                }
                this.$dialog.confirm({
                  title: '确定提交吗？',
                  message: '提交后内容不可修改'
                }).then(() => {
                    this.$router.push('/gjjxjsqtjcg');
                }).catch(() => {

                });
            }

        },
        mounted() {

        },
    };
</script>

<style scoped>
    .page-box{
        position: relative;
        z-index: 0;
    }
    .page {
        padding: .3rem .3rem .8rem;
        box-sizing: border-box;
    }

    .section {
        width: 100%;
        box-sizing: border-box;
        padding: .4rem .3rem 0;
        background-color: #fff;
        box-shadow: 0 0 .15rem 0 rgba(237, 237, 238, 0.8);
        border-radius: .1rem;
        margin-top: .3rem;
    }

    .section:first-child {
        margin-top: 0;
    }

    .section-title {
        font-weight: bold;
        color: #171520;
        font-size: .36rem;
    }

    .sub-title {
        font-weight: normal;
        font-size: .3rem;
    }

    .section-content {
        position: relative;
        margin-top: .5rem;
    }

    .item-title {
        color: #1D5687;
        font-size: .28rem;
    }
    .error{
        color: #FF5757;
    }

    .item-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .input-box {
        padding: .3rem 0 .42rem;
        color: #171520;
        font-size: .32rem;
        font-weight: bold;
        border-bottom: #eee 1px solid;
    }

    .section-content:last-child .input-box {
        border-bottom: none;
    }

    .half {
        width: 3.2rem;
    }

    .separator {
        margin: -.12rem .3rem 0;
        font-size: .4rem;
    }

    .picker-arrow {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }

    .prize-box {
        padding-bottom: .6rem;

    }

    .prize-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .add-btn {
        width: .88rem;
        height: .46rem;
        text-align: center;
        line-height: .46rem;
        font-size: .24rem;
        color: #636BF6;
        border: 1px solid #636BF6;
        border-radius: .23rem;
    }

    .prize-list {
        margin-top: .6rem;

    }

    .prize-item {
        margin-bottom: .6rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #1D5687;
    }

    .prize-item:last-child {
        margin-bottom: 0;
    }

    .icon-edit {
        width: .26rem;
        height: .25rem;
        background: url(/static/img/icon_edit.png) no-repeat;
        background-size: 100%;
    }

    .item-left {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .icon-medal {
        width: .34rem;
        height: .4rem;
        margin-right: .18rem;
        background: url(/static/img/icon_medal.png) no-repeat;
        background-size: 100%;
    }

    .prize-content {
        line-height: 1;
        flex: 1;
    }

    .prize-title {
        margin-bottom: .2rem;
        font-size: .32rem;
        font-weight: bold;
        width: 5.5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .prize-time {
        font-size: .24rem;
        width: 6rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .prize-time span:last-child {
        margin-left: .4rem;
    }

    .autograph {
        /* width: 7.68rem; */
        height: 2.5rem;
        background: url(/static/img/bg_autograph.png) no-repeat;
        margin-top: .3rem;
        display: flex;

        position: relative;
        z-index: 0;
    }
    .autograph-center{
        align-items: center;
        justify-content: center;
    }
    .autograph-defult-img{
        width: 2.94rem;
    }
    .autograph-img {
        display: block;
        height: 2.5rem;

    }

    .autograph-time {
        position: absolute;
        bottom: .2rem;
        right: .2rem;
        text-align: right;
        font-size: .24rem;
        line-height: 1;
        z-index: 9;
    }

    .time {
        margin-top: .2rem;
    }

    .time span {
        display: inline-block;
        min-width: .48rem;
        border-bottom: 1px solid #171520;
        margin-right: .05rem;
        text-align: center;
    }

    .btn-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .5rem;
    }

    /* vant组件样式覆盖 */
    .van-cell:not(:last-child)::after {
        display: none;
    }

    >>>.input-box .van-field__control::-webkit-input-placeholder {
        color: #9A9A9A;
        font-weight: normal;
    }
</style>
