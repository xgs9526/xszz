<!-- 注册页 -->
<template>
    <div class="register">
        <div class="register-top">
            <img src="/static/img/img_login.png" />
        </div>
        <div class="register_box" v-if="!isNextStep">
            <div class="ipt-box">
                <img class="icon-ipt" src="/static/img/icon_phone.png" />
                <van-field ref="phone" class="ipt" v-model="phone" type="tel" placeholder="请输入手机号码" label="" maxlength="11"
                    clearable @keyup="regPhone" />
            </div>
            <div class="ipt-box">
                <img class="icon-ipt" src="/static/img/icon_verification.png" />
                <van-field ref="yzm" class="ipt" v-model="yzm" placeholder="请输入图形验证码" label="" maxlength="4" />
                <img class="txyzm" :src="yzmImg" @click="getYzm" />
            </div>
            <div class="ipt-box">
                <img class="icon-ipt" src="/static/img/icon_dxyzm.png" />
                <van-field ref="dxyzm" class="ipt" v-model="dxyzm" placeholder="请输入短信验证码" label="" maxlength="4" />
                <button @click="sendYzm" class="submit_btn dxyzm" :class="!isSendYzm?'half-transparent':''">{{!isSendYzm?'获取验证码':times+'s后重发'}}</button>
            </div>
        </div>
        <div class="register_box" v-else>
            <div class="ipt-box no-border">
                <img class="icon-ipt" src="/static/img/icon_phone.png" />
                <div class="ipt">账号：{{phone}}</div>
            </div>
            <div class="ipt-box">
                <van-field ref="password" class="ipt no-padding-lr" v-model="password" :type="!pwdEyeOpen?'password':'text'" placeholder="设置密码" label="" maxlength="18" />
                <van-icon @click="pwdEyeClick" class="icon-eye" :color="!pwdEyeOpen?'#8c898d':'#646cf2'" name="eye" size=".4rem" />
            </div>
            <div class="ipt-box">
                <van-field ref="cpassword" class="ipt no-padding-lr" v-model="cpassword" :type="!cpwdEyeOpen?'password':'text'" placeholder="确认密码" label="" maxlength="18" />
                <van-icon @click="cpwdEyeClick" class="icon-eye" :color="!cpwdEyeOpen?'#8c898d':'#646cf2'" name="eye" size=".4rem" />
            </div>
        </div>
        <div class="btn-box">
            <button class="submit_btn" @click="handleSubmitClick" :disabled="disabledBtn">{{isNextStep ? '提交' : '下一步'}}</button>
        </div>
        <div class="other-link">
            <span @click="gotoLink('/wjmm')">忘记密码？</span><span @click="gotoLink('/login')">去登录</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phone: '',
                yzm: '',
                dxyzm: '',
                isSendYzm: false,
                timer: null,
                times: 60,
                uuid: '',
                yzmImg: '',

                password: '',
                cpassword: '',
                pwdEyeOpen: false,
                cpwdEyeOpen: false,

                isNextStep: false,
                disabledBtn: false
            }
        },
        created(){
            this.yzmImg = PUBLICURL + 'reg/page?t=' + new Date().getTime()
        },
        destroyed() {
            //页面销毁时清空timer
            //console.log("移除了timer");
            clearInterval(this.timer)
        },
        methods: {
            //提交验证手机号
            submitRegPhone(){
                let phoneReg = /^1[3456789]\d{9}$/;
                if (!phoneReg.test(this.phone)) {
                    return false;
                }
                return true;
            },
            //输入手机号验证
            regPhone(){
                let reg = /[^0-9\s]/g;

                this.phone = this.phone.replace(reg, '');
                if (this.phone.length > 11) {
                    this.phone = this.phone.substring(0, 11)
                }
            },
            // 密码眼睛
            pwdEyeClick(){
                this.pwdEyeOpen = !this.pwdEyeOpen;
            },
            // 确认密码眼睛
            cpwdEyeClick(){
                this.cpwdEyeOpen = !this.cpwdEyeOpen;
            },
            //跳转
            gotoLink(name){
                this.$router.push(name);
            },
            // 下一步或提交事件
            handleSubmitClick(){
                if(!this.isNextStep){
                    this.nextStep();
                }else{
                    this.submitForm();
                }
            },
            // 下一页
            nextStep() {
                let _this = this;
                //手机号
                let regPhoneRes = _this.submitRegPhone();
                if(!regPhoneRes){
                    _this.$dialog.alert({
                        message: '手机号码格式错误，请重新输入'
                    }).then(() => {
                        _this.$refs.phone.focus();
                    });
                    return;
                }
                // 图形验证码
                if (_this.yzm == '') {
                    _this.$dialog.alert({
                        message: '请输入图形验证码'
                    }).then(() => {
                        _this.$refs.yzm.focus();
                    });
                    return;
                }
                //验证短信验证码
                if (_this.dxyzm == '') {
                    _this.$dialog.alert({
                        message: '请输入短信验证码'
                    }).then(() => {
                        _this.$refs.dxyzm.focus();
                    });
                    return;
                }
                _this.$toast.loading({
					message: '提交中...',
					forbidClick: true,
					duration: 0,
                });
                _this.disabledBtn = true
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'reg/checkSms',
                        data: {
                            tel: _this.phone,
                            smsCode: _this.dxyzm,
                        },
                    }).then(function(json) {
                        _this.$toast.clear();
                        if (json.data.result == 200) {

                            setTimeout(()=>{ // 防重
                                _this.disabledBtn = false;
                            }, 2000);


                            _this.isNextStep = true;
                            clearInterval(_this.timer);
                        } else {
                            _this.disabledBtn = false;
                            _this.$dialog.alert({
                                message: json.data.errorcode,
                            })
                        }
                    })
                    .catch(function(error) {
                        this.disabledBtn = false;
                        _this.$toast.clear();
                        console.log(error);
                    });
            },
            // 提交
            submitForm(){
                let _this = this;
                if (_this.password == '') {
                    _this.$dialog.alert({
                        message: '请设置密码'
                    }).then(() => {
                        _this.$refs.password.focus();
                    });
                    return;
                }
                if (_this.cpassword == '') {
                    _this.$dialog.alert({
                        message: '请确认密码'
                    }).then(() => {
                        _this.$refs.cpassword.focus();
                    });
                    return;
                }
                if (_this.password != _this.cpassword) {
                    _this.$dialog.alert({
                        message: '两次密码输入不一致'
                    });
                    return;
                }
                _this.$toast.loading({
					message: '提交中...',
					forbidClick: true,
					duration: 0,
                });
                _this.disabledBtn = true
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'reg/perReg',
                        data: {
                            tel: _this.phone,
                            password: _this.password,
                            cPd: _this.cpassword,
                        },
                    }).then(function(json) {
                         _this.$toast.clear();
                        if (json.data.result == 200) {
                            setTimeout(()=>{ // 防重
                                _this.disabledBtn = false;
                            }, 2000);
                            _this.$dialog.alert({
                                message: '注册成功',
                                confirmButtonText: '去登录'
                            }).then(()=>{
                                _this.$router.push('/login');
                            });
                        } else {
                            _this.disabledBtn = false;
                            _this.$dialog.alert({
                                message: json.data.errorcode,
                            })
                        }
                    })
                    .catch(function(error) {
                        _this.disabledBtn = false;
                         _this.$toast.clear();
                        console.log(error);
                    });
            },
            //获得图形验证码
            getYzm() {
                 this.yzmImg = PUBLICURL + 'reg/page?t=' + new Date().getTime()
            },
            // getYzm() {
            //     let _this = this;
            //     _this.yzm = '';
            //     _this.$http({
            //             method: 'post',
            //             url: PUBLICURL + 'reg/page',
            //         }).then(function(json) {
            //             let yzmData = json.data.data.imgResult;
            //             if (json.data.result == 200) {
            //                 _this.yzmImg = 'data:image/gif;base64,'+ yzmData.img;
            //                 _this.uuid = yzmData.uuid;
            //             } else {
            //                 _this.$dialog.alert({
            //                     message: json.data.errorcode,
            //                 })
            //             }
            //         })
            //         .catch(function(error) {
            //             console.log(error);
            //         });
            // },
            //获得手机短信验证码
            sendYzm() {
                let _this = this;
                if (_this.isSendYzm) return;

                //手机号
                let regPhoneRes = _this.submitRegPhone();
                if(!regPhoneRes){
                    _this.$dialog.alert({
                        message: '手机号码格式错误，请重新输入'
                    }).then(() => {
                        _this.$refs.phone.focus();
                    });
                    return;
                }
                // 图形验证码
                if (_this.yzm == '') {
                    _this.$dialog.alert({
                        message: '请输入图形验证码'
                    }).then(() => {
                        _this.$refs.yzm.focus();
                    });
                    return;
                }
                _this.$toast.loading({
					message: '获取中...',
					forbidClick: true,
					duration: 0,
				});
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'reg/tel',
                    data: {
                        tel: _this.phone,
                        code: _this.yzm,
                        uuid: _this.uuid,
                        cz: 0
                    },
                }).then(function(json) {
                    _this.$toast.clear();
                    if (json.data.result == 200) {
                        _this.isSendYzm = true;
                        _this.timer = setInterval(function() {
                            _this.times--;
                            if (_this.times <= 0) {
                                _this.isSendYzm = false;
                                _this.times = 60;
                                clearInterval(_this.timer);
                            }
                        }, 1000)
                    } else {
                        _this.getYzm();
                        _this.yzm = '';

                        _this.$dialog.alert({
                            message: json.data.errorcode,
                        })
                    }
                })
                .catch(function(error) {
                    _this.$toast.clear();

                    _this.getYzm();
                    _this.yzm = '';

                    console.log(error);
                });

            },
            
        },


    }
