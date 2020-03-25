<template>
	<div class="page">
        <div class="head-bar">
			<img src="" alt="">
			申报管理
        </div>
		<div v-if="reportData.length>0" class="card">
			<div class="content">
				<h2>环保动态数据
					<span class="hist">
				<img src="" alt="">
				历史记录
			</span>
				</h2>
				<div class="items">
					<p class="item" v-for="item in reportData">
						<span>{{item.year}}年</span>
						<template>
							<span v-if="item.quarter==2">第二季度</span>
							<span v-else-if="item.quarter==3">第三季度</span>
							<span v-else-if="item.quarter==4">第四季度</span>
							<span v-else>第一季度</span>
						</template>
						<template>
							<span class="red" v-if="item.status==1">未完成</span>
							<span v-else-if="item.status==2">审核中</span>
							<span v-else-if="item.status==3">驳回</span>
							<span v-else>已完成</span>
						</template>

					</p>
				</div>
			</div>
			<div class="btn">上传数据/文件</div>
		</div>
		<div v-else class="card">
			<div class="content null">
				<h2>环保动态数据</h2>
				<p class="tip">您还未填写环评基本信息</p>
				<p>请填写相关信息，填写后显示。</p>
				<div class="btn2" @click="openReport">去填写信息</div>
				<img src="@/assets/img/null.png" alt="">
			</div>
		</div>

		<div class="card2">
			<div class="item"  @click="openEia" :class="{active:canEdit1}">
				<span>环评基本信息</span>
				<span>
					<img src="" alt="">
					{{canEdit1?(has_eia_basic_info==1?'已上传':'未上传'):'未填写相关信息'}}
					<van-icon name="arrow" />
				</span>
			</div>
			<div class="item"   @click="openOtherEia" :class="{active:canEdit2}">
				<span>其他环保手续</span>
				<span >
					<img src="" alt="">
						{{canEdit2?(has_eia_other_info==1?'已上传':'未上传'):'未填写相关信息'}}
					<van-icon name="arrow" />
				</span>
			</div>
		</div>
		<div class="card3" v-if="companyList.length>0">
			<h2>第三方公司
				<span class="hist">
					<img src="" alt="">
					管理
				</span>
			</h2>
			<div class="items">
				<p v-for="(item,index) in companyList">{{index+1}}、{{item.code}}</p>
			</div>
		</div>
		<div class="card3" v-else>
			<h2>第三方公司
			</h2>
			<p style="margin: 25px auto;text-align: center">未添加公司</p>
		</div>
	</div>
</template>
<script>
	import {enterpriseList} from '@/lib/API/enterprise'
	import {thirdEnterpriseList} from '@/lib/API/third_enterprise'
	import {reportList} from '@/lib/API/report'
	export default {
		data(){
			return{
				reportData:[],//动态环保数据
				hbData:false,
				hasEpData:0,
				companyList:[],
				canEdit1:false,
				canEdit2:false,

			}
		},
		created(){
			this.enterId = localStorage.getItem('enterId')
			this.has_enterprise_detail = localStorage.getItem('has_enterprise_detail')
			this.has_eia_basic_info = localStorage.getItem('has_eia_basic_info')
			this.has_eia_other_info = localStorage.getItem('has_eia_other_info')
			if(this.enterId){
				this.canEdit1 = true
				if(this.has_eia_basic_info==1){
					this.canEdit2 = true
				}else {
					this.canEdit2 = false
				}
			}else {
				this.canEdit1 = false
			}
		},
		mounted(){
			if(this.has_eia_other_info==1){
				this.thirdEnterpriseList()
				this.reportList()
			}
		},
		methods:{
			//获取企业列表
			async enterpriseList(params) {
				let res = await enterpriseList(params)
				if(res.errno ==0){
					if(res.data.data.length==0){
						console.log('暂无企业信息');
					}else {
						this.enterId = res.data.data[0].id
						localStorage.setItem('enterId',this.enterId)
					}
				} else {
					this.$toast(res.errmsg)
				}
			},
			openEia(){
				if(this.canEdit1){
					this.$router.push({name:'环评'})
				} else {
					this.$toast('请先填写企业信息')
				}
			},
			openOtherEia(){
				if(!this.canEdit1){
					this.$toast('请先填写企业信息')
				} else if(this.has_eia_basic_info==0){
					this.$toast('请先填写环评信息')
				}else  {
					this.$router.push({name:'其他环保手续'})
				}
			},
			openReport(){
				if(!this.canEdit1){
					this.$toast('请先填写企业信息')
				} else if(this.has_eia_basic_info==0){
					this.$toast('请先填写环评信息')
				}else  {
					console.log('去动态数据');
					// this.$router.push({name:'其他环保手续'})
				}
			},
			//获取第三方公司列表
			async thirdEnterpriseList() {
				let params = {
					page:1,
					search:''
				}
				let res = await thirdEnterpriseList(params)
				if(res.errno ==0){
					if(res.data.data.length==0){
						console.log('暂无第三方公司信息');
					}else {
						this.companyList = res.data.data
					}
				} else {
					this.$toast(res.errmsg)
				}
			},
			//获取动态环保数据
			async reportList() {
				let params = {
					page : 1,
					search :'',
				}
				let res = await reportList(params)
				if(res.errno ==0){
					if(res.data.data.length==0){
						console.log('暂无动态数据');
					}else {
						this.reportData = res.data.data
					}
				} else {
					this.$toast(res.errmsg)
				}
			},
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
			box-sizing: border-box;
			.content{
				padding: 25px 30px;
				max-height: 220px;
				overflow: hidden;
				.items{
					.item{
						span{
							margin-right: 20px;
						}
					}
				}
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
			.null{
				img{
					position: absolute;
					width: 230px;
					top: 40px;
					right: 50px;
				}
				.tip{
					margin: 20px 0 8px;
				}
				.btn2{
					width:194px;
					height:68px;
					line-height: 68px;
					text-align: center;
					background:rgba(255,174,108,1);
					border-radius:10px;
					font-size:28px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					margin-top: 30px;
				}
			}
			.items{
				margin-top: 20px;
				p{
					line-height:36px;
				}
			}
		}
		.red{
			color:#DA3D24
		}
		.card2{
			width:684px;
			height:204px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-top: 250px;
			color:rgba(153,153,153,1);
			.active{
				color: #333333
			}

			.item{
				height: 100px;
				line-height: 100px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30px;
			}
			.item:first-child{
				border-bottom: solid 0.5px #E8E8E8;
			}
		}
		.card3{
			width:684px;
			min-height:204px;
			max-height:450px;
			background:rgba(255,255,255,1);
			background:rgba(255,255,255,1);
			border-radius:10px;
			margin-top: 20px;
			position: relative;
			text-align: left;
			padding: 30px;
			box-sizing: border-box;
			overflow: auto;
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
