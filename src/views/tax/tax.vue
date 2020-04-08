<template>
	<div class="page">
		<head-bar title="环保税务核算"></head-bar>

		<div class="content">
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;margin-top: 20px">废气，废水税务核算表</h3></Col>
				</Row>
				<div class="w-card">
					<div class="item-card" v-for="(item,index) in data_waterGas">
						<p class="name">月份:{{item.month}}</p>
						<p>排放口：{{item.outlet}}</p>
						<p>税目：{{item.tax_item}}</p>
						<p>污染物名称：{{item.waste_name}}</p>
						<p>当量数：{{item.count}}</p>
						<p>单位税额：{{item.price}}</p>
						<p>折扣率：{{item.discount}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="all-count"></div>
				</div>
			</div>
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;margin-top: 20px">固废，危废税务核算表</h3></Col>
				</Row>
				<div class="w-card">
					<div class="item-card" v-for="(item,index) in data_solidDangerous">
						<p class="name">月份:{{item.month}}</p>
						<p>种类：{{item.type}}</p>
						<p>污染物名称：{{item.waste_name}}</p>
						<p>排放量（吨）：{{item.count}}</p>
						<p>单位税额：{{item.price}}</p>
						<p>折扣率：{{item.discount}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="all-count"></div>
				</div>
<!--				<Table border size="small" :columns="solid_dangerous_column" :data="data_solidDangerous" style="margin-top:20px" show-summary></Table>-->
<!--				<Table border size='small' :columns="sum_solidDangerous_column" :data="sum_solidDangerous" :show-header="false"></Table>-->
			</div>
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;margin-top: 20px">噪音税务核算表</h3></Col>
				</Row>
				<div class="w-card">
					<div class="item-card" v-for="(item,index) in data_noise">
						<p class="name">月份:{{item.month}}</p>
						<p>监测点：{{item.monitor}}</p>
						<p>税目：{{item.tax_item}}</p>
						<p>编号：{{item.num}}</p>
						<p>类型：{{item.type}}</p>
						<p>时段：{{item.time}}</p>
						<p>检测分贝数：{{item.test_value}}</p>
						<p>超标分贝数：{{item.exceed_value}}</p>
						<p>超标天数：{{item.exceed_day}}</p>
						<p>折扣率：{{item.discount}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="all-count"></div>
				</div>
<!--				<Table border size="small" :columns="noise_column" :data="data_noise" style="margin-top:20px" show-summary></Table>-->
<!--				<Table border size='small' :columns="sum_noise_column" :data="sum_noise" :show-header="false"></Table>-->
			</div>
			<div class="total">
				<h2>合计应缴环保税费:{{total_pay}}</h2>
				<h2>合计减免环保税费:{{total_off}}</h2>
			</div>
		</div>
	</div>
</template>

<script>
	import {getTaxData, calTaxData} from '@/lib/API/tax'
	import { enterpriseSelect } from '@/lib/API/report';
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data(){
			return {
				enterprise_id:0,
				enterpriseData:[],
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

				selectYear:2020,
				selectQuarter:1,


				//合计应付税费
				total_pay:20000,

				//合计减免税费
				total_off:0,


				//固废危废税费合计表
				sum_solidDangerous_column:[
					{
						align:'center',
						key: 'total'
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 200
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 20
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 4000
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 0
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}
				],

				//固废危废税费合计表数据
				sum_solidDangerous:[
					{
						total:'合计'
					}
				],

				//噪音税费合计表
				sum_noise_column:[
					{
						align:'center',
						key: 'total'
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 200
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 20
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 20
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 4000
						}
					}, {
						align:'center',
						render: (h,params) => {
							return 0
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}
				],

				//噪音税费合计表数据
				sum_noise:[
					{
						total:'合计'
					}
				],

				//废水废气税费表
				water_gas_column:[
					{
						title: '月份',
						align:'center',
						key: 'month'
					},
					{
						title: '排放口',
						align:'center',
						key: 'outlet'
					},
					{
						title: '税目',
						align:'center',
						key: 'tax_item'
					},
					{
						title: '污染物名称',
						align:'center',
						key: 'waste_name'
					},
					{
						title: '当量数',
						align:'center',
						key: 'count'
					},
					{
						title: '单位税额',
						align:'center',
						key: 'price'
					},
					{
						title: '折扣率',
						align:'center',
						key: 'discount'
					},
					{
						title: '应纳税额',
						align:'center',
						key: 'tax_liability'
					},
					{
						title: '减免税额',
						align:'center',
						key: 'tax_breaks'
					},
					{
						title: '计税依据',
						align:'center',
						key: 'tax_basis'
					}
				],

				//废固危废税费表
				solid_dangerous_column:[
					{
						title: '月份',
						align:'center',
						key: 'month'
					},
					{
						title: '种类',
						align:'center',
						key: 'type'
					},
					{
						title: '污染物名称',
						align:'center',
						key: 'waste_name'
					},
					{
						title: '排放量（吨）',
						align:'center',
						key: 'count'
					},
					{
						title: '单位税额',
						align:'center',
						key: 'price'
					},
					{
						title: '折扣率',
						align:'center',
						key: 'discount'
					},
					{
						title: '应纳税额',
						align:'center',
						key: 'tax_liability'
					},
					{
						title: '减免税额',
						align:'center',
						key: 'tax_breaks'
					},
					{
						title: '计税依据',
						align:'center',
						key: 'tax_basis'
					},
				],

				//噪音税费表
				noise_column:[
					{
						title: '月份',
						align:'center',
						key: 'month'
					},
					{
						title: '监测点',
						align:'center',
						key: 'monitor'
					},
					{
						title: '编号',
						align:'center',
						key: 'num'
					},
					{
						title: '类型',
						align:'center',
						key: 'type'
					},
					{
						title: '时段',
						align:'center',
						key: 'time'
					},
					{
						title: '检测分贝数',
						align:'center',
						key: 'test_value'
					},
					{
						title: '超标分贝数',
						align:'center',
						key: 'exceed_value'
					},
					{
						title: '超标天数',
						align:'center',
						key: 'exceed_day'
					},
					{
						title: '折扣率',
						align:'center',
						key: 'discount'
					},
					{
						title: '应纳税额',
						align:'center',
						key: 'tax_liability'
					},
					{
						title: '减免税额',
						align:'center',
						key: 'tax_breaks'
					},
					{
						title: '计税依据',
						align:'center',
						key: 'tax_basis'
					},
				],

				//数据搜索条件对象
				search:{},

				//废水废气税费表数据
				data_waterGas:[
				],

				//固废危废税费表数据
				data_solidDangerous:[
				],

				//噪音税费表数据
				data_noise:[
				]
			}
		},
		mounted () {
			this.search.year = this.selectYear
			this.search.quarter = this.selectQuarter
			if (this.isCompanyCount) {
				this.handleGetTaxData();
			} else {
				this.handleGetenterpriseList()
			}
		},
		computed: {
			//判断是否是企业账户
			isCompanyCount: function() {
				return sessionStorage.getItem('account_type')==1 ? true : false
			}
		},
		methods: {
			handleGetTaxData(){
				let data = {
					enterprise_id:sessionStorage.getItem('enterprise_id'),
					year:this.search.year,
					quarter:this.search.quarter,
				}
				getTaxData(data).then(res=>{
					if (res.errno == 100) {
						this.$Notice.error({
							title: '暂无企业季度环保税记录',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
						this.data_waterGas = [],
								this.data_solidDangerous = [],
								this.data_noise = []
					} else {
						this.data_waterGas = [],
								this.data_solidDangerous = [],
								this.data_noise = []
						for(let month in res.data) {
							res.data[month].water_arr.forEach(item => {
								this.data_waterGas.push(item)
							})
							res.data[month].gas_arr.forEach(item => {
								this.data_waterGas.push(item)
							})
							res.data[month].solid_arr.forEach(item => {
								this.data_solidDangerous.push(item)
							})
							res.data[month].dangerous_arr.forEach(item => {
								this.data_solidDangerous.push(item)
							})
							res.data[month].noise_arr.forEach(item => {
								this.data_noise.push(item)
							})
						}
					}
				})
			},

			handleCalTaxData(){
				let data = {
					enterprise_id:sessionStorage.getItem('enterprise_id'),
					year:this.search.year,
					quarter:this.search.quarter,
				}
				calTaxData(data).then(res => {
					if (res.errno == 100) {
						this.$Notice.error({
							title: '暂无企业季度申报记录，无法计算',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
						this.data_waterGas = [],
								this.data_solidDangerous = [],
								this.data_noise = []
					} else {
						this.$Notice.success({
							title: '计算成功',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
						this.handleGetTaxData()
					}
				})
			},

			//获取企业选择列表
			handleGetenterpriseList(){
				enterpriseSelect().then(res => {
					if (res.errno) {
						this.$Notice.error({
							title: '获取企业选择列表出错',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					} else {
						this.enterpriseData=res.data
					}
				})
			},

			//获取当前季度和前四个季度列表
			// getQuarter(){
			//     let date = new Date()
			//     let currentYear = date.getFullYear()
			//     let currentMonth = date.getMonth()
			//     let currentQuarter
			//     if(currentMonth<=2) {
			//         currentQuarter = 1
			//     } else if ( currentMonth>2 && currentMonth<=5 ) {
			//         currentQuarter = 2
			//     } else if (currentMonth>5 && currentMonth<=8) {
			//         currentQuarter = 3
			//     } else if (currentMonth>8) {
			//         currentQuarter = 4
			//     }
			//     let res = []
			//     res.push({
			//         value:0,
			//         label:`${currentYear}第${currentQuarter}季度`
			//     })
			//     for (let i=0;i<5;i++) {
			//         if (--currentQuarter<1) {
			//             currentQuarter = 4
			//             currentYear--
			//         }
			//         res.push({
			//             value:i+1,
			//             label:`${currentYear}第${currentQuarter}季度`
			//         })
			//     }
			//     this.dateSelect = res
			// },


			//年份数据改变
			handleYearChange(index){
				this.search.year = this.selectYear
				this.handleGetTaxData()
			},

			//季度数据变化
			handleQuarterChange(index){
				this.search.quarter = this.selectQuarter
				this.handleGetTaxData()
			},
		}
	}
</script>

<style >
	.ivu-input-wrapper{
		width: auto;
	}
	.ivu-input{

	}
	.ivu-radio-group{
		font-size: 28px;
		margin-top: 20px;
	}
	.ivu-radio-wrapper{
		font-size: 32px;
		margin-right: 100px;
	}
	.ivu-form .ivu-form-item-label{
		font-size: 28px;
	}
	.ivu-form-item-content{
		font-size: 28px;
		text-align: left;
	}
	.ivu-btn{
		font-size: 28px;
	}
	.ivu-modal-body{

	}
</style>
<style lang="less" scoped>
	.page{
		padding-top: 112px;
		background-color: #F7F7FA;
		.content{
			background-color: #ffffff;
			padding: 50px 0;
			text-align: left;
			.card{
				border-top:solid 1px #ECECEC;
				padding: 30px 44px;
				position: relative;
				.icon-down{
					position: absolute;
					right: 30px;
					top: 30px;
					height: 50px;
				}
			}
			.card:first-child{
				border:none;
			}
			.inner-card{
				background:#e6eaec;
				margin:20px;
				padding: 0 20px;
				border-radius: 10px;
				position: relative;
				.w-card{
					padding: 30px 0 40px;
				}
				.fold{
					display: flex;
					align-items: center;
					justify-content: center;
					border-top: solid 1px #B3B3B3;
					padding-top: 15px;
					img{
						height: 50px;
						margin-top: 10px;
					}
				}
			}
			.item-card{
				background:rgba(255,255,255,1);
				border-radius:10px;
				padding: 16px 30px;
				margin-bottom: 15px;
				.name{
					border-bottom: 1px solid #EDEDED;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					position: relative;
					span{
						position: absolute;
						right: 10px;
						color: #4f5e66;
					}
				}
			}
		}
		.line{
			border-bottom: 3px solid #e0cece;
			margin-bottom: 50px;
		}
		.card-one{
			margin-top: 20px;
			.card-two{
				background: #fff;
				border-radius: 10px;
				padding: 10px 15px;
				position: relative;
				margin-bottom: 20px;
				.del-btn{
					position: absolute;
					right: 15px;
					top: 15px;
				}
				.item-card{
					background: #f2faff;
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
			margin: 30px auto;
		}
	}
	.total{
		text-align: left;
		padding: 20px 30px;
	}
</style>
