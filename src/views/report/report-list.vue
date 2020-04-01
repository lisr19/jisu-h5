<template>
	<div class="page">
		<head-bar title="动态环保数据"></head-bar>
		<div class="table" v-if="dataList.length>0">
			<van-row  style="background:rgba(213,239,234,1);margin-bottom: 0">
				<van-col span="5">年份</van-col>
				<van-col span="6">季度</van-col>
				<van-col span="5">状态</van-col>
				<van-col span="8">操作</van-col>
			</van-row>
			<van-row class="item" v-for="item in dataList">
				<van-col span="5">{{item.year}}</van-col>

				<template>
					<van-col span="6" v-if="item.quarter==1">第一季度</van-col>
					<van-col span="6" v-if="item.quarter==2">第二季度</van-col>
					<van-col span="6" v-if="item.quarter==3">第三季度</van-col>
					<van-col span="6" v-if="item.quarter==4">第四季度</van-col>
				</template>

				<template>
					<van-col span="5" v-if="item.status==1">未完成</van-col>
					<van-col span="5" v-if="item.status==2">审核中</van-col>
					<van-col span="5" v-if="item.status==3">驳回</van-col>
					<van-col span="5" v-if="item.status==4">已完成</van-col>
				</template>

				<van-col style="display: flex;align-items: center;justify-content: center;height: 100%" span="8">
					<img v-if="item.status==1||item.status==3" @click="openDetail(item)"  src="@/assets/img/edit.png" alt="">
					<img  @click="lookDetail(item)" style="margin: 0 15px;" src="@/assets/img/eye.png" alt="">
					<img v-if="item.status==1||item.status==3"  @click="comFn(item)" src="@/assets/img/del.png" alt="">
				</van-col>
			</van-row>
		</div>
		<div v-else style="margin-top: 50px">暂无数据</div>
		<div class="btn" @click="addDetail">新增</div>
	</div>
</template>

<script>
	import {reportList,reportDelete} from '@/lib/API/report'
	import headBar from '@/components/head-bar/head-bar'
	import {Dialog} from "vant";
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				dataList:[],

			}
		},
		created() {
			this.reportList()
		},
		activated() {

		},
		mounted(){

		},
		methods: {
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
						this.dataList = res.data.data
					}
				} else {
					this.$toast(res.errmsg)
				}
			},

			addDetail(){
				this.$router.push({path:'/report-detail'})
			},
			//查看环评信息详情
			openDetail(item){
				// console.log(item);
				// this.$toast('建设中')
				this.$router.push({path:'/report-detail',query:{id:item.id}})
			},
			lookDetail(item){
				this.$toast('建设中')
			},
			//确定弹窗
			comFn(item){
				Dialog.confirm({
					message: '您确定要删除此环保动态数据？'
				}).then(() => {
					this.reportDelete(item)
				}).catch(() => {

				})
			},

			//删除
			async reportDelete(item) {
				let params = {
					id : item.id
				}
				let res = await reportDelete(params)
				if(res.errmsg) {
					this.$toast('删除企业环评信息出错')
				} else {
					this.$toast('成功删除企业环评信息')
					this.reportList()
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
		padding-top: 112px;
		.table{
			.item{
				img{
					width: 40px;
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
