<template>
	<div class="page">
        <div class="head-bar">
			<img src="" alt="">
			环保数据
        </div>
		<div class="card">
			<div class="item" @click="openAlarm">
				<p class="type">预警告警
					<img src="@/assets/img/warn.png" alt="">
				</p>
				<div class="ctx">
					<p >水体污染</p>
					<span class="tip">超出标准</span>
				</div>
			</div>
			<div class="item" @click="openAd">
				<p class="type">税务核算<img src="@/assets/img/icon8.png" alt=""></p>
				<div class="ctx">
					<div>
						水体污染超出指标10%，如本季度未控制排放，税收将增加
					</div>
				</div>
			</div>
		</div>

		<div class="my-chart">
			<div class="title">
				企业污染物排放类型分布（kg）
			</div>
			<ve-pie :extend="chartExtend"  :legend-visible="false" :data="chartData" width="320px" height="220px"  :data-empty="dataEmpty1"  style="margin: 0 auto;" ></ve-pie>
		</div>

		<div class="my-chart">
			<div class="title" style="margin-bottom: 0">
				大气主要污染物排放情况
			</div>
			<ve-bar  :data="chartData1" width="340px"  height="260px" legend-position="top"  :data-empty="dataEmpty2"></ve-bar>
		</div>

		<div class="my-chart">
			<div class="title">
				水体主要污染物排放情况
			</div>
			<ve-bar  :data="chartData2" width="340px"  height="260px" legend-position="top"  :data-empty="dataEmpty3"></ve-bar>
		</div>
	</div>
