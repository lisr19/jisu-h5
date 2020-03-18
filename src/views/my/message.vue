<template>
	<div class="msg">
		<head-bar title="留言中心"></head-bar>
		<div class="msg-content" >
			<ul class="items" >
				<li class="item" v-for="item in 5" @click="">
					<div class="info">
						<div style="flex: 6">
							<p class="add-time">发送时间：2019-12-21</p>
							<div class="desc">内容：环保系统里面的文档资料已上传请注意查收，详细的……</div>
						</div>
						<div class="tip">
							<span class="state">已回复</span>
							<img src="@/assets/img/icon1.png" alt="">
						</div>
					</div>
				</li>
			</ul>
<!--			<div  v-if="msgList.length===0&&!loading" class="msg-null">-->
<!--				<img  src="@/assets/icon/null-news.png" alt="">-->
<!--			</div>-->
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
		name: "message",
		data() {
			return {
				msgList:[],
				loading:false,
			}
		},
		created() {
			// this.userId = localStorage.getItem('userId')
			// this.getMsgList({userId :this.userId,size:this.size,page:1})
		},
		mounted(){

		},
		methods: {

			// 获取消息列表
			async getMsgList(params){
				this.loading = true
				Indicator.open('加载中...')
				let res = await getMsgList(params)
				if(res.code===200){
					Indicator.close()
					this.loading = false
					this.total = res.data.total
					if(this.page===1){
						this.msgList=res.data.list
					}else {
						this.msgList= this.msgList.concat(res.data.list)
					}
				}else {
					Indicator.close()
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
