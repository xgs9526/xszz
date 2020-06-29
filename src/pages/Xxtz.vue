<template>
	<!-- 消息通知 -->
	<div class="xxtz" v-if="list">
		<div v-if="list.length > 0">
            <van-list
            	v-model="loading"
            	:finished="finished"
            	finished-text="没有更多了"
            	:error.sync="error"
            	error-text="请求失败，点击重新加载"
            	@load="onLoad"
            >
            	<ul class="xxtz_ul">
            		<li v-for="(item, index) in list" :key="index">
            			<div class="time_father">
            				<span class="time_span">{{item.createTime && item.createTime.slice(5)}}</span>
            			</div>
            			<div class="text_box" :class="[item.tzzt == 0 ? 'text_color' : '']" @click="setPush(item.xxzxId)">
            				<h3 class="tz">
            					通知
            					<div class="tz_img" v-if="item.tzzt == 0">
            						<img src="/static/img/icon_tips.png" alt="">
            					</div>
            				</h3>
            				<p class="text_conten">
            					{{item.tznr}}
            				</p>
            			</div>
            		</li>
            		<!-- <li>
            			<div class="time_father">
            				<span class="time_span">04-03 14:04</span>
            			</div>
            			<div class="text_box" @click="setPush">
            				<h3 class="tz">
            					通知
            					<div class="tz_img" v-if="1 > 1">
            						<img src="/static/img/icon_tips.png" alt="">
            					</div>
            				</h3>
            				<p class="text_conten">
            					张晓婷，你于2020.04.03申请的国家助学金审核不通过，具体原因可联系教育部门进行咨询。
            				</p>
            			</div>
            		</li>
            		<li>
            			<div class="time_father">
            				<span class="time_span">2018-03-02 19:08</span>
            			</div>
            			<div class="text_box" @click="setPush">
            				<h3 class="tz">
            					通知
            					<div class="tz_img" v-if="1 > 1">
            						<img src="/static/img/icon_tips.png" alt="">
            					</div>
            				</h3>
            				<p class="text_conten">
            					申请类型新增“助学金申请”项。
            				</p>
            			</div>
            		</li> -->
            	</ul>
            </van-list>
        </div>
        <div v-else class="noData">
            <img src="/static/img/img_black.png" alt="">
            <p>您暂时没有通知</p>
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				list: null, //消息列表
				finished: false,			//出现没有更多了
				loading: false,				//旋转动画
				error: false,				//请求失败
				userId:null,
				params: {
					currPage: 0,
					pageLimit: 10
				}
			}

		},
		mounted(){
			this.onLoad();
		},
		methods:{
			//自动加载数据
			onLoad(){
				this.params.currPage  =  this.params.currPage+1;
				// 加载状态结束
				let _this = this;
				_this.getList();
			},
			// 通知列表
			getList(){
				let _this = this;
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
				        method: 'post',
						url: PUBLICURL + 'zzsq/getXxzx',
						data: _this.params
				    }).then(json => {
                        _this.list = [];
						if (json.data.result === 200 ){
							if(json.data.data.xxzxs.length > 0 && json.data.data.xxzxs.length == 10){
								// 加载状态结束
								for (let i = 0; i < json.data.data.xxzxs.length; i++) {
									_this.list.push(json.data.data.xxzxs[i]);
								}
								_this.loading = false;
							} else if (json.data.data.xxzxs.length > 0 && json.data.data.xxzxs.length < 10) {
								// 数据全部加载完成
								for (let i = 0; i < json.data.data.xxzxs.length; i++) {
									_this.list.push(json.data.data.xxzxs[i]);
								}
								_this.loading = false;
								_this.finished = true;
							} else {                                
								_this.finished = true;
							}
						}
						_this.$toast.clear();
					}).catch(function(error) {
						_this.$toast.clear();
				        console.log(error);
				    });
			},
			//跳转详情
			setPush(id){
				this.$router.push({
					path:'/tzxq',
					query:{
						xxzdId:id
					}
				})
			}
		}
	}
</script>

<style scoped>
	.xxtz{
		padding: 0 0.3rem 0.3rem;
	}
	.time_father{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.4rem 0;
	}
	.time_span{
		display: block;
		text-align: center;
		height: 0.4rem;
		line-height: 0.45rem;
		background-color: #DFDFDF;
		color: #FFFFFF;
		border-radius: 0.3rem;
		padding: 0 0.2rem;
	}
	.text_box{
		padding: 0.4rem 0.3rem 0.35rem;
		border-radius: 0.15rem;
		background-color: #FFFFFF;
		color: #A1A1A1;
		margin-bottom: 0.4rem;
	}
	.text_color{
		color: #1D5687;
	}
	.tz{
		font-size: 0.36rem;
		height: 0.5rem;
		line-height: 0.5rem;
		position: relative;
		width: 100%;
		margin-bottom: 0.2rem;
	}
	.tz_img{
		width: 0.18rem;
		height: 0.18rem;
		position: absolute;
		right: 0;
		top: 0;
	}
	.tz_img img{
		width: 100%;
		height: auto;
	}
	.text_conten{
		line-height: 0.4rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