</template>
<script>
	import {getEnterInfo,indexList} from '@/lib/API/comment'
	export default {
		data(){
			this.chartExtend = {
				series: {
					radius: ['0%', '60%'],
					center:[150,'center']
				},
			};
			return{
				inforCardData: [
					{ title: '注册企业', icon: 'android-person-add', count:0, color: '#2d8cf0' },
					{ title: '正常运行', icon: 'load-a', count:0, color: '#19be6b' },
					{ title: '工业废水', icon: 'waterdrop', count:0, color: '#ed3f14' },
					{ title: '工业废气', icon: 'fireball', count:0, color: '#ed3f14' },
					{ title: '危险废物', icon: 'nuclear', count:0, color: '#ed3f14' },
					{ title: '噪声污染', icon: 'radio-waves', count:0, color: '#ed3f14' },
					{ title: '环境违法', icon: 'leaf', count:0, color: '#ed3f14' },
					{ title: '申报环保税', icon: 'ios-compose', count:0, color: '#E46CBB' },
				],
				chartData3: {
					columns: ['类型', '数量'],
					rows: []
				},
				markers: [],
				//表格
				tabledata:[],
				dataEmpty1: false,
				dataEmpty2: false,
				dataEmpty3: false,
				dataEmpty4: false,
				//饼图
				chartData: {
					columns: ['污染物', '排放总量'],
					rows: []
				},
				//柱状1
				chartData1: {
					columns: ['污染物', '许可量（t/a）', '排放量（t）'],
					rows: []
				},
				//柱状2
				chartData2: {
					columns: ['污染物', '许可量（t/a）', '排放量（t）'],
					rows: []
				},
			}
		},
		created(){
			// this.getEnterInfo()
		},
		mounted(){
			// this.account_type=sessionStorage.getItem("account_type");
			// if(this.account_type!=1){
			// 	this.getinfolist();
			// }else{
			// 	this.getEnterInfo()
			// }
			this.getEnterInfo()
		},
		activated() {
			this.getEnterInfo()
		},
		methods:{
			//管理员账户，获取统计数据
			getinfolist(){
				indexList().then(res=>{
					console.log(res);
					if(res.errno==0){
						this.list=res.data;
						this.product_count=res.data.product_count;
						this.use_count=res.data.use_count;
						this.out_count=res.data.out_count;
						this.remain_count=res.data.remain_count;
						let enterprise_list=res.data.enterprise_list;
						for(var i in enterprise_list){
							if(enterprise_list[i].longit&&enterprise_list[i].lati){
								let maker_info={
									label:{
										content:enterprise_list[i].enterprise_name,
										offset:[20,3]
									},
									position:[enterprise_list[i].longit,enterprise_list[i].lati]
								};
								this.markers.push(maker_info)
							}
						}
						this.inforCardData[0].count=this.list.enterprise_list.length;
						this.inforCardData[1].count=this.list.normal_list.length;
						this.inforCardData[2].count=this.list.wastewater_list.length;
						this.inforCardData[3].count=this.list.wastegas_list.length;
						this.inforCardData[4].count=this.list.dangerous_waste_list.length;
						this.inforCardData[5].count=this.list.noise_list.length;
						this.inforCardData[6].count=this.list.illegal_record_list.length;
						this.inforCardData[7].count=this.list.et_list.length;
						if(this.list.wastewater_control.length==0&&this.list.wastegas_control.length==0){
							this.dataEmpty4=true;
						}else{
							this.chartData3.rows.push({'类型':'废水','数量':this.list.wastewater_control.length});
							this.chartData3.rows.push({'类型':'废气','数量':this.list.wastegas_control.length});
						}
					}else{
						// this.$toast('获取统计数据出错')
					}
				})
			},
			openAd(){
				// this.$toast('建设中……')
				this.$router.push({name:"建设"})
			},
			openAlarm(){
				this.$router.push({name:'告警'})
			},
			//企业账户，获取单个企业统计数据
			async getEnterInfo(){
				this.chartData.rows=[]
				this.chartData1.rows=[]
				this.chartData2.rows=[]
				let res = await getEnterInfo()
				if(res.errno==100){
					sessionStorage.setItem('has_enterprise_detail', 0)
					// this.dataEmpty1 = true
					// this.dataEmpty2 = true
					// this.dataEmpty3 = true
					return
				} else {
					sessionStorage.setItem('has_enterprise_detail', 1)
				}
				// console.log(res);
				//企业污染物排放类型分布,取出废水废气所有测试指标
				let water_total_list=res.data.water_total_list;
				let gas_total_list=res.data.gas_total_list;
				let data=[];
				//废水
				if(water_total_list){
					for(var i in water_total_list){
						for(var j in water_total_list[i]){
							let total_count=0;
							if(water_total_list[i][j].outfall_count){
								let total_month=JSON.parse(water_total_list[i][j].outfall_count);
								for(var h in total_month){
									total_count=parseFloat(total_month[h].total)+total_count
								};
							};
							if(water_total_list[i][j].index_array){
								let index_array=JSON.parse(water_total_list[i][j].index_array);
								let outfall_name=water_total_list[i][j].outfall_name;
								for(var k in index_array){
									index_array[k].outfall_name=outfall_name;
									let count_sum=total_count*index_array[k].index_value/1000;
									index_array[k].total=parseFloat(count_sum.toFixed(2));
									let a=0;
									for(var f in data){
										if(data[f].name==index_array[k].name){
											let avg=(data[f].index_value+index_array[k].index_value)/2
											avg=parseFloat(avg.toFixed(2));
											data[f].index_value=avg;
											data[f].total=data[f].total+index_array[k].total;
											a=1;
										}
									};
									if(a==0){
										data.push(index_array[k])
									}
								}
							}
						}
					}
				};
				//废气
				if(gas_total_list){
					for(var i in gas_total_list){
						for(var j in gas_total_list[i]){
							let total_count=0;
							if(gas_total_list[i][j].outfall_count){
								let total_month=JSON.parse(gas_total_list[i][j].outfall_count);
								for(var h in total_month){
									total_count=parseFloat(total_month[h].total)+total_count
								};
							};
							if(gas_total_list[i][j].index_array){
								let index_array=JSON.parse(gas_total_list[i][j].index_array);
								let outfall_name=gas_total_list[i][j].vent_name;
								for(var k in index_array){
									index_array[k].outfall_name=outfall_name;
									let count_sum=total_count*index_array[k].index_value/1000000;
									index_array[k].total=parseFloat(count_sum.toFixed(2));
									let a=0;
									for(var f in data){
										if(data[f].name==index_array[k].name){
											let avg=(data[f].index_value+index_array[k].index_value)/2
											avg=parseFloat(avg.toFixed(2));
											data[f].index_value=avg;
											data[f].total=data[f].total+index_array[k].total;
											a=1;
										}
									};
									if(a==0){
										data.push(index_array[k])
									}
								}
							}
						}
					}
				};
				if(data){
					//表格
					for(var i in data){
						let status='未知';
						if(data[i].limit_value!='无'){
							let limit5=data[i].limit_value*0.5;
							let limit7=data[i].limit_value*0.7;
							if(data[i].index_value>data[i].limit_value){
								status='超标';
							}else if(data[i].limit_value>=data[i].index_value&&data[i].index_value>=limit7){
								status='达标';
							}else if(limit7>data[i].index_value&&data[i].index_value>=limit5){
								status='低排放';
							}else{
								status='超低排放';
							}
						};
						let info={
							name:data[i].name,
							outfall_name:data[i].outfall_name,
							density:data[i].index_value,
							limit:data[i].limit_value,
							status:status
						};
						this.tabledata.push(info);
					};
					//饼图
					let bingdata_rows=[];
					for(var i in data){
						let info={
							'污染物':data[i].name+'('+data[i].total+')',
							'排放总量':data[i].total
						};
						bingdata_rows.push(info);
					};
					if(bingdata_rows.length==0){
						this.dataEmpty1=true
					};
					this.chartData.rows=bingdata_rows;
					//大气污染物柱状图以及水体污染物柱状图
					let gasdata=[];
					let waterdata=[];
					for(var i in data){
						if(data[i].index_type.indexOf('water')!= -1){
							waterdata.push(data[i])
						};
						if(data[i].index_type.indexOf('gas')!= -1){
							gasdata.push(data[i])
						};
					};
					if(gasdata.length>0){
						for(var i in gasdata){
							let info={
								'污染物':gasdata[i].name,
								'许可量（t/a）':gasdata[i].limit_value,
								'排放量（t）':gasdata[i].index_value,
							};
							this.chartData1.rows.push(info)
						};
					}else{
						this.dataEmpty2=true;
					};
					if(waterdata.length>0){
						for(var i in waterdata){
							let info={
								'污染物':waterdata[i].name,
								'许可量（t/a）':waterdata[i].limit_value,
								'排放量（t）':waterdata[i].index_value,
							};
							this.chartData2.rows.push(info)
						}
					}else{
						this.dataEmpty3=true;
					};
					// console.log(gasdata)

				};
				// console.log(data);
			},
		}
	}