</script>

<style scoped>
    .register {
        min-height: 100vh;
        background-color: #fff;
    }

    .register-top img {
        display: block;
        width: 100%;
    }

    .register_box {
        padding: 0 1.04rem;
        margin-top: .9rem;
    }

    .ipt-box {
        margin-top: .25rem;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .25rem 0;
        border-bottom: 1px solid #eee;
    }

    .icon-ipt {
        display: block;
        width: .36rem;
    }

    .ipt-box .ipt {
        flex: 1;
        padding: 0 .34rem;
        color: #171520;
        font-size: .32rem;
        font-weight: bold;
    }
    .ipt-box .ipt.no-padding-lr{
        padding: 0;
    }

    .txyzm {
        position: absolute;
        top: 50%;
        right: 0;
        display: block;
        width: 1.52rem;
        transform: translate(0, -50%);
    }

    .dxyzm {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        width: 1.8rem;
        height: .56rem;
        font-size: .24rem;
        border-radius: .1rem;
    }

    .dxyzm.half-transparent {
        opacity: 0.5;
    }

    .btn-box {
        margin-top: .9rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .other-link {
        margin-top: .4rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-content: center;
        line-height: 1;
    }

    .other-link span {
        position: relative;
        padding: 0 .4rem;
        color: #636BF6;
        font-size: .28rem;
    }

    .other-link span:last-child::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -1px;
        transform: translate(0, -50%);
        width: 1px;
        height: .28rem;
        background-color: #171520;
    }
    .no-border{
        border: none;
    }

    /* vant组件样式覆盖 */
    .van-cell:not(:last-child)::after {
        display: none;
    }

    >>>.ipt-box .ipt .van-field__control::-webkit-input-placeholder {
        color: #999;
        font-weight: normal;
    }
</style>
