<template>
	<div class="page">
		<head-bar title="其他环保手续"></head-bar>
		<div class="table" v-if="otherEiaList.length>0">
			<van-row  style="background:rgba(213,239,234,1);margin-bottom: 0">
				<van-col span="12">企业名称</van-col>
				<van-col span="4">年份</van-col>
				<van-col span="8">操作</van-col>
			</van-row>
			<van-row class="item" v-for="item in otherEiaList">
<!--				<van-col span="12">{{item.add_time}}</van-col>-->
				<van-col span="12">{{item.enterprise_name}}</van-col>
				<van-col span="4">{{item.year}}</van-col>
				<van-col span="8">
					<img   @click="openDetail(item)" style="margin-right: 15px" src="@/assets/img/edit.png" alt="">
					<img  @click="comFn(item)" src="@/assets/img/del.png" alt="">
				</van-col>
			</van-row>
		</div>
		<div v-else style="margin-top: 50px">暂无数据</div>
		<div class="btn" @click="addDetail">新增</div>
	</div>
</template>

<script>
	import {procedureList,procedureDetail,procedureDelete} from '@/lib/API/otherEia'
	import headBar from '@/components/head-bar/head-bar'
	import {Dialog} from "vant";
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				otherEiaList:[],
			}
		},
		created() {
			this.procedureList()
		},
		activated() {

		},
		mounted(){

		},
		methods: {
			addDetail(){
				this.$router.push({path:'/other-eia-detail'})
			},
			openDetail(item){
				this.$router.push({path:'/other-eia-detail',query:{id:item.id}})
			},
			//获取企业是否填写其他环保信息
			async procedureList() {
				let params = {
					page:1,
					search:''
				}
				let res = await procedureList(params)
				if(res.errno) {
					localStorage.setItem('has_eia_other_info', 0);
				} else {
					this.otherEiaList =[]
					this.otherEiaList =res.data.data
				}
			},

			//删除环评
			async procedureDelete(item) {
				let params = {
					id : item.id
				}
				let res = await procedureDelete(params)
				if(res.errmsg) {
					this.$toast('删除企业环保手续信息出错')
				} else {
					this.$toast('删除企业环保手续信息成功')
					this.procedureList()
				}
			},
			//再次确定
			comFn(item){
				Dialog.confirm({
					message: '您确定要删除此环保手续？'
				}).then(() => {
					this.procedureDelete(item)
				}).catch(() => {

				})
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
