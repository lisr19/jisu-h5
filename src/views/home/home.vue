<template>
	<div class="page">
        <div class="head-bar">
			<img src="" alt="">
			环保数据
        </div>
		<div class="card">
			<div class="item" @click="openAlarm">
				<p class="type">预警告警</p>
				<div class="ctx">
					<img src="@/assets/img/i-one.png" alt="" style="width: 65%;margin:0px 0 0 12px">
				</div>
			</div>
			<div class="item" @click="openTax">
				<p class="type">税务核算</p>
				<div class="ctx">
					<img src="@/assets/img/i-two.png" alt="" style="width: 50%;margin:8px 0 0 10px">
				</div>
			</div>
		</div>
		<template v-if="isQy">
			<div class="my-chart">
				<div class="title">
					企业污染物排放类型分布（kg）
				</div>
				<ve-pie :extend="chartExtend"  :legend-visible="false" :data="chartData" width="320px" height="210px"  :data-empty="dataEmpty1"  style="margin: 0 auto;" ></ve-pie>
			</div>

			<div class="my-chart">
				<div class="title" style="margin-bottom: 0">
					大气主要污染物排放情况
				</div>
				<ve-bar  :data="chartData1" width="320px"  height="250px" legend-position="top"  :data-empty="dataEmpty2"></ve-bar>
			</div>

			<div class="my-chart">
				<div class="title" style="margin-bottom: 0">
					水体主要污染物排放情况
				</div>
				<ve-bar  :data="chartData2" width="320px"  height="250px" legend-position="top"  :data-empty="dataEmpty3"></ve-bar>
			</div>
		</template>
		<template v-if="!isQy">
			<div class="admin">
				<p>工业废物排放量</p>
				<p><Icon type="trash-a" style="font-size:20px;color:red;"></Icon>产生量：<span style="font-size:20px;color:red;margin-right:5px">{{product_count}}</span>吨</p>
				<p><Icon type="android-sync" style="font-size:20px;color:#19be6b;"></Icon>利用量：<span style="font-size:20px;color:#19be6b;margin-right:5px">{{use_count}}</span>吨</p>
				<p><Icon type="android-navigate" style="font-size:20px;color:#f50;"></Icon>委外处理量：<span style="font-size:20px;color:#f50;margin-right:5px">{{out_count}}</span>吨</p>
				<p><Icon type="ios-folder" style="font-size:20px;color:red;"></Icon>剩余量：<span style="font-size:20px;color:red;margin-right:5px">{{remain_count}}</span>吨</p>
			</div>
			<div class="map">
				<p>管理区域企业分布图</p>
				<div class="amap-page-container" >
					<el-amap vid="amapDemo" :zoom="zoom" :center="center" :expandZoomRange="expandZoomRange" :zooms="zooms"
							 style="height:250px;width: 100% ">
						<el-amap-marker v-for="(marker, index) in markers" v-bind:key="index.position" :position="marker.position"
										:visible="marker.visible" :label="marker.label" :vid="index"></el-amap-marker>
					</el-amap>
				</div>
			</div>

		</template>
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
				isQy:true,
				product_count:0,
				use_count:0,
				out_count:0,
				remain_count:0,
				zoom: 10,
				expandZoomRange: true,
				zooms: [3, 20],
				center: [113.264417, 23.130067],
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
		mounted(){
			this.account_type=sessionStorage.getItem("account_type");
			if(this.account_type==1){
				this.isQy=true
				this.getEnterInfo()
			}else if(this.account_type==0){
				this.isQy=false
				this.getinfolist();
			}
		},
		activated() {
			this.account_type=sessionStorage.getItem("account_type");
			if(localStorage.getItem('from')==='login'&& this.account_type==1){
				this.isQy=true
				this.getEnterInfo()
				localStorage.setItem('from','')
			}
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
			openTax(){
				this.$router.push({name:"税务"})
			},
			openAlarm(){
				this.$router.push({name:'告警'})
			},
			//企业账户，获取单个企业统计数据
			async getEnterInfo(){
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
							let total_month;
							if(water_total_list[i][j].outfall_count){
								total_month=JSON.parse(water_total_list[i][j].outfall_count);
								//for(var h in total_month){
								//total_count=parseFloat(total_month[h].total)+total_count
								//};
							};
							if(water_total_list[i][j].index_array){
								let index_array=JSON.parse(water_total_list[i][j].index_array);
								let outfall_name=water_total_list[i][j].outfall_name;
								for(var k in index_array){
									index_array[k].outfall_name=outfall_name;
									let count_sum=(total_month[0].total*index_array[k].index_value1+total_month[1].total*index_array[k].index_value2+total_month[2].total*index_array[k].index_value3)/1000;
									index_array[k].total=parseFloat(count_sum.toFixed(2));
									let a=0;
									for(var f in data){
										if(data[f].name==index_array[k].name){
											let avg=(data[f].index_value+index_array[k].index_value1+index_array[k].index_value2+index_array[k].index_value3)/4;
											avg=parseFloat(avg.toFixed(2));
											data[f].index_value=avg;
											data[f].total=data[f].total+index_array[k].total;
											a=1;
										}
									};
									if(a==0){
										let avg=(index_array[k].index_value1+index_array[k].index_value2+index_array[k].index_value3)/3;
										avg=parseFloat(avg.toFixed(2));
										index_array[k].index_value=avg;
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
							let total_month;
							let total_count=0;
							if(gas_total_list[i][j].outfall_count){
								total_month=JSON.parse(gas_total_list[i][j].outfall_count);
								//for(var h in total_month){
								//total_count=parseFloat(total_month[h].total)+total_count
								//};
							};
							if(gas_total_list[i][j].index_array){
								let index_array=JSON.parse(gas_total_list[i][j].index_array);
								let outfall_name=gas_total_list[i][j].vent_name;
								for(var k in index_array){
									index_array[k].outfall_name=outfall_name;
									let count_sum=(total_month[0].total*index_array[k].index_value1+total_month[1].total*index_array[k].index_value2+total_month[2].total*index_array[k].index_value3)/1000000;
									index_array[k].total=parseFloat(count_sum.toFixed(2));
									let a=0;
									for(var f in data){
										if(data[f].name==index_array[k].name){
											let avg=(data[f].index_value+index_array[k].index_value1+index_array[k].index_value2+index_array[k].index_value3)/4;
											avg=parseFloat(avg.toFixed(2));
											data[f].index_value=avg;
											data[f].total=data[f].total+index_array[k].total;
											a=1;
										}
									};
									if(a==0){
										let avg=(index_array[k].index_value1+index_array[k].index_value2+index_array[k].index_value3)/3;
										avg=parseFloat(avg.toFixed(2));
										index_array[k].index_value=avg;
										data.push(index_array[k])
									}
								}
							}
						}
					}
				};
				if(data.length>0){
					//表格
					// console.log('data',data)
					for(let i in data){
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
							'污染物':data[i].name+'('+data[i].total+')' || '暂无污染物',
							'排放总量':data[i].total || 0
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
						// this.dataEmpty2=true;
						let info={
							'污染物':'暂无污染物',
							'许可量（t/a）':100,
							'排放量（t）':0,
						};
						this.chartData1.rows.push(info)
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

				}else{
					let bingdata_rows=[];
					let info={
						'污染物':'暂无污染物',
						'排放总量':0
					};
					bingdata_rows.push(info);
					this.chartData.rows=bingdata_rows;

					let info_1={
						'污染物':'暂无',
						'许可量（t/a）':'100',
						'排放量（t）':'0',
					};
					this.chartData1.rows.push(info_1)

					let info_2={
						'污染物':'暂无',
						'许可量（t/a）':'100',
						'排放量（t）':'0',
					};
					this.chartData2.rows.push(info_2)
				}
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
				.type{
					font-size:38px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:50px;
					text-align: center;
				}
				.ctx{
					width:290px;
					height:160px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 10px;
					border-radius:10px;
					box-sizing: border-box;
					img{
						width:60%;
					}
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

		.admin{
			padding: 20px;
		}
		.map{
			width: 100%;
			padding: 20px;
			p{
				margin: 10px 0;
			}
		}
	}
</style>
