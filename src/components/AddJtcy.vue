<!-- 添加家庭成员 -->
<template>
    <div class="page page-fixed" @touchmove.prevent>
        <div class="section-content">
            <div class="item-title" :class="nameError?'error':''">家庭成员姓名</div>
            <div class="item-content">
                <van-field v-model="jtcyData.xm" class="input-box" label="" placeholder="家庭成员姓名" maxlength="10" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="ageError?'error':''">年龄</div>
            <div class="item-content">
                <van-field v-model="jtcyData.nl" type="digit" class="input-box" label="" placeholder="家庭成员年龄" maxlength="3" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="ageError?'error':''">身份证</div>
            <div class="item-content">
                <van-field v-model="jtcyData.sfz" type="digit" class="input-box" label="" placeholder="家庭成员身份证" maxlength="18" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="relationError?'error':''">称谓</div>
            <div class="item-content">
                <van-field class="input-box" readonly label :value="jtcyData.relationship" placeholder="称谓" @click="brgx = true" />
                <van-popup v-model="brgx" position="bottom">
                    <van-picker show-toolbar :columns="brgxList" value-key="name" @cancel="brgx = false" @confirm="brgxadd" />
                </van-popup>
            </div>
            <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
        </div>
        <div class="section-content">
            <div class="item-title">工作或学习单位</div>
            <div class="item-content">
                <van-field v-model="jtcyData.dw" class="input-box" label="" placeholder="工作或学习单位" maxlength="20" />
            </div>
        </div>
		<div class="section-content">
		    <div class="item-title">联系方式</div><!-- :class="isPhoneError?'error':''" -->
		    <div class="item-content">
		        <van-field v-model="jtcyData.sjh" class="input-box" type="digit" label="" placeholder="联系方式" maxlength="11" />
		    </div>
		</div>

        <div class="btn-box">
            <button class="submit_btn" @click="saveJtcy">保存此家庭成员</button>
            <button class="del_btn" v-if="isEdit" @click="showDelPop = true">删除此家庭成员</button>
            <!-- 删除确认弹窗 -->
            <van-popup v-model="showDelPop" position="bottom">
                <div class="del-pop-box">
                    <div class="del-pop-header">
                        <div class="del-pop-title">删除后无法恢复，确定要删除吗？</div>
                        <div class="btn-del" @click="delJtcy">删除</div>
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
            jtcyData: Object,
        },
        data() {
            return {
                //表单验证
                nameError: false,
                ageError: false,
                relationError: false,
				// isPhoneError: false,
                //删除弹窗
                showDelPop: false,
                brgx: false,
                brgxList: []
            }
        },
        methods: {
            goBack() {
                //console.log("点击了浏览器的返回按钮");
                this.$emit('hideAddJtcy');
            },
            //保存家庭成员
            saveJtcy(){
                let data = this.jtcyData;
                //填写错误提示
                this.nameError = data.xm == '' ? true : false;
                this.ageError = data.nl == '' ? true : false;
                this.relationError = data.relationship == '' ? true : false;
                this.sfzError = data.sfz == '' ? true : false;

				// let reg = /^1[2-9][0-9]{9}$/;
				// this.isPhoneError = !reg.test(data.sjh);
                // || this.isPhoneError
                if(this.nameError || this.ageError || this.relationError || this.sfzError){
                    this.$dialog.confirm({
                      title: '信息不完整',
                      message: '填完表格所有信息后才能提交'
                    }).then(() => {

                    }).catch(() => {

                    });
                    return;
                }
                // 如果填了校验
                let sfzReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
                if (!!data.sfz && !sfzReg.test(data.sfz)) {
                    this.$toast('请输入正确的身份证号');
                    return;
                }
                let phoneReg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
                if (!!data.sjh && !phoneReg.test(data.sjh)) {
                    this.$toast('请输入正确的电话号码');
                    return;
                }
                this.$emit('saveJtcy', data);
            },
            //删除事件
            delJtcy(){
                this.$emit('delJtcy');
            },
            brgxadd(val){
                this.brgx = false
                this.jtcyData.relationship = val.name
            },
            getbrgxList(){
                let _this = this;
                _this.$http({
                    method: "post",
                    url: PUBLICURL + "system/selectByParentCode",
                    data: {parentCode: 278}
                }).then(function(json) {
                    _this.brgxList = json.data.data
                })
            }

        },
        mounted() {
            // 向历史记录中插入了当前页并监听浏览器返回
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }
            this.getbrgxList()
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
