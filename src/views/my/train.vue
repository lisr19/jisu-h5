<template>
	<div class="msg">
		<head-bar title="预约培训"></head-bar>
		<div class="msg-content" >
			<ul class="items" >
				<li class="item" v-for="item in 5" @click="">
					<div class="info">
						<img class="img"  src="@/assets/img/couse.png"  alt="">
						<div class="content">
							<p class="name">环保管理课程</p>
							<p class="add-time">发送时间：2019-12-21</p>
						</div>
					</div>
				</li>
			</ul>
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

			}
		},
		created() {
			// this.userId = localStorage.getItem('userId')
			// this.getMsgList({userId :this.userId,size:this.size,page:1})
		},
		mounted(){

		},
		methods: {
			async getTrainList(params){
				let res = await getTrainList(params)
				if(res.code===200){
					this.total = res.data.total
					if(this.page===1){
						this.msgList=res.data.list
					}else {
						this.msgList= this.msgList.concat(res.data.list)
					}
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
