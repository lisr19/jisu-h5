<template>
	<div class="page">
		<head-bar title="环评基本信息"></head-bar>
		<div class="table" v-if="">
<!--			<Table border :columns="columns1" :data="data1"></Table>-->
			<van-row  style="background:rgba(213,239,234,1);margin-bottom: 0">
				<van-col span="8">添加时间</van-col>
				<van-col span="8">状态</van-col>
				<van-col span="8">操作</van-col>
			</van-row>
			<van-row v-for="item in 5">
				<van-col span="8">{{item.add_time}}</van-col>
				<van-col span="8">{{item.status==0?'未上传':'已上传'}}</van-col>
				<van-col span="8">
					<van-icon name="close" />
					<van-icon name="close" />
				</van-col>
			</van-row>
		</div>
		<div class="btn">新增</div>
	</div>
</template>

<script>
	// import {getMsgList,updateFlag} from '@/lib/API/comment'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data() {
			return {
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
			// this.userId = localStorage.getItem('userId')
			// this.getMsgList({userId :this.userId,size:this.size,page:1})
		},
		activated() {

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
