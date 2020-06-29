<!-- 注册页 -->
<template>
    <div class="register">
        <div class="register-top">
            <h4>修改密码</h4>
            <p>正在为当前账号修改密码。提交后本次修改密码成功。</p>

        </div>
        <div class="register_box">
            <div class="ipt-box">
                <van-field ref="oldPassword" class="ipt no-padding-lr" v-model="oldPassword" type="text" placeholder="原始密码" label="" maxlength="18" />
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
            <button class="submit_btn" @click="submitForm" :disabled="submitFlag">提交</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                oldPassword: '',
                password: '',
                cpassword: '',
                pwdEyeOpen: false,
                cpwdEyeOpen: false,
                submitFlag: false
            }
        },
        created(){
        },
        methods: {
            // 密码眼睛
            pwdEyeClick(){
                this.pwdEyeOpen = !this.pwdEyeOpen;
            },
            // 确认密码眼睛
            cpwdEyeClick(){
                this.cpwdEyeOpen = !this.cpwdEyeOpen;
            },
            // 提交
            submitForm(){
                let _this = this;
                let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
                if (_this.oldPassword == '') {
                    _this.$dialog.alert({
                        message: '请输入原始密码'
                    }).then(() => {
                        _this.$refs.oldPassword.focus();
                    });
                    return;
                }
                if (_this.password == '') {
                    _this.$dialog.alert({
                        message: '请设置密码'
                    }).then(() => {
                        _this.$refs.password.focus();
                    });
                    return;
                }
                if (!reg.test(_this.password)) {
                    _this.$dialog.alert({
                        message: '密码必须是8-16位字母和数字'
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
					message: '修改中...',
					forbidClick: true,
					duration: 0,
				});
                _this.submitFlag = true;
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'xszz/updatePs',
                        data: {
                            oldPs: _this.oldPassword,
                            newPS: _this.password,
                            cps: _this.cpassword
                        },
                    }).then(function(json) {
                        _this.$toast.clear();
                        if (json.data.result == 200) {

                            //防重复
                            setTimeout(()=>{
                                _this.submitFlag = false;
                            }, 2000);
                            _this.$dialog.alert({
                                message: '修改成功',
                                confirmButtonText: '请重新登录'
                            }).then(()=>{
                                _this.$cookie.delete(isCookieName);
                                _this.$router.push('/login');
                            });
                        } else {
                            _this.submitFlag = false;
                            _this.$dialog.alert({
                                message: json.data.errorcode,
                            })
                        }
                    })
                    .catch(function(error) {
                        _this.$toast.clear();
                        _this.submitFlag = false;
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

    .register-top {
        padding: 1rem 1.04rem;
    }
    .register-top h4{
        font-size: 0.5rem;
        font-family:W4;
        font-weight: 400;
        color:rgba(2,4,51,1);
    }
    .register-top p {
        font-size:0.3rem;
        font-family:Hiragino Sans GB;
        color:rgba(64,75,105,1);
        line-height:28px;
        margin-top: 0.3rem;
    }

    .register_box {
        padding: 0 1.04rem;
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

   .ipt-box .ipt >>> .van-field__control::-webkit-input-placeholder {
        color: #999;
        font-weight: normal;
    }
</style>
