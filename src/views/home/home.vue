<template>
	<div class="page">
        <div class="head-bar">
			<img src="" alt="">
			环保数据
        </div>
		<div class="card">
			<div class="item">
				<p class="type">预警告警</p>
				<div class="ctx">
					<p >水体污染</p>
					<span class="tip">超出标准</span>
				</div>
			</div>
			<div class="item">
				<p class="type">税务核算</p>
				<div class="ctx">
					<div>
						水体污染超出指标10%，如本季度未控制排放，税收将增加
					</div>
				</div>
			</div>
		</div>

		<div class="my-chart">
			<div class="title">
				企业污染物排放类型分布（kg）
			</div>
			<div ref="myChart"  style="width:320px;height: 220px"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{

			}
		},
		created(){

		},
		mounted(){
			setTimeout(()=>{
				this.chartShow()
			},500)

		},
		methods:{
			chartShow() {
				let myChart = this.$echarts.init(this.$refs.myChart)
				// 绘制图表
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} 占比({d}%)"
					},
					grid: {
						left: '0',
						right: '0',
						bottom: '0',
						containLabel: true
					},
					series: [
						{
							type: 'pie',
							radius: '80%',
							center: ['50%', '50%'],
							data: [
								{value: 1, name: '后台_bug'},
								{value: 3, name: 'IOS_bug'},
								{value: 7, name: 'Android_bug'},
								{value: 4, name: 'H5_bug'},
							],
						}
					]
				})
			},
		}
	}
</script>
<style>
	.van-tabbar--fixed{
		height: 100px;
		border-top: solid 0.5px #B3B3B3!important;
		background:rgba(247,247,247,1);
	}
</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		.head-bar{
			width: 100%;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			height:170px;
			line-height:120px;
			background:linear-gradient(315deg,rgba(24,148,88,1) 0%,rgba(39,166,101,1) 100%);
		}
		.card{
			width:684px;
			height:268px;
			background:rgba(255,255,255,1);
			box-shadow:0px 4px 10px 0px rgba(0,0,0,0.11);
			border-radius:10px;
			top: 100px;
			left: 33px;
			z-index: 10;
			position: fixed;
			text-align: left;
			font-size:32px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:44px;
			box-sizing: border-box;
			padding: 26px 30px;
			display: flex;
			justify-content: space-between;
			.item{
				flex: 1;
				font-size:22px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				>p{
					font-size:28px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40px;
				}
				.ctx{
					width:290px;
					height:160px;
					margin-top: 10px;
					background:rgba(247,247,247,1);
					border-radius:10px;
					padding: 14px 18px;
					box-sizing: border-box;
					.tip{
						font-size:22px;
						font-weight:400;
						color:#FF3A3A;
					}
				}
			}
		}
		.my-chart{
			width:684px;
			height:508px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-top:220px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.title{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:40px;
				margin: 30px 0;
			}
		}
	}
</style>
