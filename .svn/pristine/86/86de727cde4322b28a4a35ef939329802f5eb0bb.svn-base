<template>
	<!-- 详情查看 -->
	<!-- <div class="xqck" :class="'xqck_cancel'"> -->
	<div class="xqck">
		<div class="top_box">
			<h2 class="item-title">
                {{ basicInfo.mc }}
                <img class="db-icon" src="/static/img/drsq_icon.png" v-if="ZzsqInfo.dbrId > 0" />
            </h2>
			<div class="grxx_bottom" ref="grxx0">
				<h3>基本信息</h3>
				<div class="grxx_icon1">
					<img v-if="ZzsqInfo.sqzt == 1" src="/static/img/label_shz.png" alt="">
					<img v-else-if="ZzsqInfo.sqzt == 2" src="/static/img/label_shtg.png" alt="">
					<img v-else-if="ZzsqInfo.sqzt == 3" src="/static/img/label_fsz.png" alt="">
					<img v-else-if="ZzsqInfo.sqzt == 4" src="/static/img/label_fstg.png" alt="">
					<img v-else src="/static/img/label_shwtg.png" alt="">

				</div>
				<div class="grxx_icon2" ref="grxx_img">
					<img :src="bsStudent.pic || '/static/img/img_photo.png'" alt="">
				</div>
				<div>
					<div class="row_list1">
						<span class="span1">姓<span style="color: #FFFFFF;">姓名</span>名:</span><span class="span2">{{ bsStudent.xm}}</span>
					</div>
					<div class="row_list1">
						<span class="span1">性<span style="color: #FFFFFF;">姓名</span>别:</span><span class="span2">{{ bsStudent.xb == 1 ? '男' : '女'}}</span>
					</div>
					<div class="row_list1">
						<span class="span1">民<span style="color: #FFFFFF;">姓名</span>族:</span><span class="span2">{{ bsStudent.mz }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">身份证号:</span><span class="span2">{{ bsStudent.sfz }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">出生年月:</span><span class="span2">{{ bsStudent.sr | changeDate() }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">政治面貌:</span><span class="span2">{{ bsStudent.zzmmXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">手机号码:</span><span class="span2">{{ bsStudent.sjhXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">就读学校:</span><span class="span2">{{ bsStudent.schoolMc }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">入学时间:</span><span class="span2">{{ bsStudent.schoolRxsj | changeDate() }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">学历类型:</span><span class="span2">{{bsStudent.schoolLbName}}</span>
					</div>
					<div class="row_list1" v-show="schoolYx">
						<span class="span1">院<span style="color: #FFFFFF;">院系</span>系:</span><span class="span2">{{ bsStudent.schoolYxXg == null ? '---' : bsStudent.schoolYxXg}}</span>
					</div>

					<div class="row_list1" v-show="schoolYx">
						<span class="span1">专<span style="color: #FFFFFF;">专业</span>业:</span><span class="span2">{{ bsStudent.schoolZyXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">学<span style="color: #FFFFFF;">学制</span>制:</span><span class="span2">{{ bsStudent.schoolXzXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">所在年级:</span><span class="span2">{{ bsStudent.schoolNjXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">班<span style="color: #FFFFFF;">班级</span>级:</span><span class="span2">{{ bsStudent.schoolBjXg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">学<span style="color: #FFFFFF;">学号</span>号:</span><span class="span2">{{ bsStudent.schoolXh }}</span>
					</div>
					<div class="row_list1" v-if="bsStudent.schoolLb == 2||bsStudent.schoolLb == 1">
						<span class="span1">是否住宿:</span><span class="span2">{{ bsStudent.sfzsXg == 1 ? '是' : '否	' }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">户籍所在地:</span><span class="span2">{{ bsStudent.jg }}</span>
					</div>
					<div class="row_list1">
						<span class="span1">特殊群体:</span><span class="span2">{{tsqtStr[Number(familyInfoData.tsqt)]}}</span>
					</div>
					<div class="row_list1">
						<span class="span1">家庭困难程度:</span><span class="span2">{{jtzkStr[familyInfoData.kncd]}}</span>
					</div>
				</div>
			</div>
			<div class="up_down">
				<div v-show="isHeightBool[0].isBool" class="up_img" @click="upRefHeight(0)">
					<img src="/static/img/icon_retract.png" alt="">
				</div>
				<div v-show="!isHeightBool[0].isBool" class="up_img" @click="downHeight(0)">
					<img src="/static/img/icon_open.png" alt="">
				</div>
			</div>

			<!-- 第二部分 -->
			<div class="grxx_bottom" ref="grxx1" v-show="1 < 0">
				<h3>家庭经济情况</h3>
				<div>
					<div class="row_list1">
						<span class="span1">家庭总人口数:</span><span class="span2">5人</span>
					</div>
					<div class="row_list1">
						<span class="span1">家庭月总收入:</span><span class="span2">5000元</span>
					</div>
					<div class="row_list1">
						<span class="span1">人均月收入:</span><span class="span2">1000</span>
					</div>
					<div class="row_list1">
						<span class="span1">家庭收入来源:</span><span class="span2">务工</span>
					</div>
					<div class="row_list1">
						<span class="span1">家庭住址:</span><span class="span2">浙江省杭州市西湖区文三西路</span>
					</div>
					<div class="row_list1">
						<span class="span1">邮政编码:</span><span class="span2">310000</span>
					</div>
				</div>

			</div>
			<div class="up_down" v-show="1 < 0">
				<div v-show="isHeightBool[1].isBool" class="up_img" @click="upRefHeight(1)">
					<img src="/static/img/icon_retract.png" alt="">
				</div>
				<div v-show="!isHeightBool[1].isBool" class="up_img" @click="downHeight(1)">
					<img src="/static/img/icon_open.png" alt="">
				</div>
			</div>

			<!-- 第三部分 -->
			<div class="grxx_bottom" ref="grxx2" v-show="1 < 0">
				<h3>家庭成员情况</h3>
				<div>
					<div class="prize-list">
					    <div class="prize-item">
					        <div class="item-left">
					            <i class="icon-member"></i>
					            <div class="prize-content">
					                <p class="prize-title">张国庆</p>
					                <p class="prize-time"><span>45岁</span><span class="ml mr">父女</span><span>【单位】浙江和平电子厂</span></p>
					            </div>
					        </div>
					    </div>
						<div class="prize-item">
						    <div class="item-left">
						        <i class="icon-member"></i>
						        <div class="prize-content">
						            <p class="prize-title">洪凤</p>
						            <p class="prize-time"><span>43岁</span><span class="ml mr">母女</span><span>【单位】无</span></p>
						        </div>
						    </div>
						</div>
					</div>
				</div>
			</div>
			<div class="up_down" v-show="1 < 0">
				<div v-show="isHeightBool[2].isBool" class="up_img" @click="upRefHeight(2)">
					<img src="/static/img/icon_retract.png" alt="">
				</div>
				<div v-show="!isHeightBool[2].isBool" class="up_img" @click="downHeight(2)">
					<img src="/static/img/icon_open.png" alt="">
				</div>
			</div>

			<!-- 第四部分 -->
			<div class="grxx_bottom" ref="grxx3" v-show="showSq">
				<h3>申请理由</h3>
				<div class="textarea_conten">
					{{ ZzsqInfo.sqReason }}
				</div>
			</div>
			<div class="up_down" v-show="showSq">
				<div v-show="isHeightBool[3].isBool" class="up_img" @click="upRefHeight(3)">
					<img src="/static/img/icon_retract.png" alt="">
				</div>
				<div v-show="!isHeightBool[3].isBool" class="up_img" @click="downHeight(3)">
					<img src="/static/img/icon_open.png" alt="">
				</div>
			</div>
            <!-- 第五部分 -->
            <div class="grxx_bottom fjxq" ref="grxx4" v-show="zmCl">
            	<h3>证明材料</h3>
            	<div class="item-con" v-for="(item,index) in fjDtos" :key="index">
            	    <div class="item_ipt">
            	        <van-cell-group>
            	            {{item.bz}}
            	        </van-cell-group>
            	    </div>
            	    <div class="item_inc">
            	        <div class="item_img">
            	            <div v-if="item.fjVos && item.fjVos.length > 0" class="left_img" v-for="(imgItem,idx) in item.fjVos"
            	                :key="idx">
            	                <img :src="imgItem.netAddress" alt="" />
            	            </div>
            	        </div>

            	    </div>
            	</div>
            </div>
            <div class="up_down" v-show="zmCl">
            	<div v-show="isHeightBool[4].isBool" class="up_img" @click="upRefHeight(4)">
            		<img src="/static/img/icon_retract.png" alt="">
            	</div>
            	<div v-show="!isHeightBool[4].isBool" class="up_img" @click="downHeight(4)">
            		<img src="/static/img/icon_open.png" alt="">
            	</div>
            </div>

			<!-- 手动签名 -->
			<div style="padding-bottom: 0.6rem;">
				<div class="grxx_bottom" style="padding-bottom: 0;">
					<h3>手动签名</h3>
				</div>
				<div class="autograph" :class="autographImgUrl ? '' : 'autograph-center'" >
				    <img :class="autographImgUrl ? 'autograph-img' : 'autograph-defult-img'" :src="autographImgUrl ? autographImgUrl : '/static/img/text_autograph.png'"  />
				    <div class="autograph-time">
				        <span>签名时间</span>
				        <div class="time">
				            <span>{{ ZzsqInfo.createTime | dateYear()}}</span>年
				            <span>{{ ZzsqInfo.createTime | dateMonth()}}</span>月
				            <span>{{ ZzsqInfo.createTime | dateDay()}}</span>日
				        </div>
				    </div>
				</div>
			</div>
		</div>

		<!-- 审核详情 -->
		<div class="shxq_box" v-if="showSp">
			<h2>审核详情</h2>
			<div class="shxq_conten" v-for="(item, idx) in auditInfo" :key="item.zzspId">
				<h5>{{spyjTitleArr[idx]}}</h5>
				<p>{{ item.nr }}</p>
				<div class="shxq_bottom">
					<p class="shxq_p1">签名：<span>{{item.qm}}</span></p>
					<p class="shxq_p2">
						<span>{{ item.createTime | dateYear()}}</span>年
						<span>{{ item.createTime | dateMonth()}}</span>月
						<span>{{ item.createTime | dateDay()}}</span>日</p>
					<!-- <div class="bottom_img">
						<img src="/static/img/label_gz.png" alt="">
					</div> -->
				</div>
			</div>

			<!-- <div class="shxq_conten">
				<h5>院（系)审核意见</h5>
				<p>
					该学生学习成绩优异，品德良好，但是家庭贫困，给其日常生活和学习带来困扰。经班级学生和辅导员评定，该学生符合“国家助学金”政策扶持对象。该学生学习成绩优异，品德良好，但是家庭贫困，给其日常生活和学习带来困扰。经班级学生和辅导员评定，该学生符合“国家助学金”政策扶持对象。该学生学习成绩优异，品德良好，但是家庭贫困，给其日常生活和学习带来困扰。经班级学生和辅导员评定，该学生符合“国家助学金”政策扶持对象。
				</p>
				<div class="shxq_bottom">
					<p class="shxq_p1">院系主管学生领导签名：<span>李翊君</span></p>
					<p class="shxq_p2"><span>2020</span>年<span>04</span>月<span>02</span>日</p>
					<div class="bottom_img">
						<img src="/static/img/label_gz.png" alt="">
					</div>
				</div>
			</div>

			<div class="shxq_conten">
				<h5>学校审核意见</h5>
				<p>经评审，并在校内公示   5   个工作日，无异议，现报批准该同学通过“国家助学金”校级初审。</p>
				<div class="shxq_bottom">
					<p class="shxq_p1">推荐人（辅导员或班主任）签名：<span>张鹏飞</span></p>
					<p class="shxq_p2"><span>2020</span>年<span>04</span>月<span>02</span>日</p>
					<div class="bottom_img">
						<img src="/static/img/label_gz.png" alt="">
					</div>
				</div>
			</div>

			<div class="shxq_conten">
				<h5>政府意见</h5>
				<p>
                   该学生学习成绩优异，品德良好，但是家庭贫困，给其日常生活和学习带来困扰。经班级学生和辅导员评定，该学生符合“国家助学金”政策扶持对象。
                </p>
				<div class="shxq_bottom">
					<p class="shxq_p1">推荐人（辅导员或班主任）签名：<span>陈意</span></p>
					<p class="shxq_p2"><span>2020</span>年<span>04</span>月<span>02</span>日</p>
					<div class="bottom_img">
						<img src="/static/img/label_gz.png" alt="">
					</div>
				</div>

			</div> -->
		</div>

		<!-- <div class="bg_btn">
			<button class="submit_btn">发起复审</button>
		</div> -->

	</div>
</template>

<script>
	import $ from 'jquery'
	import {formatDate} from '@/common/date'
	export default{
		data(){
			return {
				id: '', // 申请id
				autographImgUrl: null,					//签名图片数据
				isHeightBool:[
					{
						height: '1.4rem',				//要缩小的高度
						Cshheight: '8.3rem',			//初始化高度
						isBool: true					//执行收缩或者展开
					},
					{
						height: '1.3rem',				//要缩小的高度
						Cshheight: '3.2rem',			//初始化高度
						isBool: true					//执行收缩或者展开
					},
					{
						height: '1.5rem',				//要缩小的高度
						Cshheight: '3.4rem',			//初始化高度
						isBool: true					//执行收缩或者展开
					},
					{
						height: '0.95rem',				//要缩小的高度
						Cshheight: '2.5rem',			//初始化高度
						isBool: true					//执行收缩或者展开
					},
					{
						height: '2.8rem',				//要缩小的高度
						Cshheight: '2.5rem',			//初始化高度
						isBool: true					//执行收缩或者展开
					}
				],
				bsStudent: {},
				ZzsqInfo: {},
				basicInfo: {},
				auditInfo: [],
				showSp: false, // 审批
				showSq: false, // 申请
				fjDtos: null, // 证明材料
				schoolYx: false, // 是否展示院系和专业
				zmCl: false, // 是否展示证明材料
                xlType: ['未知', '学前', '义务', '中职', '普高', '高校'],
                jtzkStr: ['无', '一般困难', '困难', '特别困难'],
				tsqtStr: ['无', '城市低保家庭学生', '特困供养学生', '孤儿', '烈士子女', '持证残疾学生', '城市低保边缘家庭学生', '低收入农户家庭学生', '建档立卡贫困家庭学生'],
				familyInfoData: {},
                spyjTitleArr: ['学校意见', '市县教育局意见'],
			}
		},
		mounted() {
			let _this = this;
			_this.id = _this.$route.query.id
			_this.getBasicInfo()
		},
		filters: {
			changeDate(value){
				let date = new Date(value)
				return formatDate(date, 'yyyy') + '年'+ formatDate(date, 'MM') + '月'
			},
			dateYear(time){
				let date = new Date(time)
				return formatDate(date, 'yyyy')
			},
			dateMonth(time){
				let date = new Date(time)
				return formatDate(date, 'MM')
			},
			dateDay(time){
				let date = new Date(time)
				return formatDate(date, 'dd')
			}
		},
		methods:{
			//展开高度
			downHeight(i){
				let _this = this;
				let time = 0
				if(i==0){
					_this.$refs.grxx_img.style.display = 'block';
				}
				if(parseFloat(_this.isHeightBool[i].Cshheight) < 400) {
					time = 500
				} else if (parseFloat(_this.isHeightBool[i].Cshheight) >= 400 && parseFloat(_this.isHeightBool[i].Cshheight) < 800) {
					time = 1000
				} else if(parseFloat(_this.isHeightBool[i].Cshheight) >= 800 && parseFloat(_this.isHeightBool[i].Cshheight) < 1200) {
					time = 1500
				} else {
					time = 2000
				}
                $('.grxx_bottom').eq(i).animate({height: _this.isHeightBool[i].Cshheight,marginBottom: 0},time);
                setTimeout(function(){
                	_this.isHeightBool[i].isBool = true;
                },time)
			},
			//收缩高度 i==第几个refs height==要收缩到什么高度
			upRefHeight(i){
				let _this = this;
				let time = 0
				if(i==0){
					_this.$refs.grxx_img.style.display = 'none';
				}
				if(parseFloat(_this.isHeightBool[i].Cshheight) < 400) {
					time = 500
				} else if (parseFloat(_this.isHeightBool[i].Cshheight) >= 400 && parseFloat(_this.isHeightBool[i].Cshheight) < 800) {
					time = 1000
				} else if(parseFloat(_this.isHeightBool[i].Cshheight) >= 800 && parseFloat(_this.isHeightBool[i].Cshheight) < 1200) {
					time = 1500
				} else {
					time = 2000
				}
                $('.grxx_bottom').eq(i).animate({height: _this.isHeightBool[i].height,marginBottom: '0.6rem'},time);
                setTimeout(function(){
                	_this.isHeightBool[i].isBool = false;
                },time)
			},
			// 获取基本信息
			getBasicInfo(){
				let _this = this;
                let formData = new FormData();
                formData.append('id', _this.id)
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
                        method: 'post',
                        url: PUBLICURL + 'zzsq/SqInfo',
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" }
                    }).then(json => {
						_this.$toast.clear();
                        if(json.data.result === 200){
							_this.basicInfo = json.data.data
							_this.bsStudent = json.data.data.bsStudentXg
							if(json.data.data.bsStudentXg.schoolLb == 4 || json.data.data.bsStudentXg.schoolLb == 6){
								_this.schoolYx = true
							}
							_this.ZzsqInfo = json.data.data.ZzsqInfo
							if(_this.ZzsqInfo.sqReason != ''){
								_this.showSq = true
							}
							if(json.data.data.fjDtos!= undefined && json.data.data.fjDtos.length > 0) {
								_this.fjDtos = json.data.data.fjDtos;
								_this.zmCl = true
							}
							_this.autographImgUrl = json.data.data.ZzsqInfo.sdqm
							if(json.data.data.sp.length > 0){
								_this.auditInfo = json.data.data.sp
								_this.showSp = true
							}
							_this.familyInfoData.tsqt = json.data.data.tsqt
							_this.familyInfoData.kncd = json.data.data.kncd
                            //动画高度
                            _this.$nextTick(()=>{
                                for(let i=0; i<5; i++){
                                	let a = $('.grxx_bottom').eq(i).height();
                                	_this.isHeightBool[i].Cshheight = a + 'px';
                                }
                            });

                        }
					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
			}
		}
	}
</script>

<style scoped>
	.bg_btn{
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.6rem 0 0.8rem;
	}
	.xqck_cancel .span2{
		color: #6E6E6E;
	}
	.xqck_cancel .hj_list li{
		color: #6E6E6E;
	}
	.xqck_cancel .textarea_conten{
		color: #6E6E6E;
        word-break: break-all;
	}
	.qm-img{
		position: relative;
	}
	.qm_posi{
		width: 80%;
		text-align: right;
		position: absolute;
		right: 0.15rem;
		bottom: 0.1rem;
	}
	.shxq_p1 span{
		font-family: "wuxia";
		font-size: 0.4rem;
	}
	.shxq_conten{
		padding: 0.3rem;
		border-radius: 0.15rem;
		background-color:#F7F7FF;
		margin-bottom: 0.3rem;
	}
	.shxq_conten>h5{
		font-weight: 300;
		color: #171520;
		font-size: 0.36rem;
		line-height: 0.5rem;
		padding-bottom: 0.32rem;
	}
	.shxq_conten>p{
		font-size: 0.28rem;
		color: #6E6E6E;
		line-height: 0.36rem;
		padding-bottom: 0.35rem;
        word-break: break-all;
	}
	.shxq_p2 span{
		text-decoration: underline;
		padding: 0.1rem;
	}
	.shxq_bottom{
		position: relative;
	}
	.bottom_img{
		position: absolute;
		width: 1.68rem;
		height: 1.68rem;
		bottom: -0.1rem;
		right: 0.7rem;
	}
	.bottom_img img{
		width: 1.68rem;
		height: auto;
	}
	.shxq_bottom p{
		text-align: right;
		line-height: 0.44rem;
		font-size: 0.24rem;
		color: #171520;
	}

	.grxx1{
		height: 8.5rem;
	}
	.shxq_box{
		padding: 0 0.3rem 1.25rem;
		background-color: #F1DFD0;
	}
	.shxq_box>h2{
		width: 100%;
		height: 1.2rem;
		font-size: 0.4rem;
		line-height: 1.2rem;
		color: #795E48;
		text-align: center;
	}
	.qm-img img{
		width: 100%;
		height: auto;
	}
	.up_down{
		width: 100%;
		height: 0.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 0.55rem;
	}
	.up_img img{
		width: 0.24rem;
		height: auto;
	}

	.top_box{
		padding: 0 0.3rem;
		background-color: #FFFFFF;
	}
	.top_box>h2{
		color: #1D5687;
		font-size: 0.4rem;
		padding: 0.5rem 0.3rem;
	}
	.grxx_bottom{
		padding-left: 0.3rem;
		border-radius: 0.15rem;
		padding-bottom: 0.5rem;
		position: relative;
		overflow: hidden;

	}
	.ss{
		transition: height 0.5s;
		-moz-transition: height 0.5s;	/* Firefox 4 */
		-webkit-transition: height 0.5s;	/* Safari 和 Chrome */
		-o-transition: height 0.5s;	/* Opera */
		max-height: 1000px;
	}
	.grxx_icon1{
		width: 1.3rem;
		height: 1.04rem;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -0.65rem;
	}
	.grxx_icon1 img{
		width: 1.3rem;
		height: auto;
	}
	.grxx_icon2{
		width: 2rem;
		position: absolute;
		top: 0.8rem;
		right: 0;
	}
	.grxx_icon2 img{
		width: 2rem;
		height: auto;
		border-radius: 0.1rem;
	}
	.grxx_bottom>h3{
		font-size: 0.36rem;
		color: #171520;
		padding-bottom: 0.3rem;
		height: 0.45rem;
		line-height: 0.45rem;
	}
	.row_list1{
		margin-bottom: 0.2rem;
	}
	.span1,.span2{
		font-size: 0.28rem;
	}
	.span1{
		color: #171520;
	}
	.span2{
		margin-left: 0.2rem;
		color: #1D5687;
	}
	.hj_list li{
		color: #1D5687;
		padding-bottom: 0.4rem;
	}
	.hj_list li:last-child{
		padding-bottom: 0.2rem;
	}

	.hj_list li h4{
		font-size: 0.32rem;
		padding-bottom: 0.15rem;
	}
	.hj_list li span{
		font-size: 0.24rem;
		line-height: 0.3rem;
	}
	.textarea_conten{
		padding-right: 0.3rem;
		color: #1D5687;
		font-size: 0.28rem;
		line-height: 0.36rem;
        word-break: break-all;
	}



	.autograph {
	    /* width: 7.68rem; */
	    height: 2.5rem;
	    background: url(/static/img/bg_autograph.png) no-repeat;
	    display: flex;

	    position: relative;
	    z-index: 0;
	}
	.autograph-center{
	    align-items: center;
	    justify-content: center;
	}
	.autograph-defult-img{
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



	/* 家庭成员情况 */
	.prize-list {
	    margin: 0.3rem 0;
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
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}

	.prize-time {
	    font-size: .24rem;
	    width: 6rem;
	    overflow: hidden;
	    text-overflow:ellipsis;
	    white-space: nowrap;
	}

	.prize-time span.ml {
	    margin-left: .4rem;
	}
	.prize-time span.mr {
	    margin-right: .4rem;
	}




    .fjxq{
        padding-right: .3rem;
    }
    .fjxq .item-con {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #E1E1E1;
        border-radius: .1rem;
        margin-bottom: .3rem;
        position: relative;
    }

    .fjxq .item_inc {
        display: flex;
    }

    .fjxq .item_img {
        width: 7.08rem;
        overflow: hidden;
    }

    .fjxq .item_ipt {
        padding: .30rem .29rem .30rem .29rem;
    }

    .fjxq .left_img {
        margin-top: .15rem;
        display: inline-block;
        /* height: 1.16rem; */
        float: left;
        margin-right: .41rem;
        margin-bottom: .21rem;
        position: relative;
        left: .29rem;
    }

    .fjxq .left_img img {
        width: 1.16rem;
        height: 1.16rem;
        object-fit: cover;
    }

    .fjxq .item-img {
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


    .top_box .item-title .db-icon{
        display: inline-block;
        height: .4rem;
        vertical-align: baseline;
    }
</style>
