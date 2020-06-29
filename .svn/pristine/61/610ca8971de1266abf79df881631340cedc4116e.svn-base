<template>
	<div :style="{height: height + 'px'}" style="background-color: #FFFFFF;width: 100%;">
		<!-- 404页面 -->
		<div class="err_img">
			<img src="/static/img/404.png" alt="">
		</div>
		<p class="sxym" @click="sxym"><span><img src="/static/img/icon_shuaxin.png" alt=""></span><span class="text">刷新页面</span></p>
		<div class="sxym">
			<button class="submit_btn" @click="goHome">回首页</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				height: document.body.clientHeight
			}
		},
		mounted(){
			// console.log(this.$route)
		},
		methods:{
			//刷新页面
			sxym(){
				this.$router.go(0);
				// let name = this.$route.redirectedFrom;
				// console.log(this.$route)
				// this.$router.push(name)
				// console.log(name)
				// if(name){
				// 	this.$router.push(name)
				// 	console.log(typeof name)
				// }else{
				// 	this.$router.go(0)
				// 	console.log(2)
				// }
			},
			//回首页
			goHome(){
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>
	.err_img{
		width: 4.21rem;
		margin: 0 auto;
		padding: 2rem 0 1rem;
	}
	.err_img img{
		width: 100%;
		height: auto;
	}
	.sxym{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 0 1rem;
	}
	.sxym span{
		display: inline-block;
	}
	.sxym span img{
		width: 0.32rem;
		height: auto;
	}
	.text{
		margin-left: 0.15rem;
		font-size: 0.3rem;
		color: #636BF6;
	}
</style>
