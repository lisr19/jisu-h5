<template>
	<div class="msg">
		<head-bar title="预警告警"></head-bar>
		<div class="msg-content" >
			<ul class="items" >
				<li class="item" v-for="item in 8" @click="">
					<img class="icon" src="@/assets/img/over.png" alt="">
					<p class="num">
						<span class="">1号监测点</span>
						<span class="time">2020-3-16</span>
					</p>
					<div class="text-data">
						<p>排放物：<strong>贡</strong></p>
						<p>
							<span style="margin-right: 15px">测量数据：<em>120kg</em></span>
							<span>标准数据：100kg</span>
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import {getMsgList,updateFlag} from '@/lib/API/comment'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data() {
			return {

			}
		},
		created() {
			// this.userId = localStorage.getItem('userId')
			// this.getMsgList({userId :this.userId,size:this.size,page:1})
		},
		mounted(){

		},
		methods: {

		},
	}
</script>


<style lang="less" scoped>
	.head-bar{
		background: #ffffff;
		color:rgba(51,51,51,1);
	}
	.msg{
		.msg-content{
			padding: 150px 0 50px;
			text-align: left;
			display: flex;
			align-items: center;
			justify-content: center;
			ul{
				li{
					width:700px;
					height:216px;
					background:rgba(255,255,255,1);
					border-radius:10px;
					display: flex;
					margin-bottom: 20px;
					box-sizing: border-box;
					font-size:24px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					padding: 0 30px 30px;
					flex-direction: column;
					position: relative;
					.icon{
						position: absolute;
						width: 102px;
						right: 0;
					}
					.num{
						border-bottom: solid #EDEDED 1px;
						height: 66px;
						line-height: 66px;
						width: 100%;
						span:first-child{
							font-weight:500;
							color:rgba(51,51,51,1);
							line-height:34px;
							margin-right: 22px;
						}
					}
					strong{
						color: #333333;
						font-size: 36px;
					}
					.text-data{
						display: flex;
						justify-content: center;
						height: 100%;
						flex-direction: column;
						p{
							margin-top: 15px;
							em{
								color: #F43F32;
								font-size: 36px;
							}
						}
					}
				}
			}
		}
		.msg-null{
			display: flex;
			align-items: center;
			justify-content: center;
			img{
				width:262px;
				margin-top: 250px;
			}
		}
	}
</style>
