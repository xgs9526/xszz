<!-- 添加获奖情况 -->
<template>
    <div class="page page-fixed" @touchmove.prevent>
        <div class="section-content">
            <div class="item-title" :class="prizeTypeError?'error':''">奖项类型</div>
            <div class="item-content">
                <van-field class="input-box" readonly label="" :value="hjqkData.prizeType" placeholder="请选择"
                    @click="showPrizeTypePicker = true" />
                <van-popup v-model="showPrizeTypePicker" position="bottom">
                    <van-picker show-toolbar :columns="prizeTypeColumns" @cancel="showPrizeTypePicker = false"
                        @confirm="prizeTypePickerChange" />
                </van-popup>
            </div>
            <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
        </div>
        <div class="section-content">
            <div class="item-title" :class="isNameError?'error':''">获奖名称</div>
            <div class="item-content">
                <van-field v-model="hjqkData.name" class="input-box" label="" placeholder="所获奖项的名称" maxlength="20" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="isPrizefromError?'error':''">颁奖单位</div>
            <div class="item-content">
                <van-field v-model="hjqkData.prizeFrom" class="input-box" label="" placeholder="颁发奖项的单位" maxlength="20" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="isTimeError?'error':''">获奖日期</div>
            <div class="item-content">
                <van-field class="input-box" readonly label="" :value="hjqkData.time" placeholder="获奖日期" @click="showTimePicker = true" />
                <van-popup v-model="showTimePicker" position="bottom">
                    <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @cancel="showTimePicker = false" @confirm="timePickerChange" />
                </van-popup>
            </div>
            <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
        </div>
        <div class="btn-box">
            <button class="submit_btn" @click="saveHjqk">保存此获奖情况</button>
            <button class="del_btn" v-if="isEdit" @click="showDelPop = true">删除此获奖情况</button>
            <!-- 删除确认弹窗 -->
            <van-popup v-model="showDelPop" position="bottom">
                <div class="del-pop-box">
                    <div class="del-pop-header">
                        <div class="del-pop-title">删除后无法恢复，确定要删除吗？</div>
                        <div class="btn-del" @click="delHjqk">删除</div>
                    </div>
                    <div class="btn-cannel" @click="showDelPop = false">取消</div>
                </div>
            </van-popup>
        </div>

    </div>
</template>

<script>
    import {formatDate} from '@/common/date'
    export default {
        props: {
            isEdit: Boolean,
            hjqkData: Object,
        },
        data() {
            return {
                //奖项类型选择器
                showPrizeTypePicker: false,
                prizeTypeColumns: ['国家级', '省级'],
                //选择获奖日期
                showTimePicker: false,
                minDate: new Date(2000, 0, 1),
                maxDate: new Date(),
                currentDate: new Date(),

                //表单验证
                prizeTypeError: false,
                isNameError: false,
                isPrizefromError: false,
                isTimeError: false,

                //删除弹窗
                showDelPop: false,
            }
        },
        methods: {
            goBack() {
                //console.log("点击了浏览器的返回按钮");
                this.$emit('hideAddHjqk');
            },
            //奖项类型选择器
            prizeTypePickerChange(value) {
                this.hjqkData.prizeType = value;
                this.showPrizeTypePicker = false;
            },
            //选择日期
            timePickerChange(value){
                this.hjqkData.time = formatDate(value, 'yyyy.MM.dd');
                this.showTimePicker = false;
                // console.log(value)
                // console.log(new Date(formatDate(value, 'yyyy.MM.dd')))
            },
            //保存获奖情况
            saveHjqk(){
                let data = this.hjqkData;
                //填写错误提示
                this.prizeTypeError = data.prizeType == '' ? true : false;
                this.isNameError = data.name == '' ? true : false;
                this.isPrizefromError = data.prizeFrom == '' ? true : false;
                this.isTimeError = data.time == '' ? true : false;

                if(this.prizeTypeError || this.isNameError || this.isPrizefromError || this.isTimeError){
                    this.$dialog.confirm({
                      title: '信息不完整',
                      message: '填完表格所有信息后才能提交'
                    }).then(() => {

                    }).catch(() => {

                    });
                    return;
                }
                this.$emit('saveHjqk', data);
            },
            //删除事件
            delHjqk(){
                this.$emit('delHjqk');
            },

        },
        mounted() {
            //编辑的时候，当前时间赋值
            if(this.isEdit){
                //ios new Date()只支持/分隔
                let currentDate = this.hjqkData.time.replace(/\./g, '/')
                this.currentDate = new Date(currentDate);
            }
            // 向历史记录中插入了当前页并监听浏览器返回
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
        },
        beforeCreate () {
          // document.querySelector('body').setAttribute('style', 'overflow:hidden')
        },
        beforeDestroy () {
          // document.querySelector('body').removeAttribute('style')
        },
        destroyed() {
            //console.log("移除了监听");
            window.removeEventListener('popstate', this.goBack, false);
        },

    }
</script>

<style scoped>
    /* 删除弹窗 */
    .del-pop-box{
        width: 7.88rem;
        margin: 0 auto;
        padding-bottom: .6rem;
        text-align: center;
    }
    .del-pop-header{

        border-radius: .25rem;
        background-color: #fff;
    }
    .del-pop-title{
        height: .9rem;
        line-height: .9rem;
        border-bottom: 1px solid #B1B3B3;
        color: #9A9A9A;
        font-size: .28rem;
    }
    .btn-del{
        height: 1.14rem;
        line-height: 1.14rem;
        color: #FF3A2F;
        font-size: .34rem;
    }
    .btn-cannel{
        height: 1.14rem;
        line-height: 1.14rem;
        border-radius: .25rem;
        background-color: #fff;
        color: #3478F6;
        font-size: .34rem;
        font-weight: bold;
        margin-top: .15rem;
    }
    /* 覆盖vant弹窗的白色背景 */
    .btn-box .van-popup{
        background-color: transparent !important;
    }

    .page {
        min-height: 100vh;
        background-color: #fff;
    }
    .page-fixed{
        width: 100%;
        position: fixed;
        z-index: 9;
        top: 0;
    }

    .section-content {
        position: relative;
        margin-top: .5rem;
    }

    .section-content:first-child {
        margin-top: 0;
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

    .picker-arrow {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }

    .btn-box {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        width: 4.5rem;
        margin-left: -2.25rem;
    }
    .del_btn{
        margin-top: 1rem;
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
