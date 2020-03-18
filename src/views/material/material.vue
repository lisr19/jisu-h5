<template>
	<div class="page">
        <div class="head-bar">
			<img src="" alt="">
			申报管理
        </div>
		<div class="card">
			<div class="content">
				<h2>环保动态数据
					<span class="hist">
				<img src="" alt="">
				历史记录
			</span>
				</h2>
				<div class="items">
					<p class="item" v-for="i in 3">
						<span>第三季度</span>
						<span>2019年9月10日</span>
						<span>未上传</span>
					</p>
				</div>
			</div>
			<div class="btn">上传数据/文件</div>
		</div>
		<div class="card2">
			<div class="item">
				<span>环评基本信息</span>
				<span>
					<img src="" alt="">
					已上传
					<van-icon name="arrow" />
				</span>
			</div>
			<div class="item">
				<span>其他环保手续</span>
				<span>
					<img src="" alt="">
					已上传
					<van-icon name="arrow" />
				</span>
			</div>
		</div>
		<div class="card3">
			<h2>第三方公司
				<span class="hist">
					<img src="" alt="">
					管理
				</span>
			</h2>
			<div class="items">
				<p v-for=" i in 3"> 1.广州环保有限公司</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{}
		},
		created(){

		},
		mounted(){
		},
		methods:{

		}
	}
</script>
<style>
	.van-tabbar--fixed{
		height: 100px;
		border-top: solid 1px #B3B3B3;
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
		.hist{
			position: absolute;
			width:172px;
			height:62px;
			background:rgba(241,241,242,1);
			border-radius:6px;
			right: 24px;
			top: 20px;
			font-size:24px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(1,122,255,1);
			line-height:62px;
			text-align: center;
		}
		.card{
			width:684px;
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
			.content{
				padding: 26px 30px;
			}
			p{
				font-size:24px;
				font-weight:400;
				color:rgba(153,153,153,1);
				margin-bottom: 6px;
			}
			.btn{
				width:684px;
				height:80px;
				line-height: 80px;
				background:rgba(33,68,61,1);
				border-radius:0px 0px 10px 10px;
				font-weight:500;
				color:rgba(255,255,255,1);
				font-size: 28px;
				text-align: center;

			}

			.items{
				margin-top: 26px;
				p{
					line-height:34px;
				}
			}
		}
		.card2{
			width:684px;
			height:204px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-top: 270px;
			.item{
				height: 100px;
				line-height: 100px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30px;
			}
		}
		.card3{
			width:684px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-top: 20px;
			position: relative;
			text-align: left;
			padding: 30px;
			box-sizing: border-box;
			.items{
				margin-top: 28px;
			}
			p{
				font-size:24px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				margin-bottom: 6px;
			}
		}
	}
</style>
