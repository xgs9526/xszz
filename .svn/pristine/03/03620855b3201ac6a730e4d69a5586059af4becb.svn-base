<template>
    <div class="material_warp">
        <div v-if="isTsqt">
            <div class="submit">
            	<div class="sub_img">
            		<img src="/static/img/img_jl.png" alt="">
            	</div>
            	<div class="sub_title">{{sqrXm}}同学，你属于记录在档的<span class="highlight">{{sqrTsqtStr}}</span>可以提交<span class="highlight">{{sqMc}}</span>申请</div>
            </div>
        </div>
        <div v-else>
            <div class="section">
                <div class="section-title">申请理由<span class="sub-title">（至少20字）</span></div>
                <van-field v-model="sqly" rows="2" autosize clearable class="input-box" type="textarea" label="" maxlength="200"
                    placeholder="申请理由" />
            </div>
            <div class="warp_title">请提供辅助说明材料，用于体现家庭状况 </div>
            <div class="warp_explain">说明材料包括但不限于医疗费用票据、医疗证明（病历卡或出院小结）、受灾证明或扶贫民政提供的其他佐证材料等</div>
            <div class="warp_red">* 最多可以上传5份材料</div>
            <div>
                <div class="item-con" v-for="(item,index) in fjDtos" :key="index">
                    <div class="item_ipt">
                        <van-cell-group>
                            <van-field v-model="item.bz" maxlength="20" placeholder="材料描述（20字内)" />
                        </van-cell-group>
                    </div>
                    <div class="item_inc">
                        <div class="item_img">
                            <div v-if="item.fjVos && item.fjVos.length > 0" class="left_img" v-for="(imgItem,idx) in item.fjVos"
                                :key="idx">
                                <img :src="imgItem.netAddress" alt="" />
                                <div class="del_img" @click="deleteImg(imgItem, idx, index)">
                                    <img src="/static/img/cuowu.png" alt="">
                                </div>
                            </div>
                            <div class="item-img" v-if="item.fjVos && item.fjVos.length < 5">
                                <input type="file" class="ipt" @change="addImg($event,index)" accept="image/*" multiple="multiple" />
                            </div>
                        </div>
                        <div class="delete_img" @click="hangleDle(item, index)" v-if="fjDtos.length > 1">
                            <img src="/static/img/delete.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="item_add" @click="hangleAdd">添加材料</div>
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
        <!-- 签名 -->
        <autograph v-if="isShowAutograph" @hideAutograph="hideAutograph" @saveAutograph="saveAutograph"></autograph>
        <!-- 提交 -->
        <div class="grxx_tj">
            <button class="submit_btn" @click="hangleBtn" :disabled="submitFlag">提交</button>
        </div>
    </div>
</template>

