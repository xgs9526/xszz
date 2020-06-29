<template>
    <!-- 个人信息修改 -->
    <div class="grxx">
        <!-- 第一部分 -->
        <div class="grxx_top">
            <h2>基本信息</h2>
            <div class="xx_box clearfix">
				<div class="xx_l_w" @click="myAlert">
					<img src="/static/img/wenhao.png" alt="">
				</div>
                <div class="xx_l">
                    <img :src="fileUrl.previewUrl" alt="">
                    <!-- <img src="/static/img/zhaopian.jpg" alt=""> -->
                </div>
                <div class="xx_r">
                    <ul>
                        <li class="li1">
                            <span class="span1">姓名:</span><span class="span2">{{xsInfoData.xm}}</span>
                        </li>
                        <li>
                            <span class="span1">性别:</span><span class="span2">{{sex[xsInfoData.xb]}}</span>
                        </li>
                        <li>
                            <span class="span1">民族:</span><span class="span2">{{xsInfoData.mz}}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="get_file">
                <div class="sub_file">
                    <img src="/static/img/icon_camera.png" alt="">
                    <span>选一张</span>
                    <input class="ipt_file" @change="getFile($event)" type="file" accept="image/jpeg,image/jpg,image/png">
                </div>
            </div>

            <div class="data_list">
                <div class="row_list1">
                    <span class="span1">身份证号:</span>
					<span class="span2">{{xsInfoData.sfz}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">出生年月:</span>
					<span class="span2">{{xsInfoData.sr&&dateFormat(xsInfoData.sr, 'cn')}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">户籍所在地:</span>
                	<span class="span2">{{xsInfoData.jg}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">政治面貌:</span>
                    <span class="span2">{{xsInfoData.zzmmXg}}</span>
					<!-- <input class="phone_ipt1" v-model="xsInfoData.zzmmXg" type="text" placeholder="请输入政治面貌" /> -->
                    <!-- <van-field readonly clickable name="picker" :value="xsInfoData.zzmmXg" placeholder="请选择政治面貌" @click="showPicker = true"/>
                    <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="zzmmXgList" @confirm="onConfirm" @cancel="showPicker = false"/>
                    </van-popup> -->
                </div>
            </div>

            <div class="row_list1">
                <span class="span1">手机号码:</span>
				<span class="span2">{{xsInfoData.sjhXg}}</span>
                <!-- <input ref="phoneInput" class="phone_ipt" v-model="xsInfoData.sjhXg" @keyup="regPhone" type="text"
                    placeholder="请输入手机号" /> -->
                <!-- <button v-if="!isPhone" class="phone_btn" @click="modifyPhone">修改号码</button>
                <button v-if="isPhone" class="phone_btn bc_btn" @click="savePhone">保存号码</button> -->
            </div>
        </div>

		<div class="grxx_bottom" style="margin-bottom: 0;">
		    <h2>家庭状况</h2>
		    <div>
		        <div class="row_list1">
		            <span class="span1">特殊群体:</span>
					<span class="span2">{{tsqtStr[Number(familyInfoData.tsqt)]}}</span>
		        </div>
				<div class="row_list1">
				    <span class="span1">家庭困难程度:</span>
					<span class="span2">{{jtzkStr[familyInfoData.kncd]}}</span>
				</div>
		    </div>
		</div>

        <div class="grxx_bottom">
            <h2>就读信息</h2>
            <div>
                <div class="row_list1">
                    <span class="span1">就读学校:</span>
					<span class="span2">{{xsInfoData.schoolMc}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">学历类型:</span>
                	<span class="span2">{{xsInfoData.schoolLbName}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">学<span style="color: #FFFFFF;">占位</span>制:</span>
                	<span class="span2">{{xsInfoData.schoolXzXg}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">入学时间:</span>
					<span class="span2">{{xsInfoData.schoolRxsj&&dateFormat(xsInfoData.schoolRxsj, 'cn')}}</span>
                </div>
                <div class="row_list1" v-if="isShowZy">
                    <span class="span1">院<span style="color: #FFFFFF;">院系</span>系:</span>
                    <span class="span2">{{xsInfoData.schoolYxXg}}</span>
					<!-- <input class="phone_ipt1" v-model="xsInfoData.schoolYxXg" type="text" placeholder="请输入所在院系" /> -->
                </div>

                <div class="row_list1" v-if="isShowZy">
                    <span class="span1">专<span style="color: #FFFFFF;">专业</span>业:</span>
					<!-- <input class="phone_ipt1" v-model="xsInfoData.schoolZyXg" type="text" placeholder="请输入所在专业" /> -->
					<span class="span2">{{xsInfoData.schoolZyXg}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">所在年级:</span><!-- @keyup="regNj" -->
					<!-- <input class="phone_ipt1" v-model="xsInfoData.schoolNjXg" placeholder="请输入所在年级" /> -->
					<span class="span2">{{xsInfoData.schoolNjXg}}</span>
                </div>
                <div class="row_list1">
                    <span class="span1">班<span style="color: #FFFFFF;">班级</span>级:</span>
					<!-- <input class="phone_ipt1" v-model="xsInfoData.schoolBjXg" type="text" placeholder="请输入所在班级" /> -->
					<span class="span2">{{xsInfoData.schoolBjXg}}</span>
                </div>
                <div class="row_list1" v-if="xsInfoData.schoolLbName == '小学' || xsInfoData.schoolLbName == '初中' ">
                    <span class="span1">是否住宿:</span>
                    <span class="span2">{{sfzsPickerVal}}</span>
                    <!-- <van-field readonly clickable name="picker" :value="sfzsPickerVal" placeholder="是否寄宿" @click="showSfzsPicker = true"/>
                    <van-popup v-model="showSfzsPicker" position="bottom">
                    <van-picker show-toolbar :columns="['是', '否']" @confirm="sfzsPickerChange" @cancel="showSfzsPicker = false"/>
                    </van-popup> -->
                    <!-- <div class="item-content">
                        <van-field class="input-box" readonly label="" :value="sfzsPickerVal" placeholder="是否寄宿"
                            @click="showSfzsPicker = true" />
                        <van-popup v-model="showSfzsPicker" position="bottom">
                            <van-picker show-toolbar :columns="['是', '否']" @cancel="showSfzsPicker = false"
                                @confirm="sfzsPickerChange" />
                        </van-popup>
                    </div> -->
                    <!-- <van-icon class="picker-arrow" color="#9A9A9A" name="arrow" size=".3rem" /> -->
                </div>
                <div class="row_list1">
                    <span class="span1">学<span style="color: #FFFFFF;">学号</span>号:</span>
					<span class="span2">{{xsInfoData.schoolXh}}</span>
                </div>
            </div>
        </div>

        <div class="grxx_tj" v-if="$route.query.fromPage == 'qrsf'">
            <button class="submit_btn" @click="subData" :disabled="submitFlag">下一页</button>
        </div>
        <!-- <div class="grxx_tj" v-if="$route.query.fromPage == 'name'">
            <button class="submit_btn" @click="subData" :disabled="submitFlag">提交</button>
        </div> -->
        <div class="grxx_tj">
            <button class="change_btn" @click="changeBtn">修改</button>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                xsInfoData: {},
                familyInfoData: {},
                fileUrl: { //上传头像数据
                    previewUrl: '/static/img/img_photo.png',
                    picUrl: '',
                    file: null
                },
                //学历类型
                xlType: ['未知', '学前', '义务', '中职', '普高', '高校'],
                //性别
                sex: ['未知', '男', '女'],
                //特殊群体
                tsqtStr: ['无', '城市低保家庭学生', '特困供养学生', '孤儿', '烈士子女', '持证残疾学生', '城市低保边缘家庭学生', '低收入农户家庭学生', '建档立卡贫困家庭学生'],
                //家庭困难程度
                jtzkStr: ['无', '一般困难', '困难', '特别困难'],
                //接收路由参数
                queryData: {},
                zzmmXgList: ['群众', '共青团员', '中共预备党员', '中共党员'],
                //是否住宿
                showSfzsPicker: false,
                showPicker: false,
                sfzsPickerVal: '',
                //判断是否显示专业院系
                isShowZy: null,
                requestUrl: '',
                //存从哪个页面跳过来
                fromPage: '',
                //是否代办
                db: null,
                //复审 申请id
                zzsqId: '',
                zzzcId: '',
                submitFlag: false,
                stuId: '',// 学生id
            }
        },
        created(){
            let queryXm = this.$route.query.xm;
            let querySfz = this.$route.query.sfz;
            let querySjh = this.$route.query.sjh;
            let querySchoolLb = this.$route.query.schoolLb;//学龄段
            let queryDd = this.$route.query.db;//代办
            let pic = this.$route.query.pic;//代办

            let zzsqId = this.$route.query.zzsqId;//申请id

            let queryData = {};
            if(!!queryXm && !!querySfz && !!querySjh && !pic){
                this.requestUrl = 'student/get';
                queryData.xm = queryXm;
                queryData.sfz = querySfz;
                queryData.sjh = querySjh;

            }else{
                this.zzsqId = zzsqId;
                queryData.zzsqId = zzsqId;
                this.requestUrl = 'my/myStu';
            }
            if(!!queryDd){
                queryData.db = '1';
            }else{
                queryData.db = '2';
            }
            if(!!querySchoolLb){
                queryData.schoolLb = querySchoolLb;
            }
            this.queryData = queryData;
            console.log(queryData)
            this.fromPage = this.$route.query.fromPage;//存从哪个页面跳过来
            
            this.db = !!queryDd;
            //获取信息
            this.getData();
        },
        methods: {
            //年级只要数字
            regNj(e){
                let reg = /[^0-9]/g;
                this.xsInfoData.schoolNjXg = this.xsInfoData.schoolNjXg.replace(reg, '');
            },
            //提交验证手机号
            submitRegPhone(phone){
                let phoneReg = /^1[3456789]\d{9}$/;
                if (!phoneReg.test(phone)) {
                    return false;
                }
                return true;
            },
            //时间格式化
            dateFormat(date, type){
                return this.$dateFormat.dateToStr(date, type);
            },
            //是否住宿
            sfzsPickerChange(val){
                this.sfzsPickerVal = val;
                this.showSfzsPicker = false;
            },
            onConfirm(val){
                this.xsInfoData.zzmmXg = val;
                this.showPicker = false;
            },
			//点击问号的弹框
			myAlert(){
				this.$dialog.alert({
				  message: '照片要求：蓝底免冠标准一寸证件照，文件类型支持png，jpg，文件大小5M以内',
				}).then(() => {

				});
			},
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
            xybSubmit(){
                let _this = this;
                let queryData = {};
                if(!!_this.zzsqId){ // 判断是否复审
                    queryData.zzsqId = _this.zzsqId;
                    queryData.zzzcId = _this.$route.query.zzzcId;
                    queryData.fromPage = 'qrsf';
                    if(_this.familyInfoData.tsqt > 0){
                        queryData.tsqt = '1';
                    }
                    if(_this.db){
                        queryData.db = _this.queryData.db;
                    }

                }else{
                    if(_this.db){
                        queryData.db = _this.queryData.db;
                    }
                    queryData.fromPage = _this.fromPage;
                }
                console.log(queryData)
                // setTimeout(function(){
                //     _this.$router.push({
                //         path: '/tjcg',
                //         query: queryData,
                //     })
                // }, 300);
            },
            //修改提交
            subData() {
                let _this = this;
                let pic = _this.fileUrl.picUrl;
                let zzmmXg = _this.xsInfoData.zzmmXg;
                let sjhXg = _this.xsInfoData.sjhXg.replace(/\s/g, '');
                let schoolYxXg = _this.xsInfoData.schoolYxXg;
                let schoolZyXg = _this.xsInfoData.schoolZyXg;
                let sfzsXg = _this.sfzsPickerVal == '是' ? 1 : 0;
                let schoolNjXg = _this.xsInfoData.schoolNjXg;
                let schoolBjXg = _this.xsInfoData.schoolBjXg;
                let db = _this.queryData.db;
                let isShowZy = _this.isShowZy;
                let id = _this.xsInfoData.id;
                if(pic ==''){
                    _this.$dialog.alert({
                        message: '请上传证件照',
                    });
                    return;
                }else if(zzmmXg == ''){
                    _this.$dialog.alert({
                        message: '请填写政治面貌',
                    });
                    return;
                }else if(!_this.submitRegPhone(sjhXg)){
                    _this.$dialog.alert({
                        message: '请填写正确的手机号码',
                    });
                    return;
                }else if(schoolYxXg == '' && isShowZy){
                    _this.$dialog.alert({
                        message: '请填写院系',
                    });
                    return;
                }else if(schoolZyXg == '' && isShowZy){
                    _this.$dialog.alert({
                        message: '请填写专业',
                    });
                    return;
                }else if(schoolNjXg == ''){
                    _this.$dialog.alert({
                        message: '请填写年级',
                    });
                    return;
                }else if(schoolBjXg == ''){
                    _this.$dialog.alert({
                        message: '请填写班级',
                    });
                    return;
                }

                let submitData = {
                    id,
                    pic,
                    zzmmXg,
                    sjhXg,
                    schoolYxXg,
                    schoolZyXg,
                    sfzsXg,
                    schoolNjXg,
                    schoolBjXg,
                    db,
                };
                if(!!_this.zzsqId){
                    formdata.append('zzsqId', _this.zzsqId);
                }
                _this.$toast.loading({
					message: '提交中...',
					forbidClick: true,
					duration: 0,
                });
                _this.submitFlag = true;
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'student/update',
                        data: formdata,
                        headers: { "Content-Type": "multipart/form-data" },
                    }).then(function(json) {
                        _this.$toast.clear()
                        let submitRes = json.data;
                        if (submitRes.result == 200) {
                            //防重复
                            setTimeout(()=>{
                                _this.submitFlag = false;
                            }, 2000);
                            let queryData = {};
                            if(!!_this.zzsqId){ // 判断是否复审
                                queryData.zzsqId = _this.zzsqId;
                                queryData.zzzcId = _this.$route.query.zzzcId;
                                queryData.fromPage = 'qrsf';
                                if(_this.familyInfoData.tsqt > 0){
                                    queryData.tsqt = '1';
                                }
                                if(_this.db){
                                    queryData.db = _this.queryData.db;
                                }

                            }else{
                                if(_this.db){
                                    queryData.db = _this.queryData.db;
                                }
                                queryData.fromPage = _this.fromPage;
                            }
                            setTimeout(function(){
                                _this.$router.push({
                                    path: '/tjcg',
                                    query: queryData,
                                })
                            }, 300);
                        } else {
                            _this.submitFlag = false;
                            _this.$dialog.alert({
                                message: submitRes.errorcode,
                            })
                        }
                    })
                    .catch(function(error) {
                        _this.$toast.clear()
                        _this.submitFlag = false;
                        console.log(error);
                    });

            },
            changeBtn(){
                let path = ''
                let queryData = {}
                queryData = this.$route.query
                queryData.pic = this.fileUrl.previewUrl
                if(this.$route.query.fromPage == 'name') {
                    path = '/xggrxx'
                } else {
                    path = '/qrsftwo'
                }

                this.$router.push({
                    path: path,
                    query: queryData
                })
            },
            //验证输入手机号
            regPhone(e) {
                // console.log(e.target.value)
                let reg = /[^0-9\s]/g;
                this.xsInfoData.sjhXg = this.xsInfoData.sjhXg.replace(reg, '');
                if (this.xsInfoData.sjhXg.length > 13) {
                    this.xsInfoData.sjhXg = this.xsInfoData.sjhXg.substring(0, 13)
                }

                //处理手机号码空格
                let phoneNumber = this.xsInfoData.sjhXg.replace(/\s/g, '');
                let phoneLength = phoneNumber.length;
                if (phoneLength > 7) {
                    this.xsInfoData.sjhXg = phoneNumber.replace(/^(\d{3})(\d{4})(?=\d)/g, "$1 $2 ");
                } else if (phoneLength > 3) {
                    this.xsInfoData.sjhXg = phoneNumber.replace(/^(\d{3})(?=\d)/g, "$1 ");
                } else {
                    this.xsInfoData.sjhXg = phoneNumber.replace(/\s/g, '');
                }

            },
            //上传照片
            getFile(e) {
                let _this = this;
                let file = e.target.files[0] || e.dataTransfer.files[0];
				let size = file.size / 1024;
                let imgName = file.name;
                let imgReg = /\.(jpg|jpeg|png|heic|JPG|PNG|JPEG|HEIC)$/;
				if(size > 5000){
					_this.myAlert()
				}else if(!imgReg.test(imgName)){
                    _this.$dialog.alert({
                        message: '请上传jpg/png/jpeg类型图片',
                    });
                }else{
					_this.fileUrl.file = file;
                    _this.fileUrl.previewUrl = window.URL.createObjectURL(file);

                    // let formdata = new FormData();
                    // formdata.append('file', _this.fileUrl.file);
                    // formdata.append('db', _this.queryData.db);
                    // if(!!_this.zzsqId){
                    //     formdata.append('zzsqId', _this.queryData.zzsqId);
                    // }
                    // _this.$toast.loading({
                    //     message: '上传中...',
                    //     forbidClick: true,
                    //     duration: 0,
                    // });

                    // _this.$http({
                    //         method: 'post',
                    //         url: PUBLICURL + 'student/pic',
                    //         headers: { "Content-Type": "multipart/form-data" },
                    //         data: formdata,
                    //     }).then(function(json) {
                    //         let imgData = json.data;
                    //         if (imgData.result == 200) {
                    //             _this.fileUrl.picUrl = imgData.data.netAddress;
                    //             _this.fileUrl.previewUrl = imgData.data.netAddress;
                    //         } else {
                    //             _this.$dialog.alert({
                    //                 message: imgData.errorcode,
                    //             })
                    //         }
                    //         _this.$toast.clear();
                    //     })
                    //     .catch(function(error) {
                    //         console.log(error);
                    //         _this.$toast.clear();
                    //     });
				}
                // e.target.value = '';
            },
            //获取信息
            getData(){
                let _this = this;
                _this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
                });
                _this.$http({
                        method: 'post',
                        url: PUBLICURL + _this.requestUrl,
                        data: _this.queryData,
                    }).then(function(json) {
                        let infoData = json.data;
                        _this.$toast.clear();
                        if (infoData.result == 200) {

                            _this.xsInfoData = infoData.data.bsStudentXg;
                            //学生id
                            _this.stuId = _this.xsInfoData.id;

                            _this.familyInfoData = infoData.data.family;
                            //是否住宿
                            _this.sfzsPickerVal = infoData.data.bsStudentXg.sfzsXg == 0 ? '否' : '是';
                            //照片
                            if(_this.$route.query.pic){
                                _this.fileUrl.previewUrl = _this.$route.query.pic
                            } else{
                                _this.fileUrl.previewUrl = _this.xsInfoData.pic || '/static/img/img_photo.png';
                                _this.fileUrl.picUrl = _this.xsInfoData.pic;
                            }
                            
                            //初始化手机号码
                            _this.regPhone();
                            //是否显示专业院系
                            _this.isShowZy = _this.xsInfoData.schoolLb != 1&&_this.xsInfoData.schoolLb != 2&&_this.xsInfoData.schoolLb != 3&&_this.xsInfoData.schoolLb != 4&&_this.xsInfoData.schoolLb != 5;

                        } else {
                            _this.$dialog.alert({
                                message: json.data.errorcode,
                            }).then(()=>{
                                _this.$router.go(-1);
                            })
                        }
                    })
                    .catch(function(error) {
                        _this.$toast.clear();
                        console.log(error);
                    });
            },
        }
    }
