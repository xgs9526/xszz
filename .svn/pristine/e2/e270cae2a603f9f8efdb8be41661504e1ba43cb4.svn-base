<template>
	<!-- 通知详情 -->
	<div class="tzxq">
		<div style="padding: 0.3rem 0.3rem 0;">
			<div class="tzxq_conten">
				<p>{{details.tznr}}。</p>
				<div class="btn_box">
					<div class="text_btn" @click="setId(details.zzsqId)">
						查看详情
					</div>
				</div>
			</div>
		</div>

		<div class="text_conten">
			<div>
				<p>勤学不问苦滋味，敢把青春换风流。</p>
				<p>长羡学霸勤策马，惯为逆水勇行舟。</p>
				<p>笑迎考试心淡定，面对磨炼靠自修。</p>
				<p>豪情似火燃自信，莘莘学子不言愁。</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				xxzxId:null,
				details:[], //详情
			}
		},
		mounted() {
			this.xxzxId = this.$route.query.xxzdId;
			this.getList();
		},
		methods:{
			// 详情
			getList(){
				let _this = this;
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				let formData1 = new FormData();
				formData1.append("xxzxId", _this.xxzxId);
				_this.$http({
				        method: 'post',
						url: PUBLICURL + 'zzsq/xxzxInfo',
						data: formData1,
						headers: { "Content-Type": "multipart/form-data" }
				    }).then(json => {
						if (json.data.result === 200 ){
							_this.details = json.data.data.bsXxzx;
							console.log(_this.details)
						}
						_this.$toast.clear();
					}).catch(function(error) {
						_this.$toast.clear();
				        console.log(error);
				    });
			},
            //跳转详情
            setId(id){
            	// let url = item.sqzt == 3 ? '/listdetail' : item.sqzt == -1 ? '/listdetailtwo' : item.sqzt == 2 ? '/listdetailthree' : ''
            	this.$router.push({
            		path: '/listdetailthree',
            		query:{
            			id: id
            		}
            	})
            },
		}
	}
</script>

<style scoped>
	.tzxq{
		min-height: 100vh;
	}
	.tzxq_conten{
		padding: 0.8rem 0.3rem 0.6rem;
		background-color: #FFFFFF;
		border-radius: 0.15rem;
	}
	.tzxq_conten>p{
		font-size: 0.3rem;
		color: #1D5687;
		line-height: 0.52rem;
	}
	.btn_box{
		width: 100%;
		height: 0.72rem;
		padding-top: 0.3rem;
	}
	.text_btn{
		height: 0.7rem;
		border-radius: 0.4rem;
		border: 1px solid #636BF6;
		color: #636BF6;
		line-height: 0.75rem;
		float: right;
		padding: 0 0.3rem;
	}
	.text_conten{
		width: 100%;
		height: 60vh;
		background: url(/static/img/img_news.png) no-repeat left top;
		background-size: auto 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.text_conten p{
		text-align: center;
		font-size: 0.4rem;
		font-family: SimSun;
		margin: auto;
		color: #1D5687;
		line-height: 1rem;
		opacity: 0.5;
	}
</style>
