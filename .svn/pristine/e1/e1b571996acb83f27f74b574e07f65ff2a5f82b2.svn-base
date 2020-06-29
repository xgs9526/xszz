<!-- 国家奖学金申请提交成功 -->
<template>
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
						<img src="/static/img/texe_complete.png" alt="">
					</div>
				</div>
				<div class="text_wz">
					<p>你的国家奖学金申请已提交成功！</p>
					<p>请耐心等待后台审核，</p>
                    <p>审核结果将以短信形式通知。</p>
				</div>

				<div class="sub_box">
					<button class="submit_btn" @click="setHome">回首页</button>
				</div>
				<div class="time_out">
					<span>{{times}} </span> s 后返回首页
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
				time: null
			}
		},
		mounted(){
			let _this = this;
			_this.time = setInterval(function(){
				_this.times -- ;
				if(_this.times<=0){
					_this.$router.replace('/')
					clearInterval(_this.time)
				}
			},1000)
		},
		methods:{
			setHome(){
				clearInterval(this.time);
				this.$router.replace('/');

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
		width: 3rem;
		height: 0.62rem;
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
		padding-bottom: .72rem;
	}
	.sub_box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 0.9rem;
	}
</style>
