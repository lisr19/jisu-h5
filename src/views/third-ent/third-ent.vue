<template>
	<div class="page">
		<head-bar title="第三方公司列表"></head-bar>
		<van-pull-refresh v-model="isDownLoading" @refresh="onRefresh">
			<van-list
					  v-model="loading"
					  :finished="finished"
					  :immediate-check="false"
					  @load="onLoad"
			>
				<div class="table" :style="{height:boxHeight}">
					<van-row  style="background:rgba(213,239,234,1);margin-bottom: 0">
						<van-col span="6">公司名称</van-col>
						<van-col span="6">联系人</van-col>
						<van-col span="6">联系电话</van-col>
						<van-col span="6">操作</van-col>
					</van-row>
					<van-row class="item" v-for="item in data1">
						<van-col span="6">{{item.name}}</van-col>
						<van-col span="6">{{item.link_name}}</van-col>
						<van-col span="6">{{item.link_phone}}</van-col>
						<van-col span="6">
							<img  @click="openDetail(item)" style="margin-right: 15px" src="@/assets/img/edit.png" alt="">
							<img  @click="comFn(item)" src="@/assets/img/del.png" alt="">
						</van-col>
					</van-row>
				</div>
			</van-list>
		</van-pull-refresh>


		<div v-if="data1.length===0" style="margin-top: 50px">暂无数据</div>

		<div class="btn" @click="addDetail">新增</div>
	</div>
</template>

<script>
	import {thirdEnterpriseList,thirdEnterpriseDelete} from '@/lib/API/third_enterprise'
	import headBar from '@/components/head-bar/head-bar'
	import {Dialog} from "vant";
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				data1:[],
				page:1,
				count:0,
				loading: false,
				finished: false,
				isDownLoading:false,//下拉刷新
				clientHeight:'',
				boxHeight:'',
			}
		},
		created() {
			// 获取浏览器可视区域高度
			this.clientHeight = `${document.documentElement.clientHeight}`
			// window.onresize = function temp() {
			// 	this.clientHeight = `${document.documentElement.clientHeight}`
			// }
			this.boxHeight = this.clientHeight -150+'px'
			console.log(this.boxHeight);
			this.handleGetInfo({page:1,	search : ''})
		},
		activated() {

		},
		mounted(){

		},
		methods: {
			onRefresh() {
				this.isDownLoading = false;
				// setTimeout(() => {
				// 	this.isDownLoading = false;
				// 	this.page=1
				// 	this.finished = false
				// 	this.data1=[]
				// 	this.handleGetInfo({page:1,	search : ''})
				// }, 500);
			},
			onLoad() {
				console.log('触发加载');
				setTimeout(()=>{
					this.handleGetInfo({page:this.page,	search : ''})
				},500)

			},
			//获取第三方公司列表
			handleGetInfo(params) {
				console.log(this.page);
				thirdEnterpriseList(params).then(res => {
					if(res.errno) {
						this.$toast('获取第三方公司列表出错')
					} else {
						this.count = res.data.count;
						this.loading = false;
						this.totalPage = Math.ceil(this.count/10)
						if(this.totalPage===0||this.totalPage===1){
							this.finished = true
						}else if(this.totalPage>this.page){
							this.page++
						}else {
							this.finished = true
						}
						if(this.page===1){
							this.data1=res.data.data
						}else {
							this.data1= this.data1.concat(res.data.data)
						}
						console.log(this.data1);
					}
				}).catch(err => {
					this.$toast('获取第三方公司列表出错')
				})
			},


			addDetail(){
				// this.$toast('建设中')
				this.$router.push({path:'/third-detail'})
			},
			//查看第三方详情
			openDetail(item){
				console.log(item);
				this.$router.push({path:'/third-detail',query:{id:item.id}})
			},
			//确定弹窗
			comFn(item){
				Dialog.confirm({
					message: '您确定要删除此删除企业环评信息？'
				}).then(() => {
					this.thirdEnterpriseDelete(item)
				}).catch(() => {

				})
			},


			//删除第三方公司
			async thirdEnterpriseDelete(item) {
				let params = {
					id : item.id
				}
				let res = await thirdEnterpriseDelete(params)
				if(res.errmsg) {
					this.$toast('删除企业环评信息出错')
				} else {
					this.$toast('成功删除企业环评信息')
					this.handleGetInfo()
				}
			},
		},
	}
</script>

<style scoped>
	.van-row{
		height:68px;
		line-height: 68px;
		margin-bottom: 20px;
		background:rgba(255,255,255,1);
		overflow: hidden;
	}
	.ivu-table-header{
		height:68px;
		background:rgba(213,239,234,1);
	}
	.ivu-table table{
		height:68px;
		width: 100%!important;
		background:rgba(213,239,234,1);
	}
	.ivu-table th{
		height:68px;
		width: 100%!important;
		background:rgba(213,239,234,1);
	}
	.ivu-table-cell{
		font-size:24px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:34px;
	}
	.ivu-table td{
		height:68px;
	}
</style>
<style lang="less" scoped>
	.page{
		padding: 112px 0 230px;
		.table{
			overflow: auto;
			.item{
				img{
					width: 40px;
					margin-top: 13px;
				}
			}
		}
		.btn{
			width:522px;
			height:90px;
			line-height: 90px;
			background:rgba(33,68,61,1);
			box-shadow:0px 4px 18px 0px rgba(166,172,191,0.5);
			border-radius:52px;
			color: #ffffff;
			position: fixed;
			left: 17%;
			bottom: 50px;
		}
	}
</style>
