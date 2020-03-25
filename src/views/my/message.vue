<template>
	<div class="msg">
		<head-bar title="留言中心"></head-bar>
		<div class="msg-content" >
			<ul class="items" >
				<li class="item" v-for="item in msgList" @click="">
					<div class="info">
						<div style="flex: 6">
							<p class="add-time">发送时间：{{item.add_time}}</p>
							<div class="desc">内容：{{item.content}}</div>
						</div>
						<div class="tip"  v-if="item.status===0">
							<span class="state" style="color: #E2B100">未回复</span>
							<img src="@/assets/img/icon9.png" alt="">
						</div>
						<div class="tip" v-else>
							<span class="state" style="color: #2DB170">已回复</span>
							<img src="@/assets/img/icon10.png" alt="">
						</div>
					</div>
				</li>
			</ul>
			<div  v-if="msgList.length===0" class="msg-null">
				暂无数据
			</div>
		</div>
	</div>
</template>

<script>
	import {getLeaveMsg} from '@/lib/API/comment'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		name: "message",
		data() {
			return {
				msgList:[],
				loading:false,
				size:50
			}
		},
		created() {
			this.userId = localStorage.getItem('userId')
			this.getLeaveMsg({page:1,search:""})
		},
		mounted(){

		},
		methods: {

			// 获取消息列表
			async getLeaveMsg(params){
				let res = await getLeaveMsg(params)
				if(res.errno ==0){
					this.msgList=res.data.data
				}else {
					this.$toast(res.errmsg)
				}
			},
		},
	}
</script>


<style lang="less" scoped>
	.msg{
		.title{
			position: fixed;
			top: 0;
			width: 100%;
			background:rgba(247,247,247,1);
			padding: 48px 40px ;
			z-index: 9;
			font-size:48px;
			font-weight:600;
			color:rgba(72,72,72,1);
			line-height:66px;
			text-align: left;
		}
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
					padding: 30px 26px;
					margin-bottom: 20px;
					box-sizing: border-box;
					.info{
						width: 100%;
						font-size:24px;
						font-family:PingFangSC-Regular,PingFang SC;
						font-weight:400;
						color:rgba(153,153,153,1);
						line-height:34px;
						display: flex;
						.add-time{
							margin-bottom: 20px;
						}
						.tip{
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							flex: 1;
							.state{
								margin-bottom: 25px;
							}
						}
						img{
							height: 70px;
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
