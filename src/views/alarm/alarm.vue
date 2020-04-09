<template>
	<div class="msg">
		<head-bar title="预警告警"></head-bar>
		<div class="msg-content" >
			<div class="date-box">
				<Select v-model='selectYear' @on-change="handleYearChange" style="margin-right: 10px">
					<Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.label}}年</Option>
				</Select>
				<Select v-model='selectQuarter' @on-change="handleQuarterChange" >
					<Option v-for="item in quarterList" :value="item.value" :key="item.value">第{{item.label}}季度</Option>
				</Select>
			</div>
			<ul class="items" v-if="data.length>0">
				<li class="item" v-for="(item,index) in data" @click="">
					<img v-if="item.status===2" class="icon" src="@/assets/img/over.png" alt="">
					<p class="num">
						<span class="">监测点:{{item.monitor_point}}</span>
						<span class="time">{{item.add_time}}</span>
					</p>
					<div class="text-data">
						<p>排放物：<strong>{{item.waste_name}}</strong></p>
						<p>告警类型：{{item.type_name}}</p>
						<p>
							<span style="margin-right: 15px">测量数据：<em>{{item.test_value}}</em></span>
							<span>标准数据：{{item.standard_value}}</span>
						</p>
					</div>
				</li>
			</ul>
			<div class="msg-null" v-else>
				暂无数据
			</div>
		</div>
	</div>
</template>

<script>
	import {getWarnList} from '@/lib/API/warn'
	import {enterpriseSelect} from '@/lib/API/report'
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		computed:{

			//处理告警信息数据生成表格数据源
			dischargeData: function(){
				let data = this.data
				for (let i in data) {
					if (parseInt(data[i].test_value)>parseInt(data[i].standard_value)) {
						data[i].cellClassName = {
							test_value : 'alarm-cell',
							dischargeStatus : 'alarm-text'
						}
						data[i].dischargeStatus = '超标'
					} else {
						data[i].cellClassName = {
							test_value : 'normal-cell',
							dischargeStatus : 'normal-text'
						}
						data[i].dischargeStatus = '未超标'
					}
				}
				return data
			},

			//判断是否是企业账户
			isCompanyCount: function() {
				return sessionStorage.getItem('account_type')==1 ? true : false
			}
		},
		data() {
			return {
				selectYear:2020,
				selectQuarter:1,
				yearList:[{
					value:2020,
					label:2020,
				},{
					value:2019,
					label:2019,
				},{
					value:2018,
					label:2018,
				},{
					value:2017,
					label:2017,
				},{
					value:2016,
					label:2016,
				},{
					value:2015,
					label:2015,
				},],

				quarterList:[{
					value:1,
					label:1
				},{
					value:2,
					label:2
				},{
					value:3,
					label:3
				},{
					value:4,
					label:4
				},],
				column:[
					{
						title: '序号',
						align:'center',
						render:(h,params)=>{
							return params.index+1
						}
					},
					{
						title: '监测点',
						align:'center',
						key: 'monitor_point'
					},
					{
						title: '排放物',
						align:'center',
						key: 'waste_name'
					},
					{
						title: '告警类型',
						align:'center',
						key: 'type_name'
					},
					{
						title: '测试数据',
						align:'center',
						key: 'test_value'
					},
					{
						title: '预值数据',
						align:'center',
						key: 'standard_value'
					},
					{
						title:'告警状态',
						align:'center',
						key:'dischargeStatus',
						filters: [
							{
								label: '超标',
								value: 1
							},
							{
								label: '未超标',
								value: 2
							}
						],
						filterMultiple: false,
						filterMethod (value, row) {
							if (value === 1) {
								return row.dischargeStatus === '超标';
							} else if (value === 2) {
								return row.dischargeStatus === '未超标';
							}
						}
					},
					{
						title: '时间',
						align:'center',
						key: 'add_time'
					}
				],
				data:[],
				dateSelect:[],
				selectIndex:0,
				search:{},
				pageTotal:0,
				currentPage:1,
				enterprise_id:0,
				enterpriseData:[],
			}
		},
		created() {

		},
		mounted(){
			//数据初始化
			this.search.year = this.selectYear
			this.search.quarter = this.selectQuarter
			if(this.isCompanyCount){
				this.getWarnListData()
			} else {
				this.handleGetenterpriseList()
			}
		},

		methods: {
			//获取告警信息
			getWarnListData() {
				let data = {
					year:this.search.year,
					quarter:this.search.quarter,
					search:this.search.search || '',
					enterprise_id:this.search.enterprise_id || '',
					page:this.currentPage || 1
				}
				getWarnList(data).then(res => {
					console.log(res)
					if (res.errno == 0 ) {
						this.data = res.data.data
						this.pageTotal = res.data.totalPages
						this.currentPage = res.data.currentPage
					}
				})
			},

			//获取企业选择列表
			handleGetenterpriseList(){
				enterpriseSelect().then(res => {
					if (res.errno) {
						this.$toast('获取企业选择列表出错')
					} else {
						this.enterpriseData=res.data
					}
				})
			},

			//年份数据改变
			handleYearChange(index){
				this.search.year = this.selectYear
				this.getWarnListData()
			},
			//季度数据变化
			handleQuarterChange(index){
				this.search.quarter = this.selectQuarter
				this.getWarnListData()
			},


			//搜索框数据改变
			handleSearchChange(){
				this.getWarnListData()
			}
		}
	}
</script>


<style lang="less" scoped>
	.head-bar{
		background: #ffffff;
		color:rgba(51,51,51,1);
	}
	.msg{
		.msg-content{
			padding: 230px 0 50px;
			text-align: left;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			.date-box{
				position: fixed;
				top: 140px;
				z-index: 99;
				display: flex;
				width:700px;
			}
			.items{
				.item{
					width:700px;
					background:rgba(255,255,255,1);
					border-radius:10px;
					display: flex;
					margin-bottom: 20px;
					box-sizing: border-box;
					font-size:24px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
					padding: 0 30px 30px;
					flex-direction: column;
					position: relative;
					.icon{
						position: absolute;
						width: 102px;
						right: 0;
					}
					.num{
						border-bottom: solid #EDEDED 1px;
						height: 66px;
						line-height: 66px;
						width: 100%;
						span:first-child{
							font-weight:500;
							color:rgba(51,51,51,1);
							line-height:34px;
							margin-right: 30px;
						}
					}
					strong{
						color: #333333;
						font-size: 36px;
					}
					.text-data{
						display: flex;
						justify-content: center;
						height: 100%;
						flex-direction: column;
						p{
							margin-top: 15px;
							em{
								color: #F43F32;
								font-size: 36px;
							}
						}
					}
				}
			}
		}
		.msg-null{
			margin-top: 80px;
		}
	}
</style>
