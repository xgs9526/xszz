<!-- 国家助学金申请第二步填写信息 -->
<template>
    <div>
        <div class="page-box">
            <div class="page">
                <div class="section">
                    <div class="section-title">家庭经济情况</div>
                    <div class="section-content">
                        <div class="item-title" :class="jtrkzsError?'error':''">家庭人口总数（人）</div>
                        <div class="item-content">
                            <van-field v-model="jtrkzs" class="input-box" type="digit" label="" placeholder="家庭人口总数"
                                maxlength="2" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="jtyzsrError?'error':''">家庭月总收入（元）</div>
                        <div class="item-content">
                            <van-field @input="jtyzsrTofixed" v-model="jtyzsr" class="input-box" type="number" label=""
                                placeholder="家庭月总收入" maxlength="8" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="rjysrError?'error':''">人均月收入（元）</div>
                        <div class="item-content">
                            <van-field @input="rjysrTofixed" v-model="rjysr" class="input-box" type="number" label=""
                                placeholder="人均月收入" maxlength="8" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="jtsrlyError?'error':''">家庭收入来源</div>
                        <div class="item-content">
                            <van-field class="input-box" readonly label="" :value="jtsrlyPickerVal" placeholder="请选择"
                                @click="showJtsrlyPicker = true" />
                            <van-popup v-model="showJtsrlyPicker" position="bottom">
                                <van-picker show-toolbar :columns="jtsrlyColumns" @cancel="showJtsrlyPicker = false"
                                    @confirm="jtsrlyPickerChange" />
                            </van-popup>
                        </div>
                        <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                    </div>
                    <!-- <div class="section-content">
                        <div class="item-title" :class="jtsrlyError?'error':''">家庭收入来源</div>
                        <div class="item-content">
                            <van-field v-model="jtsrly" class="input-box" label="" placeholder="家庭主要收入来源" maxlength="30" />
                        </div>
                    </div> -->
                    <div class="section-content">
                        <div class="item-title" :class="jtzzError?'error':''">家庭住址</div>
                        <div class="item-content">
                            <van-field @click="dzIsBoll=true" class="input-box" readonly label="" :value="jtzz"
                                placeholder="请选择" />
                            <van-popup v-model="dzIsBoll" position="bottom">
                                <van-area ref="area" :value="cshData" :area-list="areaList" @confirm="addDz" @cancel="deleteDz" />
                            </van-popup>
                        </div>
                        <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="jtzzxxError?'error':''">详细地址</div>
                        <div class="item-content">
                            <van-field v-model="jtzzxx" class="input-box" label="" placeholder="xx街道xx小区xx幢xx单元xx室"
                                maxlength="30" />
                        </div>
                    </div>
                    <div class="section-content">
                        <div class="item-title" :class="yzbmError?'error':''">邮政编码</div>
                        <div class="item-content">
                            <van-field v-model="yzbm" class="input-box" type="number" label="" placeholder="邮政编码"
                                maxlength="6" />
                        </div>
                    </div>

                </div>
                <div class="section">
                    <div class="section-content prize-box">
                        <div class="prize-top">
                            <div class="section-title" :class="jtcyListError?'error':''">家庭成员情况</div>
                            <div class="add-btn" @click="AddJtcyClick">添加</div>
                        </div>
                        <div class="prize-list" v-if="jtcyList && jtcyList.length > 0">
                            <div class="prize-item" v-for="(item, idx) in jtcyList" :key="idx" @click="editJtcy(item, idx)">
                                <div class="item-left">
                                    <i class="icon-member"></i>
                                    <div class="prize-content">
                                        <p class="prize-title">{{item.name}}</p>
                                        <p class="prize-time"><span>{{item.age}}岁</span><span class="ml mr">{{item.relation}}</span><span>【单位】{{item.company?item.company:'无'}}</span></p>
                                    </div>
                                </div>
                                <i class="icon-edit"></i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section-title" :class="applyReasonError?'error':''">申请理由<span class="sub-title">（200字）</span></div>
                    <van-field v-model="applyReason" rows="2" autosize clearable class="input-box" type="textarea"
                        label="" placeholder="申请理由" />
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
        <!-- 添加家庭成员组件 -->
        <add-jtcy v-if="isShowAddJtcy" @hideAddJtcy="hideAddJtcy" @saveJtcy="saveJtcy" @delJtcy="delJtcy" :isEdit="isEdit"
            :jtcyData="jtcyData"></add-jtcy>
        <!-- 签名 -->
        <autograph v-if="isShowAutograph" @hideAutograph="hideAutograph" @saveAutograph="saveAutograph"></autograph>
    </div>
</template>

