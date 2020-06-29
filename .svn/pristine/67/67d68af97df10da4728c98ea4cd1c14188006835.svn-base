<template>
	<!-- 我的资助 -->
	<div class="wdzz" v-if="zzList">
		<div v-if="zzList.length > 0">
            <div class="top_box">
            	<ul class="top_ul">
            		<li>
            			<h3>{{ myZz.zzffCount }}</h3>
            			<p>受助次数</p>
            		</li>
            		<li>
            			<h3>{{ myZz.moneyNum }}</h3>
            			<p>受助总额(元)</p>
            		</li>
            		<li class="dz_color">
            			<h3>{{ myZz.arriveMoney}}</h3>
            			<p>到账金额(元)</p>
            		</li>
            	</ul>
            </div>

            <div class="conten_box">
            	<div class="conten_padding">
            		<div class="items_box1" :class="{ 'items_box1_bg': index>0 }" v-for="(item,index) in zzList" :key="index">
            			<h4 class="item_title">{{ item.ffjd | ffjd() }}阶段</h4>
            			<div v-for="(item,index) in item.arr" :key="index">
            				<div class="item" v-if="item.ffzt > 0">
            					<div class="item_top">
            						<div class="item_top_l">
            							{{ item.ffsj&&item.ffsj.split(' ')[0] }}
            						</div>
            						<div class="item_top_r">
            							<span style="margin-right: 0.2rem;">{{ item.ffje }}元</span>
            							<span>【{{ item.ffzt == 1 ? '已发放' : '已到账' }}】</span>
            						</div>
            					</div>
            					<div class="item_bottom">
            						<div class="item_bottom_l">
            							{{ item.zzzcMc }}
            						</div>
            						<!-- <div class="item_bottom_r">
            							【未到账】
            						</div> -->
            					</div>
            				</div>
            				<div class="item" v-else>
            					<div class="item_bottom">
            						<div class="item_bottom_l">
            							{{ item.zzzcMc }}
            						</div>
            						<div class="item_bottom_r">
            							【{{ item.ffzt == 1 ? '未发放' : '已发放' }}】
            						</div>
            					</div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>
        </div>
        <div v-else class="noData">
            <img src="/static/img/img_black.png" alt="">
            <p>您暂时没有资助</p>
        </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				myZz: {
					zzffCount: '0',
					arriveMoney: 0,
					moneyNum: 0
				},
				zzList: null,
			}
		},
		mounted(){
			this.getMyZzff()
		},
		filters: {
			ffjd(value){
				switch (value) {
			        case 1:
			          return '学前教育'
			        case 2:
			          return '义务教育'
					case 3:
			          return '中职'
					case 4:
			          return '普高'
					case 5:
			          return '高校'
			      }
			}
		},
		methods: {
			// 获取我的资助信息
			getMyZzff(){
				let _this = this;
				let arr1 = [], arr2= [], arr3 = [], arr4 = [], arr5 = []
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
                        method: 'post',
						url: PUBLICURL + 'my/myZzff'
                    }).then(json => {
						_this.$toast.clear();
						if(json.data.data.zzffs != null){
							_this.myZz = json.data.data;
							_this.zzList = _this.changeArr(_this.myZz.zzffs)
						}else{
                            _this.zzList = [];
                        }

					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
			},
			//对返回的数组经行修改
			changeArr(arr){
				let newArr = []
				for (let i of arr) {
					if (newArr.length === 0) {
					newArr.push({ffjd: i.ffjd, arr: []})
					newArr[0].arr.push(i)
					} else {
					let is = false
					for (let j of newArr) {
						if (j.ffjd === i.ffjd) {
						j.arr.push(i)
						is = true
						}
					}
					if (!is) {
						newArr.push({ffjd:i.ffjd, arr: []})
						newArr[newArr.length - 1].arr.push(i)
					}
					}
				}
				return newArr
			}
		}
	}
</script>

<style scoped>
	.item{
		padding: 0.3rem;
		font-size: 0.3rem;
		background-color: #FFFFFF;
		/* border-radius: 0.15rem; */
		margin-top: 0.4rem;
		position: relative;
		box-shadow:0 0 0.15rem 0 rgba(237,237,238,0.8);
	}
	.item::after{
		content: " ";
		width: 0.08rem;
		height: 0.08rem;
		background-color: #FFFFFF;
		border: 0.06rem solid #5C7FFF;
		border-radius: 0.2rem;
		position: absolute;
		left: -0.34rem;
		top: 50%;
		margin-top: -0.1rem;
	}

	.item_top,.item_bottom{
		display: flex;
		justify-content: space-between;
	}
	.item_top{
		margin-bottom: 0.25rem;
	}
	.item_bottom{
		color: #262636;
	}
	.item_top_r{
		color: #CAAC73;
		display: flex;
		align-items: center;
	}
	.item_top .item_top_l{
		font-size: 0.28rem;
		color: #595969;
		height: 0.52rem;
		padding: 0 0.3rem;
		border-radius: 0.52rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F3F3F3;
	}
	.conten_box{
		padding: 0.5rem 0.3rem 0.3rem 0.75rem;
	}
	.conten_padding{
		padding-left: 0.24rem;
		border-left: 1px solid #5C7FFF;
	}
	.item_title{
		height: 0.3rem;
		font-size: 0.36rem;
		line-height: 0.3rem;
		position: relative;
		color: #171520;
	}
	.item_title::after{
		content: " ";
		width: 0.06rem;
		height: 0.06rem;
		background-color: #FFFFFF;
		border-radius: 0.3rem;
		border: 0.12rem solid #5C7FFF;
		position: absolute;
		left: -0.39rem;
		top: 0;

	}
	.dz_color{
		color: #CAAC73;
	}
	.item_title{
		margin-top: 0.6rem;
	}
	.items_box1:first-child .item_title:first-child{
		margin-top: 0;
	}
	.items_box1:last-child .item:last-child::before{
		content: " ";
		width: 0.06rem;
		height: 50%;
		position: absolute;
		left: -0.27rem;
		bottom: 0;
		background-color: #EEEEEE;
	}
	.items_box1_bg .item_title::after{
		border-color: #BECAF8;
	}
	.items_box1_bg .item::after{
		border-color: #BECAF8;
	}






	.top_box{
		padding: 0.3rem;
	}
	.top_ul{
		display: flex;
	}
	.top_ul li{
		flex: 1;
		margin-right: 0.3rem;
		background-color: #FFFFFF;
		height: 1.6rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #1D5687;
		border-radius: 0.15rem;
	}
	.top_ul li:last-child{
		margin-right: 0;
	}
	.top_ul .dz_color{
		color: #CAAC73;
	}
	.top_ul li h3{
		font-size: 0.4rem;
		margin-bottom: 0.1rem;
	}
	.top_ul li p{
		font-size: 0.24rem;
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
