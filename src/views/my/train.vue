<template>
	<div class="msg">
		<head-bar title="预约培训"></head-bar>
		<div class="msg-content" >
			<ul class="items" v-if="trainList.length>0">
				<li class="item" v-for="item in trainList"  @click="">
					<div class="info">
						<img class="img"  src="@/assets/img/couse.png"  alt="">
						<div class="content">
							<p class="name">{{item.title}}</p>
							<p>企业名称：{{item.enterprise_name}}</p>
							<p class="add-time">预约时间:{{item.appointment_time}}</p>
						</div>
					</div>
				</li>
			</ul>
			<div v-else>暂无数据</div>
		</div>
	</div>
</template>

<script>
	import {getTrainList} from '@/lib/API/comment'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				trainList:[]
			}
		},
		created() {
			this.getTrainList({page:1,search:''})
		},
		mounted(){

		},
		methods: {
			async getTrainList(params){
				let res = await getTrainList(params)
				if(res.errno == 0){
					this.trainList=res.data.data
				}
			},
		},
	}
</script>


<style lang="less" scoped>
	.msg{
		.msg-content{
			padding: 150px 0 0;
			text-align: left;
			display: flex;
			align-items: center;
			justify-content: center;
			ul{
				li{
					width:700px;
					height:180px;
					background:rgba(255,255,255,1);
					border-radius:10px;
					display: flex;
					padding: 20px;
					margin-bottom: 20px;
					box-sizing: border-box;
					.info{
						display: flex;
						.content{
							font-size:24px;
							font-family:PingFangSC-Regular,PingFang SC;
							font-weight:400;
							color:rgba(153,153,153,1);
							display: flex;
							justify-content: center;
							flex-direction: column;
							.name{
								font-size:32px;
								font-weight:500;
								color:rgba(51,51,51,1);
								margin-bottom: 18px;
							}
						}
					}
					.img{
						width:140px;
						height:140px;
						display: inline-block;
						border-radius: 8px;
						margin-right: 38px;
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
