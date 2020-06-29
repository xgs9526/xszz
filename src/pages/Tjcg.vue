<template>
	<!-- 提交成功 -->
	<div class="tjcg">
		<div class="tjcg_box">
			<div class="img_posi">
				<div class="tjcg_img">
					<img src="/static/img/img_submission.png" alt="">
				</div>
			</div>
			<div class="conten_box">
				<div class="icon_box">
					<div class="icon_img1">
						<img src="/static/img/icon_submission.png" alt="">
					</div>
					<div class="icon_img2">
						<img src="/static/img/text_submission.png" alt="">
					</div>
				</div>
				<div class="text_wz">
					<p v-if="fromPage == 'name'">您的个人资料修改成功！</p>
                    <p v-else-if="fromPage == 'qrsf'">您的身份信息确认已提交成功！</p>
                    <p v-else-if="fromPage == 'zzdxrd'">您的资助对象认定已提交成功！</p>
                    <p v-else>您的申请已提交成功！</p>
                    <!-- 请耐心等待后台审核， -->
					<!-- <p>审核结果将以短信形式通知。</p> -->
				</div>

				<div class="sub_box">
					<button class="submit_btn" @click="setHome">
                    {{
                        fromPage == 'name'? '返回个人中心' :
                        fromPage == 'qrsf' ? isDb ? '下一步' : !!queryData.zzsqId ? '编辑申请信息' : '返回首页' :
                        fromPage == 'zzdxrd' ? '继续申请' : '返回首页'
                    }}
                    </button>
				</div>
				<div class="time_out">
					<span>{{times}} </span> s 后自动跳转
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				times: 10,
				time: null,
                fromPage: '',//存从哪个页面跳过来
                backPath: '',//返回路由
                queryData: {},//跳转参数
			}
		},
        created(){
            let fromPage = this.$route.query.fromPage;//存从哪个页面跳过来
            let db = this.$route.query.db;//是否代办
            let zzzcId = this.$route.query.zzzcId;//资助政策id
            let isTsqt = !!this.$route.query.tsqt;//是否特殊群体

            let zzsqId = this.$route.query.zzsqId;//申请id

            //判断页面从哪里来，设置返回路由
            let backPath;
            // 路由参数
            let queryData = {}; // tsqt
            if(isTsqt){
                queryData.tsqt = '1';
			}
            if(!!zzsqId){
				queryData.zzsqId = zzsqId;
                queryData.zzzcId = zzzcId;
			
                backPath = '/knbzsq';
            }else{
                if(fromPage == 'name'){
                    backPath = '/name'
                }else if(fromPage == 'qrsf'){
                    backPath = !!db ? '/xzlx' : '/';

                }else if(fromPage == 'zzdxrd'){
                    queryData.zzzcId = zzzcId;
                    backPath = '/knbzsq';
                }else{
                    backPath = '/'
                }
            }

            if(!!db){
                queryData.db = db;
			}
			this.isDb = !!db;
            this.queryData = queryData;
            this.fromPage = fromPage;
            this.backPath = backPath;

        },
        destroyed(){
            clearInterval(this.time);
        },
		mounted(){
			let _this = this;
			_this.time = setInterval(function(){
				_this.times -- ;
				if(_this.times <= 0){
					clearInterval(_this.time);
                    _this.$router.replace({
                        path: _this.backPath,
                        query: _this.queryData,
                    });
				}
			},1000)
		},
		methods:{
			setHome(){
				clearInterval(this.time);
				this.$router.replace({
				    path: this.backPath,
				    query: this.queryData,
				});

			}
		}
	}
</script>

<style scoped>
	.time_out{
		text-align: center;
		padding: 0.3rem 0 0;
		color: #636BF6;
	}
	.time_out>span{
		text-decoration: underline;
	}
	.tjcg{
		padding: 0 0.3rem;
		height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tjcg_box{
		width: 100%;
	}
	.img_posi{
		position: relative;
		width: 100%;
		height: 1rem;
	}
	.tjcg_img{
		width: 5.12rem;
		height: 3.46rem;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -2.56rem;
	}
	.tjcg_img img{
		width: 100%;
		height: auto;
	}
	.conten_box{
		width: 100%;
		padding: 3.2rem 0 0.6rem;
		border-radius: 0.15rem;
		background-color: #FFFFFF;
	}
	.icon_box{
		width: 100%;
		height: 0.64rem;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 0.9rem;
	}
	.icon_img1{
		width: 0.58rem;
		height: 0.64rem;
	}
	.icon_img1 img{
		width: 100%;
		height: auto;
	}
	.icon_img2{
		width: 3.6rem;
		height: 0.61rem;
		margin-left: 0.2rem;
	}
	.icon_img2 img{
		width: 100%;
		height: auto;
	}
	.text_wz{
		text-align: center;
		color: #171520;
		line-height: 0.5rem;
		padding-bottom: 1.1rem;
	}
	.sub_box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 0.9rem;
	}
</style>
