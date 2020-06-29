<template>
	<div class="submit">
		<div class="sub_img">
			<img src="/static/img/img_jl.png" alt="">
		</div>
		<div class="sub_title">张三同学，你属于记录在档的“特困供养学生”可以提交困难生生活补助资助申请</div>
		<div class="grxx_tj">
		    <button class="submit_btn" @click="hangleBtn">提交</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{}
		},
		methods:{
			// 提交信息
			hangleBtn(){
				
			}
		}
	}
</script>

<style scoped>
	.submit{
		min-height: 100vh;
		background-color: #fff;
	}
	.sub_img img{
		width: 5.04rem;
		display: block;
		margin: 0 auto;
		padding-top: 2.4rem;
	}
	.sub_title{
		font-size: .28rem;
		color: #171520;
		width: 5.58rem;
		margin:  0 auto;
		line-height:.48rem;
		text-align: center;
		margin-top: .91rem;
	}
	.grxx_tj {
	    display: flex;
	    /* justify-content: center; */
	    /* align-items: center; */
		position: fixed;
		bottom: 1.37rem;
		left: 50%;
		margin-left: -27%;
	}
</style>
