<!-- 手动签名 -->
<template>
    <div class="page page-fixed">
        <div class="page-title">
            <p>请在下方手写区域完成手动签名</p>
            <p>签名时间：{{currentDate}}</p>
        </div>
        <div class="clear-btn-box">
            <div class="clear-btn" @click="handleReset">清除</div>
        </div>
        <!-- 手写签名 -->
        <div class="canvas_box">
            <canvas ref="canvas" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp" @touchstart="touchStart"
                @touchmove="touchMove" @touchend="touchEnd"></canvas>
        </div>
        <div class="btn-box">
            <button class="submit_btn" @click="handleGenerate">保存签名</button>
            <button class="del_btn" @click="goBack">取消签名</button>
        </div>
    </div>
</template>

<script>
    import {formatDate} from '@/common/date'
    export default {
        props: {

        },
        data() {
            return {
                //当前日期
                currentDate: formatDate(new Date(), 'yyyy.MM.dd'),

                lineWidth: 3,
                lineColor: '#171520',
                isCrop: false,
                areaWidth: null,
                areaHeight: null,
                hasDrew: false,
                points: [],
                canvasTxt: null,
                startX: 0,
                startY: 0,
                isDrawing: false,
                sratio: 1
            }
        },
        computed: {

        },
        methods: {
            goBack() {
                //console.log("点击了浏览器的返回按钮");
                this.$emit('hideAutograph');
            },
            //清空
            handleReset() {
                this.reset()
            },
            //生成图片
            handleGenerate() {
                this.generate().then(res => {
                    this.$emit('saveAutograph', res, new Date());
                }).catch(err => {
                    this.$toast('您还没有签名'); // 画布没有签字时会执行这里 'Not Signned'
                })
            },



            $_resizeHandler() {
                const canvas = this.$refs.canvas;
                //获取屏幕的宽度
                let clientWidth = document.documentElement.clientWidth;
                this.areaWidth = Math.floor(clientWidth * 828 / 828);
                this.areaHeight = Math.floor(clientWidth * 414 / 828);
                canvas.height = this.areaHeight;
                canvas.width = this.areaWidth;

                this.canvasTxt = canvas.getContext('2d')
                this.canvasTxt.scale(1 * this.sratio, 1 * this.sratio)
                this.canvasTxt.scale(1 / this.sratio, 1 / this.sratio);
            },
            // pc
            mouseDown(e) {
                e = e || event
                e.preventDefault()
                this.isDrawing = true
                this.hasDrew = true
                let obj = {
                    x: e.offsetX,
                    y: e.offsetY
                }
                this.drawStart(obj)
            },
            mouseMove(e) {
                e = e || event
                e.preventDefault()
                if (this.isDrawing) {
                    let obj = {
                        x: e.offsetX,
                        y: e.offsetY
                    }
                    this.drawMove(obj)
                }
            },
            mouseUp(e) {
                e = e || event
                e.preventDefault()
                let obj = {
                    x: e.offsetX,
                    y: e.offsetY
                }
                this.drawEnd(obj)
                this.isDrawing = false
            },
            // mobile
            touchStart(e) {
                e = e || event
                e.preventDefault()
                this.hasDrew = true
                if (e.touches.length === 1) {
                    let obj = {
                        x: e.targetTouches[0].clientX - this.$refs.canvas.getBoundingClientRect().left,
                        y: e.targetTouches[0].clientY - this.$refs.canvas.getBoundingClientRect().top
                    }
                    this.drawStart(obj)
                }
            },
            touchMove(e) {
                e = e || event
                e.preventDefault()
                if (e.touches.length === 1) {
                    let obj = {
                        x: e.targetTouches[0].clientX - this.$refs.canvas.getBoundingClientRect().left,
                        y: e.targetTouches[0].clientY - this.$refs.canvas.getBoundingClientRect().top
                    }
                    this.drawMove(obj)
                }
            },
            touchEnd(e) {
                e = e || event
                e.preventDefault()
                if (e.touches.length === 1) {
                    let obj = {
                        x: e.targetTouches[0].clientX - this.$refs.canvas.getBoundingClientRect().left,
                        y: e.targetTouches[0].clientY - this.$refs.canvas.getBoundingClientRect().top
                    }
                    this.drawEnd(obj)
                }
            },
            // 绘制
            drawStart(obj) {
                this.startX = obj.x
                this.startY = obj.y
                this.canvasTxt.beginPath()
                this.canvasTxt.moveTo(this.startX, this.startY)
                this.canvasTxt.lineTo(obj.x, obj.y)
                this.canvasTxt.lineCap = 'round'
                this.canvasTxt.lineJoin = 'round'
                this.canvasTxt.lineWidth = this.lineWidth * this.sratio
                this.canvasTxt.stroke()
                this.canvasTxt.closePath()
                this.points.push(obj)
            },
            drawMove(obj) {
                this.canvasTxt.beginPath()
                this.canvasTxt.moveTo(this.startX, this.startY)
                this.canvasTxt.lineTo(obj.x, obj.y)
                this.canvasTxt.strokeStyle = this.lineColor
                this.canvasTxt.lineWidth = this.lineWidth * this.sratio
                this.canvasTxt.lineCap = 'round'
                this.canvasTxt.lineJoin = 'round'
                this.canvasTxt.stroke()
                this.canvasTxt.closePath()
                this.startY = obj.y
                this.startX = obj.x
                this.points.push(obj)
            },
            drawEnd(obj) {
                this.canvasTxt.beginPath()
                this.canvasTxt.moveTo(this.startX, this.startY)
                this.canvasTxt.lineTo(obj.x, obj.y)
                this.canvasTxt.lineCap = 'round'
                this.canvasTxt.lineJoin = 'round'
                this.canvasTxt.stroke()
                this.canvasTxt.closePath()
                this.points.push(obj)
                this.points.push({
                    x: -1,
                    y: -1
                })
            },
            // 操作
            generate() {
                const pm = new Promise((resolve, reject) => {
                    if (!this.hasDrew) {
                        reject(`Warning: Not Signned!`)
                        return
                    }
                    var resImgData = this.canvasTxt.getImageData(0, 0, this.$refs.canvas.width, this.$refs.canvas
                        .height)
                    this.canvasTxt.globalCompositeOperation = "destination-over"
                    this.canvasTxt.fillStyle = 'transparent'
                    this.canvasTxt.fillRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
                    this.resultImg = this.$refs.canvas.toDataURL()
                    var resultImg = this.resultImg
                    this.canvasTxt.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
                    this.canvasTxt.putImageData(resImgData, 0, 0)
                    this.canvasTxt.globalCompositeOperation = "source-over"
                    if (this.isCrop) {
                        const crop_area = this.getCropArea(resImgData.data)
                        var crop_canvas = document.createElement('canvas')
                        const crop_ctx = crop_canvas.getContext('2d')
                        crop_canvas.width = crop_area[2] - crop_area[0]
                        crop_canvas.height = crop_area[3] - crop_area[1]
                        const crop_imgData = this.canvasTxt.getImageData(...crop_area)
                        crop_ctx.globalCompositeOperation = "destination-over"
                        crop_ctx.putImageData(crop_imgData, 0, 0)
                        crop_ctx.fillStyle = 'transparent'
                        crop_ctx.fillRect(0, 0, crop_canvas.width, crop_canvas.height)
                        resultImg = crop_canvas.toDataURL()
                        crop_canvas = null
                    }
                    resolve(resultImg)
                })
                return pm
            },
            reset() {
                this.canvasTxt.clearRect(
                    0,
                    0,
                    this.$refs.canvas.width,
                    this.$refs.canvas.height
                )
                this.$emit('update:bgColor', '')
                // this.$refs.canvas.style.background = 'rgba(255, 255, 255, 0)'
                this.points = []
                this.hasDrew = false
                this.resultImg = ''
            },
            getCropArea(imgData) {
                var topX = this.$refs.canvas.width;
                var btmX = 0;
                var topY = this.$refs.canvas.height;
                var btnY = 0
                for (var i = 0; i < this.$refs.canvas.width; i++) {
                    for (var j = 0; j < this.$refs.canvas.height; j++) {
                        var pos = (i + this.$refs.canvas.width * j) * 4
                        if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                            btnY = Math.max(j, btnY)
                            btmX = Math.max(i, btmX)
                            topY = Math.min(j, topY)
                            topX = Math.min(i, topX)
                        }
                    }
                }
                topX++
                btmX++
                topY++
                btnY++
                const data = [topX, topY, btmX, btnY]
                return data
            }

        },
        beforeMount() {
            window.addEventListener('resize', this.$_resizeHandler)
        },
        mounted() {
            // 向历史记录中插入了当前页并监听浏览器返回
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }


            this.$_resizeHandler()
            // 在画板以外松开鼠标后冻结画笔
            document.onmouseup = () => {
                this.isDrawing = false
            }
        },
        beforeCreate() {
            document.querySelector('body').setAttribute('style', 'overflow:hidden')
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.$_resizeHandler)
            document.querySelector('body').removeAttribute('style')
        },
        destroyed() {
            //console.log("移除了监听");
            window.removeEventListener('popstate', this.goBack, false);
        },

    }
</script>

<style scoped>
    .page {
        min-height: 100vh;
        background-color: #fff;
    }

    .page-fixed {
        width: 100%;
        position: fixed;
        z-index: 9;
        top: 0;
		left: 0;
        padding: 0 !important;
    }

    .page-title {
        padding: .8rem 0;
    }

    .page-title p {
        font-size: .3rem;
        text-align: center;
        color: #171520;
        line-height: 1;
    }

    .page-title p:last-child {
        margin-top: .2rem;
    }

    .clear-btn-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-right: .3rem;
    }

    .clear-btn {
        width: 1.3rem;
        height: .46rem;
        line-height: .46rem;
        border: 1px #636BF6 solid;
        border-radius: .23rem;
        color: #636BF6;
        font-size: .24rem;
        text-align: center;
    }

    canvas {
        display: block;
        background: url(/static/img/bg_handwriting.png);
    }

    .canvas_box {
        position: relative;
        margin-top: .4rem;
    }

    .btn-box {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        width: 4.5rem;
        margin-left: -2.25rem;
    }

    .del_btn {
        margin-top: 1rem;
    }
</style>
