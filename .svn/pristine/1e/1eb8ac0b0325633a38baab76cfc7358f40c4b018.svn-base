<template>
    <!-- 资助对象认定模块提交家庭情况页 -->
    <div>
        <div class="jtqk">
            <div class="jtqk_top">
                <h3>所属类型</h3>
                <div class="top_text">
                    <p>特殊群体 （以记录在档数据为准）、城市低保家庭学生、特困供养学生、烈士子女、持证残疾学生、孤儿、城市低保边缘家庭学生、低收入农户家庭学生、建档立卡贫困家庭学生。</p>
                </div>
                <h3>其他群体</h3>

                <div>
                    <van-checkbox-group v-model="result">
                        <ul class="qt_ul">
                            <li>
                                <div class="check">
                                    <van-checkbox shape="square" icon-size="0.4rem" name="0">遭受自然灾害</van-checkbox>
                                </div>
                            </li>
                            <li>
                                <div class="check">
                                    <van-checkbox shape="square" icon-size="0.4rem" name="1">遭受突发意外事件</van-checkbox>
                                </div>
                            </li>
                            <li>
                                <div class="check">
                                    <van-checkbox shape="square" icon-size="0.4rem" name="2">遭受重大疾病</van-checkbox>
                                </div>
                            </li>
                            <li>
                                <div class="check">
                                    <van-checkbox shape="square" icon-size="0.4rem" name="3">其他状况</van-checkbox>
                                </div>
                                <div class="qt_ipt" v-show="qtdataBoll">
                                    <van-field class="input-box" rows="1" type="textarea" autosize v-model="qtdata" placeholder="请输入其它状况" maxlength="30"/>
                                </div>
                            </li>
                        </ul>
                    </van-checkbox-group>
                </div>
                <h3>家庭经济情况</h3>
                <div class="section-content">
                    <div class="item-title">家庭年总收入（元）</div>
                    <div class="item-content">
                        <van-field class="input-box" v-model="jtsr" type="digit" maxlength="8" placeholder="请输入" />
                    </div>
                </div>
                <div class="section-content">
                    <div class="item-title">家庭存款额（元）</div>
                    <div class="item-content">
                        <van-field class="input-box" v-model="jtckje" type="digit" maxlength="8" placeholder="请输入" />
                    </div>
                </div>
                <div class="section-content">
                    <div class="item-title">有无房产或门面出租</div>
                    <div class="item-content">
                        <van-field class="input-box" readonly label :value="fcczPickerVal" placeholder="有无房产或门面出租"
                            @click="showFcczPicker = true" />
                        <van-popup v-model="showFcczPicker" position="bottom">
                            <van-picker show-toolbar :columns="chooseColumns" @cancel="showFcczPicker = false" @confirm="fcczPickerChange" />
                        </van-popup>
                    </div>
                    <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                </div>
                <div class="section-content" v-if="isShowNzjInput">
                    <div class="item-title">年租金（元）</div>
                    <div class="item-content">
                        <van-field class="input-box" v-model="nzj" type="digit" maxlength="8" placeholder="请输入" />
                    </div>
                </div>
                <div class="section-content">
                    <div class="item-title">家庭有无欠款</div>
                    <div class="item-content">
                        <van-field class="input-box" readonly label :value="ywqkPickerVal" placeholder="家庭有无欠款" @click="showYwqkPicker = true" />
                        <van-popup v-model="showYwqkPicker" position="bottom">
                            <van-picker show-toolbar :columns="chooseColumns" @cancel="showYwqkPicker = false" @confirm="ywqkPickerChange" />
                        </van-popup>
                    </div>
                    <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                </div>
                <div class="section-content" v-if="isShowQkjeInput">
                    <div class="item-title">欠款金额（元）</div>
                    <div class="item-content">
                        <van-field class="input-box" v-model="qkje" type="digit" maxlength="8" placeholder="请输入" />
                    </div>
                </div>
                <div class="section-content" v-if="isShowQkjeInput">
                    <div class="item-title">欠款原因</div>
                    <div class="item-content">
                        <van-field class="input-box" readonly label :value="qkyyPickerVal" placeholder="欠款原因" @click="showQkyyPicker = true" />
                        <van-popup v-model="showQkyyPicker" position="bottom">
                            <van-picker show-toolbar :columns="qkyyColumns" @cancel="showQkyyPicker = false" @confirm="qkyyPickerChange" />
                        </van-popup>
                    </div>
                    <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                </div>
                <div class="section-content">
                    <div class="item-title">现居住地址(省/市/区)</div>
                    <div class="item-content">
                        <van-field @click="dzIsBoll=true" class="input-box" readonly label :value="jzdz" placeholder="请选择(省/市/区)" />
                        <van-popup v-model="dzIsBoll" position="bottom">
                            <van-area ref="area" :value="areaCode" :area-list="areaList" @confirm="addDz" @cancel="deleteDz" />
                        </van-popup>
                    </div>
                    <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                </div>
                <div class="section-content">
                    <div class="item-title">现居住地址(街道)</div>
                    <div class="item-content">
                        <van-field class="input-box" readonly label :value="jzdzjd" placeholder="请选择(街道)" @click="dzIsBolljd = true" />
                        <van-popup v-model="dzIsBolljd" position="bottom">
                            <van-picker show-toolbar :value="areaCodejd" :columns="areajdList" value-key="areaName" @cancel="dzIsBolljd = false" @confirm="addDzjd" />
                        </van-popup>
                    </div>
                    <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" />
                </div>
                <div class="section-content">
                    <div class="item-title">详细地址</div>
                    <div class="item-content">
                        <van-field class="input-box" rows="1" type="textarea" autosize maxlength="30" v-model="xxdz" placeholder="精确到街道门牌号" />
                    </div>
                </div>

                <div>
                    <div class="section">
                        <div class="section-content prize-box">
                            <div class="prize-top">
                                <div class="section-title">家庭成员情况</div>
                                <div class="add-btn" @click="AddJtcyClick">添加</div>
                            </div>
                            <div class="prize-list" v-if="jtcyList && jtcyList.length > 0">
                                <div class="prize-item" v-for="(item, idx) in jtcyList" :key="idx" @click="editJtcy(item, idx)">
                                    <div class="item-left">
                                        <i class="icon-member"></i>
                                        <div class="prize-content">
                                            <p class="prize-title">{{item.xm}}</p>
                                            <p class="prize-time">
                                                <span>{{item.nl}}岁</span>
                                                <span class="ml mr">{{item.relationship}}</span>
                                                <span>【单位】{{item.dw?item.dw:'无'}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <i class="icon-edit"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="jtqk_bottom">
                <h3>可申请资助项目</h3>
                <div class="top_text">
                    <p>
                        <span v-for="(item, idx) in sqList" :key="idx">{{item}}</span>
                    </p>
                </div>
                <h3>承诺</h3>
                <div>
                    <ul class="cn_ul">
                        <li>1. 本人保证申报材料全部真实有效。本人及家庭成员若采取虚报、隐瞒、伪造等手段，骗取学生资助资格的，愿意接受管理审批部门按规定给予的处罚。</li>
                        <li>2. 本人及家庭成员同意授权自愿接受家庭经济状况核对机构对各项收入和财产信息的收集、查询、核对等并配合工作人员入户调查，如实提供材料；同意按相关规定在一定范围内进行公示。</li>
                    </ul>
                </div>
                <div class="row_label">
                    <van-checkbox v-model="checked">以上是本人自愿作出的承诺，愿自觉守信、忠实履行， 并承担相应的法律责任。</van-checkbox>
                </div>

                <h3 style="padding-top: 0.9rem;">学生本人或监护人签字</h3>
            </div>
            <div>
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
            </div>
            <div class="grxx_tj">
                <button class="submit_btn" :disabled="!subIsBool" :class="[subIsBool?'':'sub_opctiy']" @click="subMit">提交</button>
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
    import AddJtcy from "@/components/AddJtcy";
    import Autograph from "@/components/Autograph";
    import {
        formatDate
    } from "@/common/date";
    import AreaList from "@/common/area";
    export default {
        data() {
            return {
                result: [], //其它群体选择数据
                jtsr: null, //家庭收入
                checked: false, //承诺数据
                qtdata: null, //其它状态下输入的数据
                qtdataBoll: false, //是否显示这个其它状态下显示
                //家庭成员列表
                jtcyList: [],
                //添加家庭成员组件显示隐藏
                isShowAddJtcy: false,
                //是否编辑家庭成员
                isEdit: false,
                //编辑家庭成员数据
                jtcyData: {
                    xm: "",
                    nl: "",
                    relationship: "",
                    dw: "",
                    sjh: ""
                },
                //编辑的家庭成员下标
                currentIdx: 0,
                //签名
                isShowAutograph: false,
                autographImgUrl: "",
                autographYear: "",
                autographMonth: "",
                autographDay: "",

                jzdz: null, //现居住地
                jzdzjd: null, //现居住地
                xxdz: null, //详细地址
                areaCode: "", //初始化显示
                areaCodejd: "", //初始化显示
                dzIsBoll: false, //显示隐藏显示地址
                dzIsBolljd: false, //显示隐藏显示地址
                areaList: AreaList, //全国数据 
                areajdList: ['请选择省/市/区'], // 街道
                queryData: null, //接收传过来参数

                sqList: null, //可申请资助类型

                db: null, //代办
                zzzcId: null,//资助政策id
                isTsqt: null,//是否特殊群体

                jtckje: null,
                fcczPickerVal: "",
                showFcczPicker: false,
                chooseColumns: ["无", "有"],
                isShowNzjInput: false,
                nzj: null,

                ywqkPickerVal: "",
                showYwqkPicker: false,
                isShowQkjeInput: false,
                qkje: null,
                qkyyPickerVal: "",
                showQkyyPicker: false,
                qkyyColumns: ["因病因灾", "经商失败", "生活超常支出", "其他"],
                qkyy: null,
                submitFlag: true,
            };
        },
        components: {
            AddJtcy,
            Autograph
        },
        watch: {
            result: function(newVal, oldVal) {
                let newData = newVal.join("");
                if (newData.indexOf("3") != -1) {
                    this.qtdataBoll = true;
                } else {
                    this.qtdataBoll = false;
                    this.qtdata = null;
                }
            }
        },
        computed: {
            subIsBool: function() {
                if (
                    this.result.length > 0 &&
                    this.jtsr &&
                    this.jtckje &&
                    !!this.fcczPickerVal &&
                    !!this.ywqkPickerVal &&
                    this.jzdz &&
                    this.jzdzjd &&
                    this.xxdz &&
                    this.jtcyList.length > 0 &&
                    this.autographImgUrl &&
                    this.checked && this.submitFlag
                ) {
                    //选了其他要填内容
                    if (this.result.join().indexOf("3") != -1 && !this.qtdata) {
                        return false;
                    }
                    //有房产出租  要填年租金
                    if(this.isShowNzjInput && !this.nzj){
                        return false;
                    }
                    //有欠款 要填欠款金额 欠款原因
                    if(this.isShowQkjeInput && (!this.qkje || !this.qkyyPickerVal)){
                        return false;
                    }
                } else {
                    return false;
                }
                return true;
            }
        },
        created() {
            //接收传过来参数
            let queryDd = this.$route.query.db; //代办
            this.zzzcId = this.$route.query.zzzcId;//资助政策id
            let queryData = {};
            if (!!queryDd) {
                queryData.db = "1";
            } else {
                queryData.db = "2";
            }
            this.db = !!queryDd;
            this.queryData = queryData;
            //获取数据
            this.getData();
            
        },
        methods: {
            //有无房产选择器
            fcczPickerChange(value) {
                this.isShowNzjInput = value == "有" ? true : false;
                this.fcczPickerVal = value;
                this.showFcczPicker = false;
            },
            //有无欠款选择器
            ywqkPickerChange(value) {
                this.isShowQkjeInput = value == "有" ? true : false;
                this.ywqkPickerVal = value;
                this.showYwqkPicker = false;
            },
            //欠款原因选择器
            qkyyPickerChange(value, idx) {
                console.log(idx + 1)
                this.qkyy = idx + 1;
                this.qkyyPickerVal = value;
                this.showQkyyPicker = false;
            },
            //取消选择
            deleteDz() {
                this.dzIsBoll = false;
                // this.areaCode = '330100000000';
            },
            deleteDzjd() {
                this.dzIsBolljd = false;
            },
            //获取地址的数据
            addDz(val) {
                let _this = this
                console.log(val)
                _this.jzdz = val[0].name + " / " + val[1].name + " / " + val[2].name;
                _this.areaCode = val[2].code + "000000";
                _this.dzIsBoll = false;
                _this.getjd(val[2].code + '000000')
                this.jzdzjd = ''
            },
            // 获取街道
            getjd(code){
                let _this = this
                _this.$http({
                    method: "get",
                    url: PUBLICURL + "area/searchUserNextAreaCode",
                    params: {areaCode: code}
                }).then(function(json){
                    _this.areajdList = json.data.data.slice(1)
                })
            },
            addDzjd(val) {
                // console.log(val)
                this.jzdzjd = val.areaName;
                this.dzIsBolljd = false;
            },
            //添加家庭成员按钮事件
            AddJtcyClick() {
                //清空添加家庭成员页面内容
                this.clearJtcyData();

                this.isEdit = false;
                document.title = "添加家庭成员";
                this.isShowAddJtcy = true;
            },
            //编辑按钮事件
            editJtcy(data, idx) {
                this.currentIdx = idx;
                this.isEdit = true;
                this.jtcyData = data;
                document.title = "编辑家庭成员";
                this.isShowAddJtcy = true;
            },
            //添加家庭成员页面隐藏
            hideAddJtcy() {
                document.title = "资助对象认定";
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
                    xm: "",
                    nl: "",
                    relationship: "",
                    dw: "",
                    sjh: ""
                };
                this.jtcyData = data;
            },
            //显示签名组件
            showAutograph() {
                document.title = "手动签名";
                this.isShowAutograph = true;
            },
            //隐藏签名组件
            hideAutograph() {
                document.title = "资助对象认定";
                this.isShowAutograph = false;
            },
            //保存签名
            saveAutograph(imgUrl, date) {
                this.autographImgUrl = imgUrl;
                this.autographYear = formatDate(date, "yyyy");
                this.autographMonth = formatDate(date, "MM");
                this.autographDay = formatDate(date, "dd");
                this.hideAutograph();
            },
            //提交
            subMit() {
                let _this = this;
                let submitData = {};
                submitData.zrzh = _this.result.join().indexOf("0") != -1 ? "1" : "0";
                submitData.tfywsj = _this.result.join().indexOf("1") != -1 ? "1" : "0";
                submitData.zdjb = _this.result.join().indexOf("2") != -1 ? "1" : "0";
                let isQtzk = _this.result.join().indexOf("3") != -1;
                submitData.qtzk = isQtzk ? _this.qtdata : null;
                submitData.monthIncome = _this.jtsr;
                submitData.sdqm = _this.autographImgUrl;
                submitData.members = _this.jtcyList;
                submitData.areaCode = _this.areaCode;
                submitData.xjzd = _this.jzdz + " / " +  _this.jzdzjd;
                submitData.xxdz = _this.xxdz;
                submitData.db = _this.queryData.db;

                submitData.jtckje = _this.jtckje;
                submitData.fccz = _this.isShowNzjInput ? '1' : '0';
                if(_this.isShowNzjInput){
                    submitData.nzj = _this.nzj;
                }
                submitData.ywqk = _this.isShowQkjeInput ? '1' : '0';
                if(_this.isShowQkjeInput){
                    submitData.qkje = _this.qkje;
                    submitData.qkyy = _this.qkyy;
                }
                _this.$toast.loading({
                    message: '提交中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.submitFlag = false
                _this.$http({
                        method: "post",
                        url: PUBLICURL + "family/addFamilyInfo",
                        data: submitData
                    }).then(function(json) {
                        let resData = json.data;
                        if (resData.result == 200) {
                            //防重复
                            setTimeout(()=>{
                                _this.submitFlag = true;
                            }, 2000);
                            let queryData = {
                                fromPage: 'zzdxrd',
                                zzzcId: _this.zzzcId,
                            }
                            if(_this.db){
                                queryData.db = _this.queryData.db;
                            }
                            if(_this.isTsqt){
                                queryData.tsqt = '1';
                            }
                            setTimeout(function(){
                            	_this.$router.push({
                            	    path: '/tjcg',
                            	    query: queryData,
                            	})
                            }, 300);
                        } else {
                             _this.submitFlag = true;
                            _this.$dialog.alert({
                                message: json.data.errorcode
                            });
                        }
                         _this.$toast.clear();
                    })
                    .catch(function(error) {
                         _this.submitFlag = true;
                         _this.$toast.clear();
                        console.log(error);
                    });
            },
            //获取信息
            getData() {
                let _this = this;
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.$http({
                        method: "post",
                        url: PUBLICURL + "stu/stuInfo",
                        data: _this.queryData
                    }).then(function(json) {
                        let infoData = json.data;
                        if (infoData.result == 200) {
                            _this.sqList = infoData.data.sqList;
                            _this.bsMembers = infoData.data.bsMembers;
                            _this.areaCode = infoData.data.bsStudentXg.areaCode;
                            _this.jzdz = infoData.data.bsStudentXg.xjzd.slice(0,-6);
                            _this.jzdzjd = infoData.data.bsStudentXg.xjzd.slice(-4);
                            _this.xxdz = infoData.data.bsStudentXg.xxdz;
                            _this.jtcyList = infoData.data.bsMembers;
                            _this.isTsqt = infoData.data.tsqt > 0;
                            _this.getjd(_this.areaCode)
                        } else {
                            _this.$dialog.alert({
                                message: json.data.errorcode
                            });
                        }
                         _this.$toast.clear();
                    })
                    .catch(function(error) {
                         _this.$toast.clear();
                        console.log(error);
                    });
            },
        }
    };
</script>

<style scoped>
    .sub_opctiy {
        opacity: 0.4;
    }

    .jtqk {
        padding: 0.3rem;
    }

    .jtqk_bottom {
        margin-top: 0.3rem;
    }

    .cn_ul {
        padding-top: 0.3rem;
    }

    .cn_ul li {
        font-size: 0.28rem;
        color: #1d5687;
        line-height: 0.42rem;
        padding-bottom: 0.5rem;
    }

    .grxx_tj {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.6rem 0;
    }

    .jtqk_bottom {
        padding: 0.3rem;
        border-radius: 0.15rem 0.15rem 0 0;
        background-color: #ffffff;
    }

    /* 第一部分顶部 */
    .jtqk_top {
        padding: 0.3rem;
        border-radius: 0.15rem;
        background-color: #ffffff;
    }

    h3 {
        font-size: 0.36rem;
        color: #171520;
        height: 0.5rem;
        line-height: 0.5rem;
    }

    .top_text {
        padding-top: 0.2rem;
        padding-bottom: 0.5rem;
    }

    .top_text p {
        font-size: 0.28rem;
        color: #171520;
        line-height: 0.42rem;
    }

    .top_text p span {
        margin-right: 0.2rem;
    }

    .top_text p span::after {
        content: ";";
    }

    >>>.van-checkbox__icon--checked .van-icon {
        background-color: transparent;
        border-color: #636bf6;
        color: #636bf6;
        border-radius: 0.08rem;
    }

    >>>.van-checkbox__icon .van-icon {
        border-radius: 0.08rem;
    }

    >>>.van-checkbox__label {
        font-size: 0.32rem;
        margin-left: 0.18rem;
        color: #6e6e6e;
        line-height: 0.4rem;
    }

    .qt_ul {
        padding: 0.1rem 0 0.5rem 0.58rem;
    }

    .qt_ul li {
        border-bottom: 0.02rem solid #eeeeee;
        padding: 0.3rem 0;
        min-height: 0.4rem;
        position: relative;
    }

    .check {
        position: absolute;
        top: 0.3rem;
        left: -0.58rem;
    }

    >>>.van-checkbox__icon--checked+.van-checkbox__label {
        color: #636bf6;
    }

    /* input框 */
    .section-content {
        position: relative;
        margin-top: 0.4rem;
    }

    .item-title {
        color: #1d5687;
        font-size: 0.28rem;
    }

    .item-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .input-box {
        padding: 0.2rem 0 0.2rem;
        color: #171520;
        font-size: 0.32rem;
        font-weight: bold;
        border-bottom: #eee 1px solid;
    }

    .qt_ipt {
        padding-top: 0.7rem;
    }

    .qt_ipt .input-box {
        padding: 0;
        font-weight: bold;
        border-bottom: 0;
    }

    .picker-arrow {
        position: absolute;
        right: 0;
        top: 60%;
        transform: translate(0, -50%);
    }

    >>>.input-box .van-field__control::-webkit-input-placeholder {
        color: #9a9a9a;
        font-weight: normal;
    }

    /* vant组件样式覆盖 */
    .van-cell:not(:last-child)::after {
        display: none;
    }

    /* 复制助学金申请代码 */
    .page {
        padding: 0.3rem 0.3rem 0.8rem;
        box-sizing: border-box;
    }

    .section {
        width: 100%;
        box-sizing: border-box;
        padding: 0.4rem 0 0;
        background-color: #fff;
        margin-top: 0.3rem;
    }

    .section:first-child {
        margin-top: 0;
    }

    .section-title {
        font-weight: bold;
        color: #171520;
        font-size: 0.36rem;
    }

    .sub-title {
        font-weight: normal;
        font-size: 0.3rem;
    }

    .section-content {
        position: relative;
        margin-top: 0.5rem;
    }

    .item-title {
        color: #1d5687;
        font-size: 0.28rem;
    }

    .error {
        color: #ff5757;
    }

    .item-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .input-box {
        padding: 0.3rem 0 0.42rem;
        color: #171520;
        font-size: 0.32rem;
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
        margin: -0.12rem 0.3rem 0;
        font-size: 0.4rem;
    }

    .picker-arrow {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }

    .prize-box {
        padding-bottom: 0.6rem;
        margin-top: 0;
    }

    .prize-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .add-btn {
        width: 0.88rem;
        height: 0.46rem;
        text-align: center;
        line-height: 0.46rem;
        font-size: 0.24rem;
        color: #636bf6;
        border: 1px solid #636bf6;
        border-radius: 0.23rem;
    }

    .prize-list {
        margin-top: 0.6rem;
    }

    .prize-item {
        margin-bottom: 0.6rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #1d5687;
    }

    .prize-item:last-child {
        margin-bottom: 0;
    }

    .icon-edit {
        width: 0.26rem;
        height: 0.25rem;
        background: url(/static/img/icon_edit.png) no-repeat;
        background-size: 100%;
    }

    .item-left {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .icon-member {
        width: 0.34rem;
        height: 0.4rem;
        margin-right: 0.18rem;
        background: url(/static/img/icon_member.png) no-repeat;
        background-size: 100%;
    }

    .prize-content {
        line-height: 1;
        flex: 1;
    }

    .prize-title {
        margin-bottom: 0.2rem;
        font-size: 0.32rem;
        font-weight: bold;
        width: 5.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .prize-time {
        font-size: 0.24rem;
        width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .prize-time span.ml {
        margin-left: 0.4rem;
    }

    .prize-time span.mr {
        margin-right: 0.4rem;
    }

    .autograph {
        /* width: 7.68rem; */
        height: 2.5rem;
        background: url(/static/img/bg_autograph.png) no-repeat;
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
        bottom: 0.2rem;
        right: 0.2rem;
        text-align: right;
        font-size: 0.24rem;
        line-height: 1;
        z-index: 9;
    }

    .time {
        margin-top: 0.2rem;
    }

    .time span {
        display: inline-block;
        min-width: 0.48rem;
        border-bottom: 1px solid #171520;
        margin-right: 0.05rem;
        text-align: center;
    }

    .btn-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.5rem;
    }
</style>