<script>
    import AddJtcy from '@/components/AddJtcy'
    import Autograph from '@/components/Autograph'
    import {
        formatDate
    } from '@/common/date'
    import AreaList from '@/common/area'
    export default {
        components: {
            AddJtcy,
            Autograph,
        },
        data() {
            return {
                //文本框字段
                jtrkzs: '',
                jtyzsr: '',
                rjysr: '',
                // jtsrly: '',
                //家庭收入来源选择器
                jtsrlyPickerVal: '',
                showJtsrlyPicker: false,
                jtsrlyColumns: ['工资', '务农', '生产经营所得', '资产财产性收入', '社会援助', '其他'],

                jtzz: null,
                jtzzxx: '',
                yzbm: '',
                cshData: '330000', //初始化显示浙江
                dzIsBoll: false, //显示隐藏显示地址
                areaList: AreaList, //全国数据
                //申请理由
                applyReason: '',
                //校验字段
                jtrkzsError: false,
                jtyzsrError: false,
                rjysrError: false,
                jtsrlyError: false,
                jtzzError: false,
                jtzzxxError: false,
                yzbmError: false,
                applyReasonError: false,
                jtcyListError: false,

                //家庭成员列表
                jtcyList: [],
                //添加家庭成员组件显示隐藏
                isShowAddJtcy: false,
                //是否编辑家庭成员
                isEdit: false,
                //编辑家庭成员数据
                jtcyData: {
                    name: '',
                    age: '',
                    relation: '',
                    company: '',
                    phone: ''
                },
                //编辑的家庭成员下标
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
            //家庭收入来源选择器
            jtsrlyPickerChange(value) {
                this.jtsrlyPickerVal = value;
                this.showJtsrlyPicker = false;
            },
            //家庭住址取消选择
            deleteDz() {
                this.dzIsBoll = false;
                this.cshData = '330102';
            },
            //家庭住址确认选择
            addDz(val) {
                this.jtzz = val[0].name + ' / ' + val[1].name + ' / ' + val[2].name;
                this.dzIsBoll = false;
            },
            //家庭月总收入保留两位小数
            jtyzsrTofixed(val) {
                this.jtyzsr = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            },
            //人均月收入保留两位小数
            rjysrTofixed(val) {
                this.rjysr = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            },
            //添加家庭成员按钮事件
            AddJtcyClick() {
                //清空添加家庭成员页面内容
                this.clearJtcyData();

                this.isEdit = false;
                document.title = '添加家庭成员';
                this.isShowAddJtcy = true;
            },
            //编辑按钮事件
            editJtcy(data, idx) {
                this.currentIdx = idx;
                this.isEdit = true;
                this.jtcyData = data;
                document.title = '编辑家庭成员';
                this.isShowAddJtcy = true;
            },
            //添加家庭成员页面隐藏
            hideAddJtcy() {
                document.title = '国家助学金申请';
                this.isShowAddJtcy = false;
            },
            //添加家庭成员
            saveJtcy(data) {
                if (this.isEdit) {
                    let idx = this.currentIdx;
                    this.jtcyList[idx] = data;
                } else {
                    this.jtcyList.push(data);
                }

                //添加家庭成员页面隐藏
                this.hideAddJtcy();
            },
            //删除
            delJtcy() {
                let idx = this.currentIdx;
                this.jtcyList.splice(idx, 1);
                //添加家庭成员页面隐藏
                this.hideAddJtcy();
            },
            //清空添加家庭成员页面内容
            clearJtcyData() {
                let data = {
                    name: '',
                    age: '',
                    relation: '',
                    company: '',
                    phone: ''
                }
                this.jtcyData = data;
            },
            //显示签名组件
            showAutograph() {
                document.title = '手动签名';
                this.isShowAutograph = true;
            },
            //隐藏签名组件
            hideAutograph() {
                document.title = '国家助学金申请';
                this.isShowAutograph = false;
            },
            //保存签名
            saveAutograph(imgUrl, date) {
                this.autographImgUrl = imgUrl;
                this.autographYear = formatDate(date, 'yyyy');
                this.autographMonth = formatDate(date, 'MM');
                this.autographDay = formatDate(date, 'dd');
                this.hideAutograph();
            },
            //提交
            handleSubmitClick() {
                //填写错误提示
                this.jtrkzsError = this.jtrkzs == '' ? true : false;
                this.jtyzsrError = this.jtyzsr == '' ? true : false;
                this.rjysrError = this.rjysr == '' ? true : false;
                this.jtsrlyError = this.jtsrlyPickerVal == '' ? true : false;
                this.jtzzError = !this.jtzz ? true : false;
                this.jtzzxxError = this.jtzzxx == '' ? true : false;
                this.yzbmError = this.yzbm.length != 6 ? true : false;
                this.jtcyListError = this.jtcyList.length == 0 ? true : false;
                this.applyReasonError = this.applyReason.length < 200 ? true : false;

                if (this.jtrkzsError || this.jtyzsrError || this.rjysrError || this.jtsrlyError || this.jtzzError ||
                    this.jtzzxxError || this.yzbmError || this.jtcyListError) {
                    this.$dialog.confirm({
                        title: '信息不完整',
                        message: '填完表格所有信息后才能提交'
                    }).then(() => {

                    }).catch(() => {

                    });
                    return;
                }
                // if(this.yzbmError){
                //     this.$toast('邮政编码格式不正确');
                //     return;
                // }
                if (this.applyReasonError) {
                    this.$toast('申请理由至少输入200字');
                    return;
                }
                if (this.autographImgUrl = '') {
                    this.$toast('您还没有签名');
                    return;
                }
                this.$dialog.confirm({
                    title: '确定提交吗？',
                    message: '提交后内容不可修改'
                }).then(() => {
                    this.$router.push('/gjzxjsqtjcg');
                }).catch(() => {

                });
            }

        },
        mounted() {

        },
    };
</script>

<style scoped>
    .page-box {
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

    .error {
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
        margin-top: 0;

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

    .icon-member {
        width: .34rem;
        height: .4rem;
        margin-right: .18rem;
        background: url(/static/img/icon_member.png) no-repeat;
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
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .prize-time {
        font-size: .24rem;
        width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .prize-time span.ml {
        margin-left: .4rem;
    }

    .prize-time span.mr {
        margin-right: .4rem;
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

    .autograph-center {
        align-items: center;
        justify-content: center;
    }

    .autograph-defult-img {
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
