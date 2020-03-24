<template>
	<div class="page">
		<head-bar title="环评基本信息"></head-bar>
		<div class="table" v-if="eiaList.length>0">
<!--			<Table border :columns="columns1" :data="data1"></Table>-->
			<van-row  style="background:rgba(213,239,234,1);margin-bottom: 0">
				<van-col span="12">添加时间</van-col>
				<van-col span="4">状态</van-col>
				<van-col span="8">操作</van-col>
			</van-row>
			<van-row class="item" v-for="item in eiaList">
				<van-col span="12">{{item.add_time}}</van-col>
				<van-col span="4">{{item.status==0?'未上传':'已上传'}}</van-col>
				<van-col span="8">
					<img style="margin-right: 15px" src="@/assets/img/edit.png" alt="">
					<img  @click="epDelete" src="@/assets/img/del.png" alt="">
				</van-col>
			</van-row>
		</div>
		<div v-else style="margin-top: 50px">暂无数据</div>
		<div class="btn">新增</div>
	</div>
</template>

<script>
	import {epList,epDelete} from '@/lib/API/model'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data() {
			return {
				eiaList:[],
				data1:[
					{id:'1',add_time:'2019-12-12',status:0},
					{id:'2',add_time:'2019-12-30',status:0},
					{id:'3',add_time:'2019-01-12',status:1}
				],
				columns1: [
					{
						title: '添加时间',
						key: 'add_time',
						align: 'center',
						width:'100%'
					},
					{
						title: '状态',
						key: 'status',
						align: 'center',
						width:'100%',
						render:(h,params)=>{
							if(this.data1[params.index].status==0){
								return h("span", {},'未上传')
							}else{
								return h("span", {},'已上传')
							}
						}
					},
					{
						title: '操作',
						align: 'center',
						width:120,
						render: (h, params) => {
							let detail_but=h('Button', {
								props: {
									type: 'text',
									icon: 'compose',
								},
								style: {
									fontSize: '20px',
									width: 'auto',
								},
								on: {
									click: () => {
										//跳转详细页面
										//let detail_url = '/basement/basement_detail/' + this.data1[params.index].id;
										// let argu = {
										// 	id: params.row.id
										// }
										// this.$router.push({
										// 	name: 'msg_detail',
										// 	params: argu
										// });
									}
								}
							}, );
							let delete_but=h('Button', {
								props: {
									type: 'text',
									icon: 'close-round',
								},
								style: {
									fontSize: '20px',
									width: 'auto'
								},
								on: {
									// click: () => {
									// 	this.delid = this.data1[params.index].id;
									// 	this.delname = this.data1[params.index].account_name+'的留言';
									// 	this.deleteModal = true;
									// }
								}
							}, );
							let but=[];
							but.push(detail_but);
							but.push(delete_but);
							return h('Row',but);
						}
					}
				],
			}
		},
		created() {
			this.epList()
		},
		activated() {

		},
		mounted(){

		},
		methods: {
			//获取环评基本信息
			async epList() {
				let params = {
					page:1,
					search:''
				}
				let res = await epList(params)
				if(res.errno) {
					localStorage.setItem('has_eia_basic_info', 0);
				} else {
					this.eiaList =[]
					this.eiaList =res.data.data
				}
			},

			//删除环评
			async epDelete(item) {
				let params = {
					id : item.id
				}
				let res = await epList(params)
				if(res.errmsg) {
					this.$toast('删除企业环评信息出错')
				} else {
					this.$toast('成功删除企业环评信息')
					this.epList()
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
			position: absolute;
			left: 17%;
			bottom: 0;
		}
	}
</style>
