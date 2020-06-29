<template>
	<div class="layout-box">
		<div class="layout-content">
            <router-view></router-view>
        </div>
		<!-- 首页跟我的页面盒子 -->
		<div class="fiexd-bar">
			<div class="bar_item" @click="setPush('/')">
				<div class="bar_icon">
					<img v-if="iview == '/'" src="/static/img/sy_i.png" alt="">
					<img v-else src="/static/img/sy_n.png" alt="">
				</div>
				<div class="bar_text" :class="[iview == '/' ? 'bar_color' : '']">首页</div>
			</div>
			<div class="bar_item" @click="setPush('/name')">
				<div class="bar_icon">
					<img v-if="iview == '/name'" src="/static/img/wd_i.png" alt="">
					<img v-else src="/static/img/wd_n.png" alt="">
				</div>
				<div class="bar_text" :class="[iview == '/name' ? 'bar_color' : '']">我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				iview: this.$route.path,
			}
		},
		mounted(){

		},
		watch:{
			'$route':function(newData){
				this.iview = newData.path;
			}
		},
		methods:{
			//首页路由跳转
			setPush(name){
				this.$router.push(name)
			}
		}
	}
</script>

<style scoped>
    .layout-box{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .layout-content{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: 1rem;
        box-sizing: border-box;
        position: relative;
    }
	/* 底部导航栏 */
	.fiexd-bar{
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		z-index: 100;
		bottom: 0;
		left: 0;
		height: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
	}
	.bar_item{
        flex: 1;
	}
	.bar_icon{
		width: 0.48rem;
		height: 0.48rem;
		margin: 0 auto .05rem;
	}
	.bar_icon img{
		width: 0.48rem;
		height: auto;
	}
	.bar_text{
		font-size: .2rem;
        font-weight: 500;
		color: #B7B8B8;
		text-align: center;
	}
	.bar_color{
		color: #636BF6;
	}
</style>
