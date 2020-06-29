<!-- 国家助学金申请第一步基本信息 -->
<template>
    <div class="grxx">
        <!-- 第一部分 -->
        <div class="grxx_top">
            <h2>基本信息</h2>
            <div class="xx_box clearfix">
                <div class="xx_l">
                    <img :src="fileUrl.url" alt="">
                    <!-- <img src="/static/img/img_photo.png" alt=""> -->
                </div>
                <div class="xx_r">
                    <ul>
                        <li class="li1">
                            <span class="span1">姓名:</span><span class="span2">张晓婷</span>
                        </li>
                        <li>
                            <span class="span1">性别:</span><span class="span2">女</span>
                        </li>
                        <li>
                            <span class="span1">民族:</span><span class="span2">汉</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- <div class="get_file">
                <div class="sub_file">
                    <img src="/static/img/icon_camera.png" alt="">
                    <span>选一张</span>
                    <input class="ipt_file" @change="getFile($event)" type="file" accept="image/*">
                </div>
            </div> -->

            <div class="data_list">
                <div class="row_list1">
                    <span class="span1">身份证号:</span><span class="span2">420303199406242668</span>
                </div>
                <div class="row_list1">
                    <span class="span1">出生年月:</span><span class="span2">1994年6月</span>
                </div>
                <div class="row_list1">
                    <span class="span1">政治面貌:</span><span class="span2">共青团员</span>
                </div>
            </div>

            <div class="phone_box">
                <span class="span1">手机号码:</span><span v-if="!isPhone" class="span2">{{phone}}</span>
                <input ref="phoneInput" v-if="isPhone" class="phone_ipt" v-model="phone" @keyup="regPhone" type="text"
                    placeholder="请输入手机号" />
                <button v-if="!isPhone" class="phone_btn" @click="modifyPhone">修改号码</button>
                <button v-if="isPhone" class="phone_btn bc_btn" @click="savePhone">保存号码</button>
            </div>
        </div>

        <div class="grxx_bottom">
            <h2>就读信息</h2>
            <div>
                <div class="row_list1">
                    <span class="span1">就读学校:</span><span class="span2">浙江理工大学</span>
                </div>
                <div class="row_list1">
                    <span class="span1">入学时间:</span><span class="span2">2014年09月</span>
                </div>
                <div class="row_list1">
                    <span class="span1">院<span style="color: #FFFFFF;">院系</span>系:</span><span class="span2">理学院</span>
                </div>

                <div class="row_list1">
                    <span class="span1">专<span style="color: #FFFFFF;">专业</span>业:</span><span class="span2">哲学</span>
                </div>
                <div class="row_list1">
                    <span class="span1">所在年级:</span><span class="span2">三年级</span>
                </div>
                <div class="row_list1">
                    <span class="span1">班<span style="color: #FFFFFF;">班级</span>级:</span><span class="span2">一班</span>
                </div>
                <div class="row_list1">
                    <span class="span1">学<span style="color: #FFFFFF;">学号</span>号:</span><span class="span2">150603001</span>
                </div>
            </div>
        </div>

        <div class="grxx_tj">
            <button class="submit_btn" @click="gotoNext">下一步</button>
        </div>


    </div>

</template>

<script>
    export default {
        data() {
            return {
                fileUrl: { //上传头像数据
                    url: '/static/img/zhaopian.jpg',
                    file: null
                },
                //手机号
                phone: '188 6895 6539',
                //显示手机号是否可以修改
                isPhone: false,
            }
        },
        methods: {
            //保存手机号码
            savePhone() {
                this.isPhone = false;
            },
            //修改手机号码
            modifyPhone() {
                let _this = this;
                _this.isPhone = true;
                _this.$nextTick(() => {
                    _this.$refs.phoneInput.focus();
                })
            },
            //下一步
            gotoNext() {
                this.$router.push('/gjzxjsqqtxx');
            },
            //验证输入手机号
            regPhone(e) {
                // console.log(e.target.value)
                let reg = /[^0-9\s]/g;
                this.phone = this.phone.replace(reg, '');
                if (this.phone.length > 13) {
                    this.phone = this.phone.substring(0, 13)
                }

                //处理手机号码空格
                let phoneNumber = this.phone.replace(/\s/g, '');
                let phoneLength = phoneNumber.length;
                if(phoneLength > 7){
                    this.phone = phoneNumber.replace(/^(\d{3})(\d{4})(?=\d)/g, "$1 $2 ");
                }else if(phoneLength > 3){
                    this.phone = phoneNumber.replace(/^(\d{3})(?=\d)/g, "$1 ");
                }else{
                    this.phone = phoneNumber.replace(/\s/g, '');
                }

            },
            //上传照片
            getFile(e) {
                let _this = this;
                let file = e.target.files[0];
                console.log(file)
                _this.fileUrl.file = file;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    _this.fileUrl.url = e.target.result;
                }
                e.target.value = '';
            }
        }
    }
