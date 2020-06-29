<template>
	<!-- 历年申请记录 -->
	<div class="sqjl"  v-if="list">
		<div class="sqjl_box">
			<div>
				<ul class="nav_list">
					<li v-for="(item,i) in navData" :class="[navZt == item.zt ? 'list_bg':'']" :key="item.zt" @click="getNavZt(item.zt)">
						{{item.text}}
					</li>
					<!-- <li class="list_bg">待审核</li>
					<li>审核中</li>
					<li>通过</li>
					<li>未通过</li> -->
				</ul>
			</div>

			<div class="list_data" v-if="list.length>0">
				<ul>
					<li v-for="(item,i) in list" :key="i" :class="[item.sqzt == -1 ? 'defaut':'' ]" @click="setId(item.id)">
						<h3>{{item.zzzcMc}}</h3>
						<p>【<span>{{item.schoolMc}}</span>】<span>{{item.newDate}}</span>学年</p>
						<div class="clearfix">
							<div class="item_box left clearfix">
								<img v-if="item.sqzt == -1" src="/static/img/icon_student_i.png" alt="">
								<img v-else src="/static/img/icon_student_n.png" alt="">
								<span>{{item.studentXm}}</span>
							</div>
							<div class="time right">
								{{item.sqSj.split(' ')[0]}}
							</div>
						</div>
						<div class="shzt">
							<img v-if="item.sqzt == 1" src="/static/img/label_shz.png" alt="">
							<img v-else-if="item.sqzt == 2" src="/static/img/label_shtg.png" alt="">
							<img v-else-if="item.sqzt == 3" src="/static/img/label_fsz.png" alt="">
							<img v-else-if="item.sqzt == 4" src="/static/img/label_fstg.png" alt="">
							<img v-else src="/static/img/label_shwtg.png" alt="">
						</div>
					</li>
				</ul>
			</div>
            <div v-else class="noData">
                <img src="/static/img/img_black.png" alt="">
                <p>您暂时没有此类型的申请</p>
            </div>

		</div>

	</div>
</template>

<script>
	export default{
		data(){
			return {
				navZt: 0,			//初始化状态
				//导航栏数据
				navData:[
					{text:'全部',zt: 0},
					{text:'未通过',zt: -1},
					// {text:'待审核',zt: 1},
					{text:'审核中',zt: 1},
					{text:'复审中',zt: 3},
                    {text:'通过',zt: 2},
                    // {text:'复审通过',zt: 3},
				],
				//数据
				list: null,
			}
		},
		mounted(){
			this.getSqList()
		},
		methods:{
			//切换导航状态
			getNavZt(nav){
				this.navZt = nav
				this.getSqList()
			},
			//获取申请记录
			getSqList(){
				let _this = this;
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.list = []
				_this.$http({
                        method: 'post',
						url: PUBLICURL + 'my/getSqList',
						data: {sqzt: _this.navZt}
                    }).then(json => {
						if (json.data.result === 200 ){
							_this.list = _this.changeTime('sqSj', json.data.data.zzsqVoList, 'newDate')
						}
						_this.$toast.clear();
					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
			},
			//时间修改
			changeTime (targetKeyName, arr, newKeyName) {
				for (let i of arr) {
					let returnStr = Number(i[targetKeyName].slice(0, 4))
					let m = i[targetKeyName].slice(5, 7)
					m = Number(m)
					if (m >= 9) returnStr = `${returnStr}-${returnStr + 1}`
					else returnStr = `${returnStr - 1}-${returnStr}`

					i[newKeyName] = returnStr
				}

				return arr
			},
			//跳转详情
			setId(id){
				let url = id == 3 ? '/listdetail' : id == -1 ? '/listdetailtwo' : '/listdetailthree'
				this.$router.push({
					path: url,
					query:{
						id: id
					}
				})
			},
		}
	}
</script>

<style scoped>
	.sqjl{
		padding: 0.3rem;
	}
	.sqjl_box{
		padding: 0.3rem;
		background-color: #FFFFFF;
		border-radius: 0.15rem;
	}
	.nav_list{
		display: flex;
		flex-flow: nowrap;
		/* padding-bottom: 0.4rem; */
		margin-bottom: 0.5rem;
	}
	.nav_list li{
		line-height: 0.5rem;
		font-size: 0.32rem;
		color: #595969;
		margin-right: 0.4rem;
		position: relative;
	}
	.nav_list li:last-child{
		margin-right: 0;
	}
	.nav_list .list_bg{
		color: #262636;
		font-size: 0.4rem;
		font-weight: bold;
	}
	.list_bg:after{
		content: ' ';
		display: block;
		position: absolute;
		width: 0.4rem;
		height: 0.12rem;
		bottom: -0.2rem;
		left: 50%;
		margin-left: -0.2rem;
		border-radius: 0.08rem;
		background: -webkit-linear-gradient(to right,#636BF6,#95C5FF);
		background: -o-linear-gradient(to right,#636BF6,#95C5FF);
		background: -moz-linear-gradient(to right,#636BF6,#95C5FF);
		background: linear-gradient(to right,#636BF6,#95C5FF); /* 标准语法 */
	}


	/* 下半部分 */

	.list_data li{
		background-color: #FFFFFF;
		padding: 0.4rem 0;
		/* border-radius: 0.1rem; */
		color: #1D5687;
		position: relative;
		border-bottom: 0.02rem solid #EEEEEE;
	}
	.list_data li:last-child{
		border-bottom: 0;
	}
	.list_data .defaut{
		color: #DADADA;
	}
	.list_data li>h3{
		font-size: 0.36rem;
	}
	.list_data li>p{
		font-size: 0.24rem;
		margin: 0.25rem 0 0.25rem -0.1rem;
	}
	.item_box img{
		width: 0.38rem;
		height: 0.42rem;
	}
	.item_box span{
		display: inline-block;
		line-height: 0.42rem;
		font-size: 0.32rem;
		margin-left: 0.1rem;
	}
	.time{
		line-height: 0.42rem;
		color: #171520;
		font-size: 0.24rem;
	}
	.defaut .time{
		color: #DADADA;
	}
	.shzt{
		position: absolute;
		right: 0;
		top: 0.2rem;
	}
	.shzt img{
		width: 1.3rem;
		height: auto;
	}

	/* 没有数据部分 */
	.home_bg{
		/* height: 10rem; */
	}
	.noda_img img, .mysqjl img{
		width: 100%;
		margin-bottom:0.5rem
	}

    .noData {
        width: 100%;
        height: 10rem;
        padding: 1rem;
        box-sizing: border-box;
    }

    .noData img {
        width: 100%;
    }

    .noData p {
        text-align: center;
    }
</style>
