<template>
	<div class="name-page">
		<!-- 我的页面 -->
		<div class="wd_bg">
			<img src="/static/img/img_personal.png" alt="">
			<div class="wd_p">
				<div class="wd_conten">
					<div class="clearfix relative">
						<div class="zihao">
							学号 <span>{{ myInfo.schoolXh }}</span>
						</div>
						<div class="zh absolute"  @click="pushRout('/xxtz')">
							<div class="tz_box relative">
								<img src="/static/img/icon_news.png" alt="">
								<div class="dd absolute">
									<img src="/static/img/icon_tips.png" v-if="byTzzt > 0" alt="">
								</div>
							</div>
						</div>
					</div>

					<div class="zhp">
						<div class="zhp_img">
							<img :src="myInfo.pic || '/static/img/img_photo.png'" alt="">
						</div> <!---->
						<div class="zzrd" v-if="myInfo.zzrd == -1">
		                	<img src="/static/img/zzrd_wtg02.png" alt="">
		                </div>
		                <div class="zzrd" v-else-if="myInfo.zzrd == 1">
		                	<img src="/static/img/zzrd_01.png" alt="">
		                </div>
						<div class="zzrd" v-else-if="myInfo.zzrd == 2">
							<img src="/static/img/zzrd_03.png" alt="">
						</div>
						<div class="zzrd" v-else>
							<img src="/static/img/zzrd_02.png" alt="">
						</div>
					</div>

					<div class="b_text">
						<h2>{{ myInfo.xm }}</h2>
						<p><span>{{ myInfo.schoolMc }}</span><span style="margin-left: 0.2rem;">{{ myInfo.schoolYxXg }}</span></p>
					</div>
				</div>
			</div>
		</div>

		<div class="nav_list nav_list_two" ><!-- v-if="myInfo.zzrd == 2" -->
			<ul>
				<li @click="gotoQrsf">
					<div class="left nav_text">
						个人资料修改
					</div>
					<div class="right bt_img">
						<img src="/static/img/enter.png" alt="">
					</div>
				</li>
				<li @click="gotoChooseType">
					<div class="left nav_text">
						智慧申请匹配
					</div>
					<div class="right bt_img">
						<img src="/static/img/enter.png" alt="">
					</div>
				</li>
				<li @click="pushRout('/sqjl')">
					<div class="left nav_text">
						历年申请记录
					</div>
					<div class="right bt_img">
						<img src="/static/img/enter.png" alt="">
					</div>
				</li>
				<li @click="pushRout('/wdzz')">
					<div class="left nav_text">
						我的资助
					</div>
					<div class="right bt_img">
						<img src="/static/img/enter.png" alt="">
					</div>
				</li>
				<li @click="pushRout('/xgmm')">
					<div class="left nav_text">
						修改登录密码
					</div>
					<div class="right bt_img">
						<img src="/static/img/enter.png" alt="">
					</div>
				</li>
			</ul>
		</div>

		<div class="delete_login">
			<button class="submit_btn" @click="deleteLogin"  :disabled="exitFlag">退出登录</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				myInfo: {
					pic: '/static/img/img_photo.png',
					schoolXh: '0000',
					zzrd: 0
				},
				byTzzt: 0,
				exitFlag: false
			}
		},
		mounted(){
			this.getMyInfo()
		},
		methods:{
			// 获取我的资料
			getMyInfo(){
				let _this = this;
				this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
                        method: 'post',
						url: PUBLICURL + 'my/myInfo'
                    }).then(json => {
						_this.$toast.clear();
						if (json.data.result === 200 ){
							_this.myInfo = json.data.data.myVo
							_this.byTzzt = json.data.data.byTzzt
						}
					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
			},
			//退出登录
			deleteLogin(){
				let _this = this
				this.$toast.loading({
					message: '退出中...',
					forbidClick: true,
					duration: 0,
				});
				this.exitFlag = true
				this.$http({
                        method: 'post',
						url: PUBLICURL + 'xszz/exitsLogin'
                    }).then(json => {
						this.$toast.clear();
						if (json.data.result === 200 ){
							this.$cookie.delete(isCookieName);
							this.$router.replace('/login')
							//防重复
                            setTimeout(()=>{
                                _this.exitFlag = false;
                            }, 2000);
						} else {
							_this.exitFlag = false;
						}
					}).catch(function(error) {
						_this.exitFlag = false;
						this.$toast.clear();
                        console.log(error);
                    });
			},
			//进入路由
			pushRout(name){
				this.$router.push(name)
			},
			//跳转个人资料修改页面
			gotoQrsf(){
				this.$router.push({
				    path: '/qrsf',
				    query: {
				        fromPage: 'name',
				    }
				})
			},
            //智慧申请匹配跳转
            gotoChooseType(){
                this.$router.push({
                    path: '/xzlx',
                    query: {
                        isMyfrom: '1',
                    }
                })
            },


		}
	}