<script>
    import Autograph from '@/components/Autograph'
    import {
        formatDate
    } from '@/common/date'
    export default {
        data() {
            return {
                //特殊群体显示内容
                sqrXm: null,
                sqrTsqtStr: '',
                sqMc: '',
                tsqtArr: ['', '城市低保家庭学生', '特困供养学生', '孤儿', '烈士子女', '持证残疾学生', '城市低保边缘家庭学生', '低收入农户家庭学生', '建档立卡贫困家庭学生'],

                isTsqt: null,
                maxImg: 5, //最大上传图片数量
                zzzcId: null, // 资助政策id
                db: null, // 是否代办
                sqly: '', //申请理由
                // 材料上传
                fjDtos: [{
                    bz: '',
                    fjVos: [],
                }],

                //签名
                isShowAutograph: false,
                autographImgUrl: '',
                autographYear: '',
                autographMonth: '',
                autographDay: '',

                //申请id 复审
                zzsqId: '',
                submitFlag: false
            }
        },
        created() {
            let db = this.$route.query.db;
            let zzzcId = this.$route.query.zzzcId;
            let tsqt = this.$route.query.tsqt;

            let zzsqId = this.$route.query.zzsqId;
            this.db = !!db;
            this.zzzcId = zzzcId;
            console.log(this.zzzcId)
            this.isTsqt = !!tsqt;
            //是特殊群体去查信息
            if(!!tsqt){
                this.getUserInfo();
            }
            //复审查数据
            if(!!zzsqId){
                this.zzsqId = zzsqId;
                this.getSqInfo();
            }
        },
        methods: {
            // 选择图片
            addImg(e, index) {
                let _this = this;
                let files = e.target.files;
                let uploadFiles = [];
                //得到最大能上传的数量
                let canUploadNumber = _this.maxImg - _this.fjDtos[index].fjVos.length;
                let filesLength = files.length;
                canUploadNumber = canUploadNumber >= filesLength ? filesLength : canUploadNumber;
                for (let j = 0; j < canUploadNumber; j++) {
                    uploadFiles.push(files[j]);
                }
                let formdata = new FormData();
                uploadFiles.forEach((item) => {
                    formdata.append('file', item);
                })
                formdata.append('db', _this.db ? '1' : '2');
                formdata.append('zzzcId', _this.zzzcId);
                console.log(_this.$route.query.zzsqId)
                if(!!_this.$route.query.zzsqId){
                    formdata.append('zzsqId', _this.$route.query.zzsqId);
                }
                
                _this.$toast.loading({
					message: '上传中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'fzsm/uploadFzsm',
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: formdata,
                }).then(json => {
                    _this.$toast.clear();
                    let uploadRes = json.data;
                    if (uploadRes.result == 200) {

                        let resArr = uploadRes.data.fjVos;
                        let oldImgs = _this.fjDtos[index].fjVos;
                        _this.fjDtos[index].fjVos = oldImgs.concat(resArr);

                        _this.$toast('上传成功');
                    } else {
                        _this.$dialog.alert({
                            message: uploadRes.errorcode,
                        })
                    }
                    // 清空文件域
                    e.target.value = '';
                }).catch(function(error) {
                    _this.$toast.clear();
                    console.log(error);
                    // 清空文件域
                    e.target.value = '';
                });


            },
            // 删除图片
            deleteImg(imgItem, imgIdx, clIdx) {
                let _this = this;

                let delData = {
                    pkFjId: imgItem.pkFjId,
                };
                _this.$toast.loading({
					message: '删除中...',
					forbidClick: true,
					duration: 0,
				});
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'fzsm/delete',
                    data: delData,
                }).then(json => {
                    _this.$toast.clear();
                    let delRes = json.data;
                    if (delRes.result == 200) {
                        _this.fjDtos[clIdx].fjVos.splice(imgIdx, 1);
                        console.log(_this.fjDtos[clIdx].fjVos)
                        _this.$toast('删除成功');
                    } else {
                        _this.$dialog.alert({
                            message: delRes.errorcode,
                        })
                    }
                }).catch(function(error) {
                    _this.$toast.clear();
                    console.log(error);
                });
            },
            // 增加一份材料
            hangleAdd() {
                if (this.fjDtos.length > 4) {
                    this.$toast('最多可以上传5份材料!');
                    return;
                }
                this.fjDtos.push({
                    bz: '',
                    fjVos: [],
                })
            },
            // 删除整个材料
            hangleDle(item, idx) {
                let _this = this;
                let clImgs = item.fjVos;
                if(clImgs.length > 0){
                    let ids = [];
                    clImgs.forEach((item)=>{
                        ids.push(item.pkFjId);
                    });

                    let delData = {
                        ids
                    };
                    _this.$toast.loading({
                    	message: '删除中...',
                    	forbidClick: true,
                    	duration: 0,
                    });
                    _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'fzsm/deleteAllFj',
                        data: delData,
                    }).then(json => {
                        _this.$toast.clear();
                        let delRes = json.data;
                        if (delRes.result == 200) {
                            this.fjDtos.splice(idx, 1);
                            _this.$toast('删除成功');
                        } else {
                            _this.$dialog.alert({
                                message: delRes.errorcode,
                            })
                        }
                    }).catch(function(error) {
                        _this.$toast.clear();
                        console.log(error);
                    });
                }else{
                    this.fjDtos.splice(idx, 1);
                }

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
            // 提交
            hangleBtn() {
                let _this = this;
                let isTsqt = _this.isTsqt; // 是否特殊群体
                let sqly = _this.sqly; // 申请理由
                let fjDtos = _this.fjDtos; // 证明材料
                let sdqm = _this.autographImgUrl; // 签名
                let zzzcId = _this.zzzcId;
                let db = !!_this.db ? '1' : '2';
                let tsqt = !!_this.isTsqt ? '1' : '0';


                if(!isTsqt){
                    if (sqly == '') {
                        _this.$dialog.alert({
                            message: '请添加申请理由'
                        })
                        return
                    }
                    if (sqly.length < 20) {
                        _this.$dialog.alert({
                            message: '申请理由不得少于20字'
                        })
                        return
                    }

                    for (let i = 0; i < fjDtos.length; i++) {
                        let item = fjDtos[i];
                        let idx = i + 1;
                        if (item.bz == '') {
                            _this.$dialog.alert({
                                message: `第${idx}份材料请添加描述`
                            })
                            return
                        }
                        if (item.fjVos.length <= 0) {
                            _this.$dialog.alert({
                                message: `第${idx}份材料请上传证明材料`
                            })
                            return
                        }
                    }
                }
                if (sdqm == '') {
                    _this.$dialog.alert({
                        message: '您还没有签名'
                    })
                    return
                }

                let submitData = {
                    sqly,
                    fjDtos,
                    sdqm,
                    zzzcId,
                    db,
                }
                //复审 申请id
                if(!!_this.zzsqId){
                    submitData.zzsqId = Number(_this.zzsqId);
                }else{
                    submitData.tsqt = tsqt;
                }
                _this.$toast.loading({
					message: '提交中...',
                    forbidClick: true,
                    duration: 0,
                });
                _this.submitFlag = true;
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'zzsq/SqMaterial',
                    data: submitData,
                }).then(json => {
                    _this.$toast.clear();
                    let submitRes = json.data;
                    if (submitRes.result == 200) {
                        setTimeout(()=>{
                            _this.submitFlag = false;
                        }, 2000);
                        setTimeout(() => {
                            _this.$router.push('/tjcg');
                        }, 300);
                    } else {
                        _this.submitFlag = false;
                        _this.$dialog.alert({
                            message: submitRes.errorcode,
                        })
                    }

                }).catch(function(error) {
                    _this.submitFlag = false;
                    _this.$toast.clear();
                    console.log(error);
                });
            },
            getUserInfo(){
                let _this = this;
                let db = _this.db ? '1':'2';
                let zzzcId = _this.zzzcId;
                let submitData = {
                    db,
                    zzzcId,
                }
                _this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'zzsq/SqInfoById',
                    data: submitData,
                }).then(json => {
                    _this.$toast.clear();
                    let submitRes = json.data;
                    if (submitRes.result == 200) {
                        _this.sqrXm = submitRes.data.xm;
                        _this.sqMc = submitRes.data.mc;
                        let idx = Number(submitRes.data.tsqt);
                        _this.sqrTsqtStr = _this.tsqtArr[idx];
                    } else {
                        _this.$dialog.alert({
                            message: submitRes.errorcode,
                        })
                    }

                }).catch(function(error) {
                    _this.$toast.clear();
                    console.log(error);
                });
            },
            // 复审取数据
            getSqInfo(){
                let _this = this;
                let zzsqId = Number(_this.zzsqId);
                _this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
                _this.$http({
                    method: 'post',
                    url: PUBLICURL + 'zzsq/getZzsqByFS',
                    data: {
                        zzsqId
                    },
                }).then(json => {
                    let sqInfoRes = json.data;
                    _this.$toast.clear();
                    if (sqInfoRes.result == 200) {
                        let busiZzsq = sqInfoRes.data.busiZzsq;
                        let date = busiZzsq.sqSj && new Date(busiZzsq.sqSj.replace(/-/g, '/'));
                        _this.autographYear = formatDate(date, 'yyyy');
                        _this.autographMonth = formatDate(date, 'MM');
                        _this.autographDay = formatDate(date, 'dd');

                        _this.sqly = busiZzsq.sqReason;
                        _this.fjDtos = sqInfoRes.data.fjDtos;
                        _this.autographImgUrl = busiZzsq.sdqm;

                        _this.zzzcId = busiZzsq.zzzcId;
                        _this.db = busiZzsq.dbrId > 0;

                    } else {
                        _this.$dialog.alert({
                            message: sqInfoRes.errorcode,
                        })
                    }

                }).catch(function(error) {
                    _this.$toast.clear();
                    console.log(error);
                });
            },


        },
        components: {
            Autograph,
        },
    }
