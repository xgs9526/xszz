<template>
    <!-- 填写姓名手机号身份证号 -->
    <div class="write-info">
        <div class="section-content">
            <div class="item-title" :class="xmError?'error':''">姓名</div>
            <div class="item-content">
                <van-field ref="xmIpt" clearable v-model="xm" class="input-box" label="" placeholder="请输入姓名" maxlength="12" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="sfzError?'error':''">身份证号</div>
            <div class="item-content">
                <van-field ref="sfzIpt" clearable v-model="sfz" class="input-box" label="" placeholder="请输入身份证号" />
            </div>
        </div>
        <div class="section-content">
            <div class="item-title" :class="sjhError?'error':''">手机号</div>
            <div class="item-content">
                <van-field ref="sjhIpt" clearable v-model="sjh" class="input-box" label="" @keyup="regTel" placeholder="请输入手机号" maxlength="11" />
            </div>
        </div>
        <div class="section-content" v-if="db">
            <div class="item-title" :class="schoolLbError?'error':''">所处学段</div>
            <div class="item-content">
                <van-field class="input-box" readonly label="" :value="scxdPickerVal" placeholder="请选择"
                    @click="showScxdPicker = true" />
                <van-popup v-model="showScxdPicker" position="bottom">
                    <van-picker show-toolbar :columns="scxdColumns" @cancel="showScxdPicker = false"
                        @confirm="scxdPickerChange" />
                </van-popup>
            </div>
            <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
        </div>

        <div class="btn-box">
            <button class="submit_btn" @click="submitInfoClick">下一步</button>
        </div>

    </div>
</template>

<script>
export default {
        data() {
            return {
                xm: '',
                sfz: '',
                sjh: '',
                schoolLb: null,
                //校验字段
                xmError: false,
                sfzError: false,
                sjhError: false,
                schoolLbError: false,
                //所处学段选择器
                scxdPickerVal: '',
                showScxdPicker: false,
                scxdColumns: ['学前', '小学', '初中', '中职', '普高'],

                db: null,//代办

            }
        },
        created(){
            //接收是否代办参数
            let db = this.$route.query.db;
            this.db = !!db;
            //存信息（用于下个页面报错返回用）
            try{
                this.xm = localStorage.xm || '';
                this.sjh = localStorage.sjh || '';
                this.sfz = localStorage.sfz || '';
                this.schoolLb = localStorage.schoolLb || null;
                this.scxdPickerVal = localStorage.scxdPickerVal || '';
            }catch(e){}
        },
        methods: {
            //所处学段选择器
            scxdPickerChange(value, idx) {
                //学段值从1开始
                this.schoolLb = idx + 1;
                this.scxdPickerVal = value;
                this.showScxdPicker = false;
            },
            //验证手机号
            regTel(){
                let reg = /[^0-9\s]/g;
                this.sjh = this.sjh.replace(reg, '');
                if (this.sjh.length > 11) {
                    this.sjh = this.sjh.substring(0, 11)
                }
            },
            //提交姓名手机号身份证
            submitInfoClick(){

                let sjhReg = /^1[3456789]\d{9}$/;//手机号正则
                let sfzReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;//身份证正则

                let sjhRegRes = !(sjhReg.test(this.sjh));
                let sfzRegRes = !(sfzReg.test(this.sfz));

                this.xmError = this.xm == '' ? true : false;
                this.sfzError = sfzRegRes ? true : false;
                this.sjhError = sjhRegRes ? true : false;
                this.schoolLbError = this.scxdPickerVal == '' && this.db ? true : false;

                if(this.xmError){
                    this.$refs.xmIpt.focus();
                    return;
                }else if(this.sfzError){
                    this.$refs.sfzIpt.focus();
                    return;
                }else if(this.sjhError){
                    this.$refs.sjhIpt.focus();
                    return;
                }else if(this.schoolLbError){
                    this.$dialog.alert({
                      message: '请选择所处学段',
                    });
                    return;
                }
                let queryData = {
                    xm: this.xm,
                    sjh: this.sjh,
                    sfz: this.sfz,
					fromPage: 'qrsf',
                }
                if(this.db){
                    queryData.db = '1';
                    queryData.schoolLb = this.schoolLb;
                }
                //存信息（用于下个页面报错返回用）
                try{
                    localStorage.xm = queryData.xm;
                    localStorage.sjh = queryData.sjh;
                    localStorage.sfz = queryData.sfz;
                    localStorage.schoolLb = this.schoolLb;
                    localStorage.scxdPickerVal = this.scxdPickerVal;
                }catch(e){}
                //跳转确认身份页面
                this.$router.push({
                    path: '/qrsf',
                    query: queryData,
                });

            },




        }
    }
</script>

<style scoped>
    /* 填写信息 */
    .write-info{
        min-height: 100vh;
        background-color: #fff;
        padding: .4rem .4rem 0;
        position: relative;
        box-sizing: border-box;
    }
    .write-info .section-content {
        position: relative;
        margin-top: .5rem;
    }
    .write-info .section-content:first-child {
        margin-top: 0;
    }

    .write-info .item-title {
        color: #1D5687;
        font-size: .28rem;
    }
    .write-info .error{
        color: #FF5757;
    }

    .write-info .item-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .write-info .input-box {
        padding: .3rem 0 .42rem;
        color: #171520;
        font-size: .32rem;
        font-weight: bold;
        border-bottom: #eee 1px solid;
    }

    .write-info .section-content:last-child .input-box {
        border-bottom: none;
    }

    .write-info .btn-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .5rem;
        position: fixed;
        bottom: .4rem;
        left: 50%;
        margin-left: -2.25rem;
    }

    /* vant组件样式覆盖 */
    .van-cell:not(:last-child)::after {
        display: none;
    }

    >>>.input-box .van-field__control::-webkit-input-placeholder {
        color: #9A9A9A;
        font-weight: normal;
    }
    .picker-arrow {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }
</style>