</script>

<style scoped>
    .name-page{
        min-height: 100%;
        box-sizing: border-box;
    }
	.zzrd{
		position: absolute;
		width: 1.18rem;
		left: 0;
		top: 0.6rem;
	}
	.zzrd img{
		width: 1.18rem;
		height: auto;
	}
	.delete_login{
		display: flex;
		justify-content: center;
		align-items: center;
		padding:0.5rem 0;
	}
	.delete_login>.submit_btn{
		background: transparent;
		color: #636BF6;
		border: 1px solid #636BF6;
	}
	.nav_list{
		padding: 0 0.3rem;
	}
	.nav_list li {
		margin-top: 0.3rem;
		background-color: #FFFFFF;
		height: 0.4rem;
		padding: 0.4rem 0.3rem;
		border-radius: 0.15rem;
	}
	.nav_list_two{
		margin-top: 0.3rem;
		padding: 0;
	}
	.nav_list_two li{
		padding: 0.4rem 0.3rem;
		border-radius: 0;
		margin-top: 0;
		background-color: #FFFFFF;
		margin-bottom: 1px;
	}
	.nav_list_two li:last-child{
		margin-top: 0.3rem;
	}
	.title_img img{
		width: 0.38rem;
		height: auto;
	}
	.bt_img{
		width: 0.14rem;
		margin-top: 0.08rem;
	}
	.bt_img img{
		width: 100%;
		height: auto;
	}
	.nav_text{
		margin-left: 0.16rem;
		height: 0.4rem;
		line-height: 0.45rem;
		font-size: 0.3rem;
		color: #1D5687;
	}
	.nav_list_two .nav_text{
		margin-left: 0;
	}
	.zihao{
		color: #FFFFFF;
		line-height: 0.5rem;
	}
	.wd_bg>img{
		width: 100%;
		height: auto;
	}
	.wd_p{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	.wd_conten{
		padding: 0.5rem 0.5rem 0 0.3rem;
	}
	.tz_box{
		width: 0.46rem;
		height: 0.56rem;
	}
	.zh{
		right: 0;
		top: -0.03rem;
	}
	.tz_box img{
		width: 100%;
		height: auto;
	}
	.dd{
		width: 0.18rem;
		height: 0.18rem;
		top: 0.05rem;
		right: -0.02rem;
	}
	.dd>img{
		width: 100%;
		height: auto;
	}
	.zhp{
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.zhp_img{
        box-sizing: border-box;
		width: 2rem;
		height: 2rem;
		overflow: hidden;
		position: relative;
		border-radius: 2rem;
		/* border-color: rgba(255,255,255,0.19); */
		border: 0.06rem solid rgba(255,255,255,0.19);
	}
	.zhp_img img{
		width: 2rem;
		height: 2rem;
        object-fit: cover;
	}
	.b_text{
		text-align: center;
		color: #FFFFFF;
	}
	.b_text>h2{
		font-size: 0.46rem;
		padding: 0.35rem 0 0.2rem;
	}
</style>
