<!-- 发放详情 -->
<template>
    <div class="ffxq-page">
        <div class="ffxq-banner"><img src="/static/img/img_ffxq01.png" /></div>
        <div v-if="ffxqshow">
            <div class="ffxq-content">
                <p class="res-dec">{{ ffxqData.xm }}同学，你申请的{{ fatherData.newDate}}学年{{ fatherData.reserved1 }}已完成发放。请自行查询款项到账情况，确认无误后完成确认到账操作。</p>
                <ul>
                    <li>发放方式：<span>{{ ffxqData.zzffVo.fffs == 0 ? '银行卡转账' : ''}}</span></li>
                    <li>发放卡号：<span><i>{{ ffxqData.zzffVo.ffkh }}</i>【{{ ffxqData.zzffVo.ffyh }}】</span></li>
                    <li>发放金额：<span>{{ ffxqData.zzffVo.ffje }}元</span></li>
                    <li>发放时间：<span>{{ ffxqData.zzffVo.ffsj }}</span></li>
                </ul>
            </div>
            <div class="btn" @click="qrdz" v-if="btnShow && fatherData.qrff != 1 ">确认到账</div>
        </div>
        <div v-else>
            <div class="ffxq-content">
                <p class="res-dec">同学，你申请的{{ fatherData.newDate}}学年{{ fatherData.reserved1 }},暂时没有发放信息。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fatherData:{},
                ffxqData: { // 发放详情数据
                    xm: 'xx',
                    zzffVo: {
                        fffs: 0,
                        ffkh: '6665********8888',
                        ffyh: '建设银行',
                        ffje: '1000',
                        ffsj: '2019-08-08 00:00:00'
                    }
                },
                btnShow: true,
                ffxqshow: false,
                submitFlag: false// 防重复
            }
        },
		mounted(){
            this.fatherData = this.$route.query
            this.getZzffInfo()
        },
        methods: {
            // 获取发放详情
            getZzffInfo(){
                let _this = this;
                let formData = new FormData();
                formData.append('zzsqId', _this.fatherData.id)
				_this.$toast.loading({
					message: '加载中...',
					forbidClick: true,
					duration: 0,
				});
				_this.$http({
                        method: 'post',
                        url: PUBLICURL + 'zzsq/zzffInfo',
                        data: formData,
                        headers: { "Content-Type": "multipart/form-data" }
                    }).then(json => {
                        _this.$toast.clear();
                        if(json.data.result === 200){
                            _this.ffxqData = json.data.data
                            _this.ffxqshow = true
                        }
					}).catch(function(error) {
						_this.$toast.clear();
                        console.log(error);
                    });
            },
            qrdz(){
                let _this = this
                 _this.$dialog.confirm({
                    title: '确认到账',
                    message: '是否确认到账'
                }).then(() => { 
                    _this.$toast.loading({
                        message: '确认中...',
                        forbidClick: true,
                        duration: 0,
                    });
                    if(_this.submitFlag) return;
                    _this.submitFlag = true;
                    _this.$http({
                        method: 'post',
                        url: PUBLICURL + 'my/acc',
                        data: {zzsqId: _this.fatherData.id},
                    }).then(json => {
                        _this.$toast.clear();
                        if(json.data.result === 200){

                            setTimeout(()=>{ // 防重
                                _this.submitFlag = false;
                            }, 2000);

                            _this.$dialog.alert({
                                message: '您已确认到账'
                            }).then(() => {
                                this.btnShow = false
                            })
                        } else {
                            _this.submitFlag = false;
                        }
                    }).catch(function(error) {
                        _this.submitFlag = false;
                        _this.$toast.clear();
                        console.log(error);
                    });
                }).catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
.ffxq-page{
    min-height: 100vh;
    background-color: #fff;
}
.ffxq-page .ffxq-banner img{
    width: 100%;
}
.ffxq-content{
    padding: .5rem .3rem 0;
    line-height: 1;
    color: #595969;
}
.ffxq-content .res-dec{

    font-size: .3rem;
    line-height: 1.5;
}
.ffxq-content ul{
    margin: .8rem 0 1.5rem;
}
.ffxq-content ul li{
    margin-bottom: .3rem;
    font-size: .28rem;

}
.ffxq-content li span{
    color: #171520;
    font-weight: 500;
}
.ffxq-content li span i{
    font-style: normal;
    margin-right: .2rem;
}
.ffxq-page .btn{
    width: 4.5rem;
    line-height: 1;
    padding: .3rem 0;
    margin: 0 auto;
    text-align: center;
    border-radius: .9rem;
    border: 1px solid #CAAC73;
    color: #CAAC73;
    font-size: .34rem;
}
</style>