</script>

<style scoped>
    .grxx_tj {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .grxx_bottom {
        padding: 0.35rem 0.3rem;
        background-color: #FFFFFF;
        border-radius: 0.15rem;
        margin-top: 0.3rem;
        margin-bottom: 0.6rem;
    }

    .grxx_bottom>h2 {
        font-size: 0.36rem;
        color: #171520;
        padding-bottom: 0.3rem;
    }



    /* 第一部分 */
    .phone_box .bc_btn {
        background: -webkit-linear-gradient(to right, #636BF6, #95C5FF);
        background: -o-linear-gradient(to right, #636BF6, #95C5FF);
        background: -moz-linear-gradient(to right, #636BF6, #95C5FF);
        background: linear-gradient(to right, #636BF6, #95C5FF);
        /* 标准语法 */
        color: #FFFFFF;
        border: none;
    }

    .phone_box {
        margin-top: 0.4rem;
        height: 0.5rem;
        line-height: 0.4rem;
        color: #636BF6;
    }

    .phone_box .span1,
    .phone_box .span2 {
        display: inline-block;
        color: #636BF6;
        line-height: 0.5rem;
        float: left;
    }

    .phone_box .span2 {
        display: inline-block;
        width: 2.8rem;
        color: #636BF6;

    }

    .phone_btn {
        font-size: 0.24rem;
        border: 1px solid #636BF6;
        border-radius: 0.26rem;
        padding: 0.01rem 0.2rem;
        /* padding-left: 0.2rem;
		padding-right: 0.2rem; */
        float: left;
    }

    .phone_ipt {
        font-weight: bold;
        width: 2.4rem;
        height: 0.5rem;
        float: left;
        font-size: 0.32rem;
        line-height: 0.5rem;
        padding: 0 0.2rem;
    }

    .data_list {
        padding-top: 0.3rem;
    }

    .row_list1 {
        margin-bottom: 0.2rem;
    }

    .ipt_file {
        position: absolute;
        display: block;
        width: 100%;
        height: 0.48rem;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .sub_file {
        width: 1.6rem;
        height: 0.46rem;
        border-radius: 0.24rem;
        border: 1px solid #6C7BF8;
        font-size: 0.24rem;
        margin: 0 auto;
        line-height: 0.5rem;
        color: #636BF6;
    }

    .sub_file img {
        width: 0.32rem;
        height: auto;
        margin-top: 0.1rem;
        margin-left: 0.23rem;
    }

    .get_file {
        width: 2.1rem;
        display: inline-block;
        height: 0.48rem;
        position: relative;
        margin: 0.2rem 0;
    }

    .grxx {
        padding: .3rem .3rem .6rem;
    }

    .grxx_top {
        padding: 0.35rem 0.3rem 0.6rem;
        background-color: #FFFFFF;
        border-radius: 0.15rem;
    }

    .grxx_top>h2 {
        font-size: 0.36rem;
        color: #171520;
        padding-bottom: 0.3rem;
    }

    .xx_box {}

    .xx_l {
        width: 2.1rem;
        height: 2.88rem;
        float: left;
        overflow: hidden;
        border-radius: 0.15rem;
    }

    .xx_l img {
        width: 100%;
        min-height: 2.88rem;
    }

    .xx_r {
        width: 4rem;
        height: 2.88rem;
        float: right;
    }

    .xx_r li {
        height: 0.74rem;
        line-height: 0.74rem;
        padding-top: 0.35rem;
        border-bottom: 0.02rem solid #EEEEEE;
    }

    .xx_r .li1 {
        padding-top: 0;
        height: 0.64rem;
        line-height: 0.5rem;
    }

    .span1,
    .span2 {
        font-size: 0.32rem;
        color: #1D5687;
    }

    .span2 {
        font-weight: bold;
        margin-left: 0.2rem;
    }
</style>
