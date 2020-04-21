<template>
	<div class="page">
		<head-bar title="环保税务核算"></head-bar>
		<div class="day-date">
			<Select v-model='selectYear' @on-change="handleYearChange" >
				<Option v-for="item in yearList" :value="item.value" :key="item.value">{{item.label}}年</Option>
			</Select>
			<Select v-model='selectQuarter' @on-change="handleQuarterChange" style="margin:0 10px">
				<Option v-for="item in quarterList" :value="item.value" :key="item.value">第{{item.label}}季度</Option>
			</Select>
			<Button  type="success" @click="handleCalTaxData">计算税费</Button>
		</div>
		<div class="content">
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;">废气、废水税务核算表</h3></Col>
					<img class="icon-down" src="@/assets/img/down2.png"  @click="showCard1=true" v-if="showCard1==false" alt="">
				</Row>
				<div class="w-card" v-if="showCard1==true">
					<div class="item-card" v-for="(item,index) in data_waterGas">
						<p class="name">月份:{{item.month}}</p>
						<p>排放口：{{item.outlet}}</p>
						<p>税目：{{item.waste_type===1?'废水':'废气'}}</p>
						<p>污染物名称：{{item.waste_name}}</p>
						<p>当量数：{{item.count}}</p>
						<p>单位税额：{{item.price}}</p>
						<p>折扣率：{{item.discount}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="item-card all-count">
						<p class="name">合计(废气、废水)：</p>
						<p>应纳税额:{{water_gas_tax_liability.toFixed(2)}}</p>
						<p>减免税额:{{water_gas_tax_breaks.toFixed(2)}}</p>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="showCard1=false" alt="">
					</div>
				</div>
			</div>
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;">固废，危废税务核算表</h3></Col>
					<img class="icon-down" src="@/assets/img/down2.png"  @click="showCard2=true" v-if="showCard2==false" alt="">
				</Row>
				<div class="w-card" v-if="showCard2==true">
					<div class="item-card" v-for="(item,index) in data_solidDangerous">
						<p class="name">月份:{{item.month}}</p>
						<p>种类：{{item.type}}</p>
						<p>污染物名称：{{item.waste_name}}</p>
						<p>排放量（吨）：{{item.count}}</p>
						<p>单位税额：{{item.price}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="item-card all-count">
						<p class="name">合计(固废、危废)：</p>
						<p>排放量（吨）:{{solid_dang_count_sum.toFixed(2)}}</p>
						<p>应纳税额:{{solid_dang_tax_liability.toFixed(2)}}</p>
						<p>减免税额:{{solid_dang_tax_breaks.toFixed(2)}}</p>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="showCard2=false" alt="">
					</div>
				</div>
<!--				<Table border size="small" :columns="solid_dangerous_column" :data="data_solidDangerous" style="margin-top:20px" show-summary></Table>-->
<!--				<Table border size='small' :columns="sum_solidDangerous_column" :data="sum_solidDangerous" :show-header="false"></Table>-->
			</div>
			<div class="inner-card">
				<Row type="flex" justify="center">
					<Col><h3 style="text-align:center;">噪音税务核算表</h3></Col>
					<img class="icon-down" src="@/assets/img/down2.png"  @click="showCard3=true" v-if="showCard3==false" alt="">
				</Row>
				<div class="w-card" v-if="showCard3==true">
					<div class="item-card" v-for="(item,index) in data_noise">
						<p class="name">月份:{{item.month}}</p>
						<p>监测点：{{item.monitor}}</p>
						<p>编号：{{item.num}}</p>
						<p>类型：{{item.type}}</p>
						<p>时段：{{item.time}}</p>
						<p>检测分贝数：{{item.test_value}}</p>
						<p>超标分贝数：{{item.exceed_value}}</p>
						<p>超标天数：{{item.exceed_day}}</p>
						<p>应纳税额：{{item.tax_liability}}</p>
						<p>减免税额：{{item.tax_breaks}}</p>
						<p>计税依据：{{item.tax_basis}}</p>
					</div>
					<div class="item-card all-count">
						<p class="name">合计(噪音)：</p>
						<p>超标分贝数:{{noise_exceed_value}}</p>
						<p>超标天数:{{noise_exceed_day}}</p>
						<p>应纳税额:{{noise_tax_liability.toFixed(2)}}</p>
						<p>减免税额:{{noise_tax_breaks.toFixed(2)}}</p>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="showCard3=false" alt="">
					</div>
				</div>
<!--				<Table border size="small" :columns="noise_column" :data="data_noise" style="margin-top:20px" show-summary></Table>-->
<!--				<Table border size='small' :columns="sum_noise_column" :data="sum_noise" :show-header="false"></Table>-->
			</div>
			<div class="total">
				<Table border highlight-row :columns="columns1" :data="data1"></Table>
				<h2>{{month_list[0]}}月份合计应缴环保税费：{{tax_month_count[0].toFixed(2)}}</h2>
				<h2>{{month_list[0]}}月份合计减免环保税费：{{tax_breaks_month_count[0].toFixed(2)}}</h2>
				<h2>{{month_list[1]}}月份合计应缴环保税费：{{tax_month_count[1].toFixed(2)}}</h2>
				<h2>{{month_list[1]}}月份合计减免环保税费：{{tax_breaks_month_count[1].toFixed(2)}}</h2>
				<h2>{{month_list[2]}}月份合计应缴环保税费：{{tax_month_count[2].toFixed(2)}}</h2>
				<h2>{{month_list[2]}}月份合计减免环保税费：{{tax_breaks_month_count[2].toFixed(2)}}</h2>
				<h2>合计应缴环保税费：{{total_pay.toFixed(2)}}</h2>
				<h2>合计减免环保税费：{{total_off.toFixed(2)}}</h2>
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
				columns1: [
					{
						title: '月份',
						key: 'month',
						align: 'center',
						width:75
					},
					{
						title: '应缴税费(元)',
						align: 'center',
						key: 'tax_month_count'
					},
					{
						title: '减免税费(元)',
						align: 'center',
						key: 'tax_breaks'
					},
				],
				data1: [],
				showCard1:true,
				showCard2:true,
				showCard3:true,
				showCard4:true,
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
				//废水废气税费合计表
				sum_waterGas_column:[
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
							return this.water_gas_tax_liability.toFixed(2)
						}
					}, {
						align:'center',
						render: (h,params) => {
							return this.water_gas_tax_breaks.toFixed(2)
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}
				],

				//废水废气税费合计表数据
				sum_waterGas:[
					{
						total:'合计'
					}
				],

				water_gas_count_sum:0,
				water_gas_tax_liability:0,
				water_gas_tax_breaks:0,

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
							return this.solid_dang_count_sum.toFixed(2)
						}
					}, {
						align:'center',
						render: (h,params) => {
							return '———'
						}
					}, {
						align:'center',
						render: (h,params) => {
							return this.solid_dang_tax_liability.toFixed(2)
						}
					}, {
						align:'center',
						render: (h,params) => {
							return this.solid_dang_tax_breaks.toFixed(2)
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

				solid_dang_count_sum:0,
				solid_dang_tax_liability:0,
				solid_dang_tax_breaks:0,

				noise_count_sum:0,
				noise_tax_liability:0,
				noise_exceed_value:0,
				noise_exceed_day:0,
				noise_tax_breaks:0,

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
						render: (h,params) => {
							if(params.row.waste_type==1){
								return '废水'
							}else if(params.row.waste_type==2){
								return '废气'
							} else {
								return '———'
							}
						}
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
				],

				//分月统计
				tax_month_count:[0,0,0],
				tax_breaks_month_count:[0,0,0],
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
			this.updataTax()


		},
		computed: {
			//判断是否是企业账户
			isCompanyCount: function() {
				return sessionStorage.getItem('account_type')==1 ? true : false
			},

			//合计应付税费
			total_pay:function(){
				return this.water_gas_tax_liability + this.solid_dang_tax_liability + this.noise_tax_liability
			},

			//合计减免税费
			total_off:function(){
				return this.water_gas_tax_breaks + this.solid_dang_tax_breaks + this.noise_tax_breaks
			},
			month_list:function(){
				if (this.selectQuarter == 1) {
					return ['1','2','3']
				} else if (this.selectQuarter == 2) {
					return ['4','5','6']
				} else if (this.selectQuarter == 3) {
					return ['7','8','9']
				} else if (this.selectQuarter == 4) {
					return ['10','11','12']
				}
			}
		},
		methods: {
			updataTax(){
				setTimeout(()=>{
					this.data1 =  [
						{
							month: this.month_list[0],
							tax_month_count: this.tax_month_count[0].toFixed(2),
							tax_breaks: this.tax_breaks_month_count[0].toFixed(2),
						},
						{
							month: this.month_list[1],
							tax_month_count: this.tax_month_count[1].toFixed(2),
							tax_breaks: this.tax_breaks_month_count[1].toFixed(2),
						},
						{
							month: this.month_list[2],
							tax_month_count: this.tax_month_count[2].toFixed(2),
							tax_breaks: this.tax_breaks_month_count[2].toFixed(2),
						},
						{
							month: '合计',
							tax_month_count: this.total_pay.toFixed(2),
							tax_breaks: this.total_off.toFixed(2),
						},
					]
				},500)
			},
			handleGetTaxData(){
				let data = {
					enterprise_id:this.search.enterprise_id || sessionStorage.getItem('enterprise_id'),
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
						//初始化表格
						this. _resetTable()
					} else {
						this. _resetTable()
						for(let month in res.data) {
							res.data[month].water_arr.forEach(item => {
								this._waterGasGatherData(item,month)
							})
							res.data[month].gas_arr.forEach(item => {
								this._waterGasGatherData(item,month)
							})
							res.data[month].solid_arr.forEach(item => {
								this._solidDangGatherData(item,month)
							})
							res.data[month].dangerous_arr.forEach(item => {
								this._solidDangGatherData(item,month)
							})
							res.data[month].noise_arr.forEach(item => {
								this._noiseGatherData(item,month)
							})
						}
					}
				})
				this.updataTax()
			},

			handleCalTaxData(){
				let data = {
					enterprise_id:this.search.enterprise_id || sessionStorage.getItem('enterprise_id'),
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

			//企业ID变化
			handleEnterpriseChange(){
				this.search.enterprise_id = this.enterprise_id
				this.handleGetTaxData()
			},

			//重置表格信息
			_resetTable(){
				this.data_waterGas = [],
				this.data_solidDangerous = [],
				this.data_noise = []
				this.water_gas_count_sum = 0
				this.water_gas_tax_liability = 0
				this.water_gas_tax_breaks = 0
				this.solid_dang_count_sum = 0
				this.solid_dang_tax_liability = 0
				this.solid_dang_tax_breaks = 0
				this.noise_count_sum=0
				this.noise_tax_liability=0
				this.noise_exceed_value=0
				this.noise_exceed_day=0
				this.noise_tax_breaks=0
				this.tax_month_count=[0,0,0]
				this.tax_breaks_month_count=[0,0,0]
			},
			//废水废气表格渲染
			_waterGasGatherData(item,month){
				this.data_waterGas.push(item)
				this.water_gas_count_sum += item.count
				this.water_gas_tax_liability += item.tax_liability
				this.water_gas_tax_breaks += item.tax_breaks
				this.tax_month_count[month] += item.tax_liability
				this.tax_breaks_month_count[month] += item.tax_breaks
			},

			//废固危废表格渲染
			_solidDangGatherData(item,month){
				this.data_solidDangerous.push(item)
				this.solid_dang_count_sum += item.count
				this.solid_dang_tax_liability += item.tax_liability
				this.solid_dang_tax_breaks += item.tax_breaks
				this.tax_month_count[month] += item.tax_liability
				this.tax_breaks_month_count[month] += item.tax_breaks
			},

			//噪音表格渲染
			_noiseGatherData(item,month){
				this.data_noise.push(item)
				this.noise_count_sum += item.count
				this.noise_tax_liability += item.tax_liability
				this.noise_exceed_value += item.exceed_value
				this.noise_exceed_day += item.exceed_day
				this.noise_tax_breaks += item.tax_breaks
				this.tax_month_count[month] += item.tax_liability
				this.tax_breaks_month_count[month] += item.tax_breaks
			}
		}
	}