</script>
<style>
	.van-tabbar--fixed{
		height: 100px;
		border-top: solid 0.5px #B3B3B3!important;
		background:rgba(247,247,247,1);
	}
	.v-charts-data-empty{
		margin-top: -320px;
	}
</style>
<style lang="less" scoped>
	.page{
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 390px 0 120px;
		.head-bar{
			position: fixed;
			top: 0;
			z-index: 9;
			width: 100%;
			font-size:28px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			height:170px;
			line-height:120px;
			background:linear-gradient(315deg,rgba(24,148,88,1) 0%,rgba(39,166,101,1) 100%);
		}
		.card{
			width:684px;
			height:268px;
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
			padding: 26px 30px;
			display: flex;
			justify-content: space-between;
			.type{
				img{
					width: 30px;
					margin-left: 10px;
				}
			}
			.item{
				flex: 1;
				font-size:22px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				>p{
					font-size:28px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40px;
				}
				.ctx{
					width:290px;
					height:160px;
					margin-top: 10px;
					background:rgba(247,247,247,1);
					border-radius:10px;
					padding: 14px 18px;
					box-sizing: border-box;
					.tip{
						font-size:22px;
						font-weight:400;
						color:#FF3A3A;
					}
				}
			}
		}
		.my-chart{
			width:684px;
			height:508px;
			background:rgba(255,255,255,1);
			border-radius:10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20px;
			.title{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height:40px;
				margin: 30px 0;
			}
		}
	}
</style>