</script>

<style scoped>
    .material_warp {
        min-height: 100vh;
        background-color: #fff;
        padding: .4rem .3rem;
        box-sizing: border-box;
    }

    .warp_title {
        /* padding-top: .3rem; */
        font-size: .3rem;
        font-weight: bold;
        color: #171520;
    }

    .warp_explain {
        font-size: .26rem;
        font-weight: 500;
        color: #171520;
        padding-top: .26rem;
    }

    .warp_red {
        font-size: .24rem;
        color: red;
        padding-top: .48rem;
        padding-bottom: .31rem;
    }

    .item-con {
        width: 7.68rem;
        border: 1px solid #E1E1E1;
        border-radius: .1rem;
        margin-bottom: .3rem;
        position: relative;
    }


    >>>.van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
        border: none;
    }

    >>>.van-cell {
        padding: 0;
    }

    >>>.van-field__control {
        font-size: .3rem;
        font-weight: bold;
    }

    >>>.van-field__control::-webkit-input-placeholder {
        font-weight: normal;
    }

    .item_inc {
        display: flex;
    }

    .item_img {
        width: 7.08rem;
        overflow: hidden;
    }

    .item_ipt {
        padding: .30rem .29rem .30rem .29rem;
    }

    .left_img {
        margin-top: .15rem;
        display: inline-block;
        /* height: 1.16rem; */
        float: left;
        margin-right: .41rem;
        margin-bottom: .21rem;
        position: relative;
        left: .29rem;
    }

    .left_img img {
        width: 1.16rem;
        height: 1.16rem;
        object-fit: cover;
    }

    .ipt {
        width: 1.16rem;
        height: 1.16rem;
        opacity: 0;
        position: absolute;
    }

    .item-img {
        margin-top: .15rem;
        width: 1.16rem;
        height: 1.16rem;
        background: url(/static/img/jia.png)no-repeat center center;
        background-size: 100%;
        margin-left: 0.2rem;
        position: relative;
        margin-bottom: 0.2rem;
        float: left;
    }

    .del_img {
        width: .28rem;
        height: .28rem;
        border-radius: 50%;
        background-color: #000;
        position: absolute;
        top: -.15rem;
        right: -.1rem;
    }

    .del_img img {
        width: .12rem;
        height: .12rem;
        display: block;
        margin: 0 auto;
        padding-top: .08rem;
    }

    .delete_img {
        position: absolute;
        right: .3rem;
        bottom: .5rem;
        /* margin-top: -.16rem; */
    }

    .delete_img img {
        width: .3rem;
        height: .33rem;

    }

    .item_add {
        width: 1.8rem;
        height: .6rem;
        line-height: .6rem;
        font-size: .3rem;
        color: #636BF6;
        text-align: center;
        border: 1px solid #636BF6;
        border-radius: .3rem;
        margin: .5rem auto 1rem;
    }

    /* 签名 */
    .autograph {
        /* width: 7.68rem; */
        height: 2.5rem;
        background: url(/static/img/bg_autograph.png) no-repeat;
        display: flex;
        margin-bottom: 1.7rem;
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



    .grxx_tj {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 1.37rem;
    }



    .section {
        width: 100%;
        box-sizing: border-box;
        padding: .4rem .3rem 0;
        background-color: #fff;
        box-shadow: 0 0 .15rem 0 rgba(237, 237, 238, 0.8);
        border-radius: .1rem;
        margin-bottom: .4rem;
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





    .submit{
    	/* min-height: 100vh; */
    	background-color: #fff;
    }
    .sub_img img{
    	width: 5.04rem;
    	display: block;
    	margin: 0 auto;
    	padding-top: .5rem;
    }
    .sub_title{
    	font-size: .28rem;
    	color: #171520;
    	width: 5.58rem;
    	margin:  0 auto;
    	line-height:.48rem;
    	text-align: center;
    	margin: .6rem auto;
    }


    /* 高亮 */
    .highlight{
        color: #FE3535;
    }
</style>
