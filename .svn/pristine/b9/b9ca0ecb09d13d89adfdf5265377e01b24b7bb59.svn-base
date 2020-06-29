<template>
    <div class="login">
        <!-- 登录页 -->
        <div class="banner">
            <img src="/static/img/img_login.png" alt="">
        </div>

        <div class="login_box" style="margin-top: 4vh;">
            <div class="login_width">
                <div class="ipt_box">
                    <input type="text" v-model.trim="login.tel" placeholder="输入登录账号">
                    <!--  @keyup="numberSub" -->
                    <div class="ipt_icon">
                        <img src="/static/img/icon_zh.png" alt="">
                    </div>
                    <div class="delet" v-if="login.tel && login.tel.length >2" @click="deletLogin('tel')">
                        <img src="/static/img/icon_delete.png" alt="">
                    </div>
                </div>
                <div class="ipt_box">
                    <input type="password" v-model.trim="login.password" placeholder="输入登录密码">
                    <div class="ipt_icon">
                        <img src="/static/img/icon_password.png" alt="">
                    </div>
                    <div class="delet" v-if="login.password && login.password.length > 2" @click="deletLogin('password')">
                        <img src="/static/img/icon_delete.png" alt="">
                    </div>
                </div>
                <div class="ipt_box">
                    <input type="text" v-model.trim="login.code" maxlength="4" placeholder="输入验证码">
                    <!--  @keyup="yzmReg" -->
                    <div class="ipt_icon">
                        <img src="/static/img/icon_verification.png" alt="">
                    </div>
                    <div class="yzm" @click="getYzm">
                        <img :src="yzmImg" alt="">
                    </div>
                </div>
                <div class="father">
                    <van-checkbox v-model="isCookie" icon-size="0.32rem" shape="square">自动登录</van-checkbox>
                </div>
            </div>
        </div>
        <div>
            <div class="login_width">
                <div class="father">
                    <button @click="subData" class="submit_btn" style="margin-top: 3vh;margin-bottom: 2vh;" :disabled="submitFlag">登录</button>
                </div>
                <div>
                    <p style="color: #636BF6;text-align: center;"><span @click="gotoLink('/wjmm')">忘记密码？</span><span
                            style="padding: 0 0.4rem 0 0.3rem;">|</span><span @click="gotoLink('/register')">去注册</span></p>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
    export default {
        data() {
            return {
                login: { //登录信息
                    tel: '',
                    password: '',
                    code: '',
                    auto: 0,
                    uuid: '', //给后端来校验图形验证码的标识
                },
                yzmImg: '', //后端返回图片验证码

                isCookie: false, //是否自动登录
                submitFlag: false, //防重复
            }
        },
        created() {
            this.yzmImg = PUBLICURL + 'reg/page?t=' + new Date().getTime()
        },
        methods: {
            //跳转
            gotoLink(name) {
                this.$router.push(name);
            },
            //提交数据
            subData() {
                let _this = this;
                let tel = _this.login.tel;
                let password = _this.login.password;
                let code = _this.login.code;
                let uuid = _this.uuid;
                let isCookie = _this.isCookie;
                _this.login.auto = isCookie ? '1' : '0';


                if (!tel) {
                    _this.$dialog.alert({
                        message: '请输入学信网账号登录'
                    })
                    return
                } else if (!password) {
                    _this.$dialog.alert({
                        message: '请输入密码'
                    })
                    return
                } else if (!code) {
                    _this.$dialog.alert({
                        message: '请输入验证码'
                    })
                    return
                }
                _this.$toast.loading({
                    message: '登录中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.submitFlag = true;
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'xszz/login',
                        data: _this.login,
                    }).then(function(json) {
                        let loginData = json.data;
                        _this.$toast.clear();
                        if (loginData.result == 200) {
                            //防重复
                            setTimeout(() => {
                                _this.submitFlag = false;
                            }, 2000);

                            let tokenValidTime = isCookie ? 15 : 1;
                            //是否确认过身份0未确认  1已确认  已确认跳首页
                            let isQrsf = loginData.data.bs;
                            let pathName = !!isQrsf ? '/' : '/loginafterwrite';

                            _this.$cookie.set(isCookieName, loginData.data.token, tokenValidTime);

                            //清空之前存的信息
                            try {
                                localStorage.xm = '';
                                localStorage.sjh = '';
                                localStorage.sfz = '';
                                localStorage.schoolLb = null;
                                localStorage.scxdPickerVal = '';
                            } catch (e) {};

                            setTimeout(function() {
                                _this.$router.replace(pathName);
                            }, 300);

                        } else {
                            //防重复
                            _this.submitFlag = false;
                            _this.getYzm();
                            _this.$dialog.alert({
                                message: json.data.errorcode,
                            })
                        }
                    })
                    .catch(function(error) {
                        _this.$toast.clear();
                        console.log(error);
                        //防重复
                        _this.submitFlag = false;
                        _this.getYzm();
                    });
            },
            //账号验证码
            // numberSub() {
            //     let data = this.login.tel;
            //     let reg = /[\u4e00-\u9fa5]/ig;
            //     if (data) {
            //         this.login.tel = data.replace(reg, "");
            //     }
            //     if (this.login.tel && this.login.tel.length > 20) {
            //         this.login.tel = this.login.tel.substring(0, 20)
            //     }
            // },
            //验证码正则
            // yzmReg() {
            //     let data = this.login.code;
            //     let reg = /[^a-zA-Z0-9]/g;
            //     if (data) {
            //         this.login.code = data.replace(reg, "");
            //     }
            //     if (this.login.code && this.login.code.length > 4) {
            //         this.login.code = this.login.code.substring(0, 4)
            //     }
            // },
            //情况input
            deletLogin(name) {
                this.login[name] = null
            },
            //获得图形验证码
            getYzm() {
                this.login.code = '';
                this.yzmImg = PUBLICURL + 'reg/page?t=' + new Date().getTime()
            },

        }
    }
</script>

<style scoped>
    .login {
        min-height: 100vh;
        background-color: #FFFFFF;
    }

    .delet {
        position: absolute;
        right: 0.5rem;
        top: 0.32rem;
    }

    .delet img {
        width: 0.32rem;
        height: auto;
    }

    .login_box {
        margin-top: 3%;
    }

    .login_width {
        width: 6.2rem;
        margin: 0 auto;
    }

    .ipt_box {
        width: 100%;
        height: 0.96rem;
        position: relative;
        margin-bottom: 0.2rem;
    }

    .ipt_icon {
        position: absolute;
        width: 0.36rem;
        height: auto;
        top: 0.27rem;
        left: 0;
    }

    .ipt_icon img {
        width: 0.36rem;
        height: auto;
    }

    .yzm {
        position: absolute;
        right: 0;
        top: 0.12rem;
    }

    .yzm img {
        height: 0.72rem;
        width: auto;
    }

    input {
        margin: 0;
        padding: 0;
        font-size: 0.32rem;
        border-bottom: 0.02rem solid #EEEEEE;
        display: block;
        width: 4.02rem;
        padding: 0.12rem 1.5rem 0.12rem 0.68rem;
        height: 0.72rem;
        color: #171520;
    }

    input::-webkit-input-placeholder {
        color: #999999;
    }

    .banner {
        width: 100%;
    }

    .banner img {
        width: 100%;
        height: auto;
    }
</style>