</script>

<style scoped>
    .grxx_tj {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.6rem;
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
        /* margin-top: 0.4rem; */
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
	.phone_box .span1{
		color: #1D5687;
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
        width: 4.5rem;
        height: 0.5rem;
        float: left;
        font-size: 0.32rem;
        line-height: 0.5rem;
        padding: 0 0.2rem;
    }
    .phone_ipt::-webkit-input-placeholder{
        font-weight: normal;
    }
	.phone_ipt1{
		font-weight: bold;
		width: 4.5rem;
		height: 0.5rem;
		font-size: 0.32rem;
		line-height: 0.5rem;
		padding: 0 0.2rem;
		color: #636BF6;
	}
    .phone_ipt1::-webkit-input-placeholder{
        font-weight: normal;
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
        padding: 0.3rem 0.3rem 0;
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

    .xx_box {
		position: relative;
	}

    .xx_l {
        width: 2.1rem;
        height: 2.88rem;
        float: left;
        overflow: hidden;
        border-radius: 0.15rem;
    }
	.xx_l_w{
		width: 0.38rem;
		height: 0.38rem;
		position: absolute;
		top: 0;
		left: 2.2rem;
	}
	.xx_l_w>img{
		width: 100%;
		height: auto;
	}

    .xx_l>img {
        width: 2.1rem;
        height: 2.88rem;
        object-fit: cover;
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




    .section-content {
        position: relative;
        margin-bottom: .2rem;
    }

    .item-title {
        color: #1D5687;
        font-size: .28rem;
    }

    .item-content {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .input-box {
        padding: .2rem 0 .2rem;
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
    /* vant组件样式覆盖 */
    .van-cell:not(:last-child)::after {
        display: none;
    }

    >>>.input-box .van-field__control::-webkit-input-placeholder {
        color: #9A9A9A;
        font-weight: normal;
    }
    .input-box >>>.van-field__control{
        color: #636BF6;
    }
    .van-cell{
        display: inline-block;
        width: auto;
        line-height: 10px;
        overflow: inherit;
    }
    .row_list1 >>>.van-field__control{
        color:#636BF6;
        font-size: 0.32rem;
        font-weight: bold;
    }
    .change_btn{
        width: 4.5rem;
        height: 0.9rem;
        border: 1px solid #636BF6;
        border-radius: 0.45rem;
        color: #636BF6;
        font-size: 0.34rem;
    }
</style>