</script>

<style scoped>
	.content>>>.ivu-table-cell{
		font-size: 26px;
	}
	.content>>>.ivu-row-flex-center{
		padding: 30px 0;
	}
</style>
<style lang="less" scoped>
	.page{
		padding-top: 112px;
		background-color: #F7F7FA;
		.day-date{
			display: flex;
			padding: 30px 10px 20px;
		}
		.btn1{
			text-align: right;
			margin: 10px 0 20px;
		}
		.content{
			background-color: #ffffff;
			padding: 30px 0;
			text-align: left;
			.card{
				border-top:solid 1px #ECECEC;
				padding: 30px 44px;
				position: relative;
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
					padding:0px 0 30px;
				}
				.fold{
					display: flex;
					align-items: center;
					justify-content: center;
					border-top: solid 1px #B3B3B3;
					padding-top: 10px;
					img{
						height: 50px;
						margin-top: 10px;
					}
				}
				.icon-down{
					position: absolute;
					right: 25px;
					top: 25px;
					height: 50px;
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
					padding-bottom: 10px;
					span{
						position: absolute;
						right: 10px;
						color: #4f5e66;
					}
				}
			}
			.all-count{
				background: #f2faff;
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
		font-size: 36px;
		padding: 30px 25px;
	}
</style>
