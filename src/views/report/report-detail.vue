<template>
	<div class="page">
		<head-bar title="环保动态数据详情"></head-bar>
		<div class="content">
			<Form ref="form3" :model="form3"  :label-width="100">
				<div  class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  @click="base_show=true" v-if="base_show==false" alt="">
					<p >1、企业季度信息</p>
				</div>
				<div class="inner-card" v-if="base_show==true">
					<div v-if="quarter_info_base.length>0" class="w-card">
						<div class="item-card" v-for="(item,index) in quarter_info_base">
							<p class="name">月份：{{item.month}}</p>
							<p>产值（元）：
								<Input type="number" placeholder="0" v-model="item.output_value"></Input>
<!--								{{item.output_value}}-->
							</p>
							<p>纳税（元）：
								<Input type="number" placeholder="0" v-model="item.pay_taxes"></Input>
							</p>
							<p>用水（吨）：
								<Input type="number" placeholder="0" v-model="item.use_water"></Input>
							</p>
							<p>用电（度）：
								<Input type="number" placeholder="0" v-model="item.use_electricity"></Input>
							</p>
							<p>生产时间（h）：
								<Input type="number" placeholder="" v-model="item.time" @on-change='prodTime(item,index)'></Input>
							</p>
						</div>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="base_show=false" alt="">
						</div>
					</div>
					<div v-else class="null">暂无数据</div>
<!--					<Table border highlight-row size="small" :columns="columns1" :data="quarter_info_base" ></Table>-->
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  @click="water_show=true" v-if="water_show==false" alt="">
					<p >2、是否产生工业废水</p>
					<RadioGroup v-model="form3.waste_water"  >
						<Radio :label="0" border disabled>否</Radio>
						<Radio :label="1" border disabled>是</Radio>

					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="showWater" v-show="water_show">
						<div class="item-card" v-for="(item,index) in water_waste_total" :key="index">
							<div style="margin:5px 0 0 0;" v-for="(item2,index1) in item.wastewater_total" :key="index1">
								<span>排污监测点：</span> <i-input disabled type="text" v-model="item2.outfall_name" placeholder="请输入排污监测点名称" ></i-input>
								<!-- <Button type="primary" class="button1" @click="delete_total('water',index,index1)" style="width:60px">删除</Button> -->
								<p style="margin-top:5px;">
									<span>废水类型：</span>
									<i-select v-model="item.type_id" disabled style="width:200px" >
										<i-option v-for="item1 in wastewater_type_data" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
									</i-select>
								</p>
								<p style="margin-top:5px;">
									<span>废水流量：</span> <InputNumber  v-model="item2.count" placeholder="请输入废水流量"  @on-change="update_outfall_count(index,index1)"></InputNumber>m³/h
								</p>
								<p class="line"></p>
								<p style="margin-top:20px;">
									<span>污染物分月排量（m³）</span>
								</p>
								<div class="card-two" v-for="(item3,index3) in item2.outfall_count" :key="index3">
									<p class="name">月份：{{item3.month}}</p>
									<p>生产时间（h）：
										<Input type="number" placeholder="0" v-model="item3.hours" @on-change='changeWaterhours(item3,index,index3)'></Input>
									</p>
									<p>总量(m³)：
										{{item3.total}}
									</p>
								</div>
<!--								<Table border highlight-row size="small" :columns="columns4" :data="item2.outfall_count" @on-row-click='water_waste_index(index,index1)'></Table>-->
								<p class="line"></p>
								<p style="margin-top:20px;">
									<span>污染物分月浓度（mg/l）</span>
								</p>
<!--								<div class="card-two" v-for="(item3,index3) in item2.index_array" >-->
<!--									<p class="name">污染物名称：{{item3.name}}</p>-->
<!--									<p>月份：{{item3.month}}-->
<!--&lt;!&ndash;										<Input type="number" placeholder="0" v-model="item3.hours"></Input>&ndash;&gt;-->
<!--									</p>-->
<!--									<p>阈值： {{item3.limit_value}}</p>-->
<!--									<p>执行标准： {{item3.standard}}</p>-->
<!--									<p>备注： {{item3.remarks}}</p>-->
<!--								</div>-->

								<Table border highlight-row size="small" :columns="columns_index" :data="item2.index_array" @on-row-click='water_waste_index(index,index1)'></Table>
							</div>
							<p class="line"></p>
							<p style="margin-top:20px;">
								<span>是否有废水治理设施：</span>
								<RadioGroup v-model="item.wa_tr_fa">
									<Radio :label="0" border>否</Radio>
									<Radio :label="1" border>是</Radio>
								</RadioGroup>
							</p>
							<div v-if="item.wa_tr_fa==1">
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=31;water_attach=index;attach_title='主要污染物治理设施方案、污染防治设施日常运行记录表';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">主要污染物治理设施方案、污染防治设施日常运行记录表</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="item.wa_tr_fa_attach"></Table>
							</div>
							<p class="line"></p>
							<p style="margin-top:20px;">
								<span>委外运行废水治理设施：</span>
								<RadioGroup v-model="item.ou_wa_fa">
									<Radio :label="0" border>自营</Radio>
									<Radio :label="1" border>委外</Radio>
								</RadioGroup>
							</p>
							<div v-if="item.ou_wa_fa==0">
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=32;water_attach=index;attach_title='运营方案、责任人和运营技术团队资料等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">运营方案、数据</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="item.ou_wa_fa_attach"></Table>
							</div>
							<div v-else>
								<span>选择第三方公司：</span>
								<i-select v-model="item.third_enterprise_id" style="width:200px" >
									<i-option v-for="item1 in third_Enterprise_Select" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
								</i-select>
							</div>
						</div>
						<div class="item-card">
							<div >
								<span>环境监测类型</span>
								<i-select v-model="form3.em_type_info[0].em_type" style="width:150px;margin-left:30px" >
									<i-option  :value="1">自行监控</i-option>
									<i-option  :value="2">委托监控</i-option>
									<i-option  :value="3">自动监控</i-option>
									<i-option  :value="4">其他</i-option>
								</i-select>
							</div>
							<div >
								<div style="margin:0 0 10px 0;padding:10px;background-color:#fff" >
									<div v-if="form3.em_type_info[0].em_type==1">
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">企业实验室的监测资质文件,监测报告</p>
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[0].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[0].em_type==2">
										<p  style="margin-bottom:5px">
											<span>选择第三方公司：</span>
											<i-select v-model="form3.em_type_info[0].em_type_third_enterprise_id" style="width:200px" >
												<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
											</i-select>
										</p>
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='评测报告扫描件,委托合同、被委托单位的资质文件';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">评测报告扫描件,委托合同、被委托单位的资质文件</p>
											<Button  type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[0].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[0].em_type==3">
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料</p>
											<Button  type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[0].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[0].em_type==4">
										<p style="margin-bottom:5px">
											<span>说明：</span> <i-input type="text" v-model="form3.em_type_info[0].em_type_explain" placeholder="请输入说明" ></i-input>
										</p>
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='相关佐证材料';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">相关佐证材料</p>
											<Button  type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[0].em_type_attach"></Table>
									</div>
								</div>
							</div>
						</div>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="water_show=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  @click="gas_show=true" v-if="gas_show==false" alt="">
					<p >3、是否产生工业废气</p>
					<RadioGroup v-model="form3.waste_gas" >
						<Radio :label="0" border disabled>否</Radio>
						<Radio :label="1" border disabled>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="showGas" v-show="gas_show">
					<div class="w-card">
						<p>
							<span>是否废气治理设施：</span>
							<RadioGroup v-model="ga_tr_fa">
								<Radio :label="0" border>否</Radio>
								<Radio :label="1" border>是</Radio>
							</RadioGroup>
						</p>
						<div class="item-card"  v-if="ga_tr_fa==1">
							<!-- <div style="margin-bottom:5px">
                              <Button type="primary" class="button1" @click="add_index=true;index_title='废气治理设施';index_type=33"  style="width:100px">添加测试指标</Button>
                            </div>
                            <Table border highlight-row size="small" :columns="columns_index" :data="ga_tr_fa_index_array"></Table> -->
							<div style="margin-bottom:15px">
								<Button type="primary" class="button1" @click="attach_type=33;attach_title='主要污染物治理设施方案、污染防治设施日常运行记录表';add_attach=true" style="width:100px">添加附件</Button>
								<p style="color:red">主要污染物治理设施方案、污染防治设施日常运行记录表</p>
							</div>
							<Table border highlight-row size="small" :columns="columns_attach" :data="ga_tr_fa_attach"></Table>
						</div>
						<p class="line"></p>
						<p style="margin:20px 0">
							<span>委外运行废气治理设施：</span>
							<RadioGroup v-model="ou_ga_fa">
								<Radio :label="0" border>自营</Radio>
								<Radio :label="1" border>委外</Radio>
							</RadioGroup>
						</p>
						<div class="item-card" v-if="ou_ga_fa==0">
							<div style="margin-bottom:5px">
								<Button type="primary" class="button1" @click="attach_type=34;attach_title='运营方案、责任人和运营技术团队资料等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
								<p style="color:red">运营方案、数据</p>
							</div>
							<Table border highlight-row size="small" :columns="columns_attach" :data="ou_ga_fa_attach"></Table>
						</div>
						<div v-else  class="item-card">
							<span>选择第三方公司：</span>
							<i-select v-model="ou_ga_fa_third_enterprise_id" style="width:200px" >
								<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
							</i-select>
						</div>
						<p class="line" style="margin: 20px 0"></p>
						<p style="margin:15px 0 0 0">
							<span>废气分布：</span>
							<!-- <Button type="primary" class="button1" @click="add_total('gas')" style="width:150px">添加排气监测点</Button> -->
						</p>
						<div style="margin:10px 0 0 0;padding:10px;border:1px solid #007aff;border-radius:2px" v-for="(item,index) in wastegas_total" :key="index">
							<p>排气监测点：<i-input disabled type="text" v-model="item.vent_name" placeholder="请输入排气监测点名称" style="width:200px"></i-input>
							</p>
							<!-- <Button type="primary" class="button1" @click="delete_total('gas',index)" style="width:60px">删除</Button> -->

							<p style="margin-top:5px;margin-bottom:5px">
								<span style="margin-left:12px">排放风量：</span> <InputNumber  v-model="item.count" placeholder="请输入排放风量" style="width:100px" @on-change="update_gas_outfall_count(index)"></InputNumber>标杆m³/h
							</p>
							<p class="line"></p>
							<p style="margin-top:5px;">
								<span>污染物分月排量（m³）</span>
							</p>
<!--							<div class="card-two" v-for="(item3,index3) in item.outfall_count" >-->
<!--								<p class="name">月份：{{item3.month}}</p>-->
<!--								<p>生产时间（h）：{{item3.hours}}</p>-->
<!--								<p>总量(m³)：{{item3.total}}</p>-->
<!--							</div>-->

							<Table border highlight-row size="small" :columns="columns5" :data="item.outfall_count" @on-row-click='gas_waste_index(index)'></Table>

							<!-- <div style="margin-top:5px;margin-bottom:5px">
                              <Button type="primary" class="button1" @click="add_index=true;index_title='排气监测点数据';index_type=index.toString()+'gas'"  style="width:100px">添加指标</Button>
                            </div> -->
							<p class="line"></p>
							<p style="margin-top:5px;">
								<span>污染物分月浓度（mg/m³）</span>
							</p>
<!--							<div class="card-two" v-for="(item3,index3) in item.index_array" >-->
<!--								<p class="name">污染物名称：{{item3.name}}</p>-->
<!--								<p>月份：</p>-->
<!--								<p>阈值： {{item3.limit_value}}</p>-->
<!--								<p>执行标准： {{item3.standard}}</p>-->
<!--								<p>备注： {{item3.remarks}}</p>-->
<!--							</div>-->
							<Table style="margin-top:5px" border highlight-row size="small" :columns="columns_index1" :data="item.index_array" @on-row-click='gas_waste_index(index)'></Table>
						</div>
						<div class="item-card" style="margin-top: 20px">
							<div >
								<span>环境监测类型</span>
								<i-select v-model="form3.em_type_info[1].em_type" style="width:150px;margin-left:30px" >
									<i-option  :value="1">自行监控</i-option>
									<i-option  :value="2">委托监控</i-option>
									<i-option  :value="3">自动监控</i-option>
									<i-option  :value="4">其他</i-option>
								</i-select>
							</div>
							<div >
								<div style="margin:0 0 10px 0;padding:10px;background-color:#fff" >
									<div v-if="form3.em_type_info[1].em_type==1">
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=39;attach_title='企业实验室的监测资质文件,监测报告';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">企业实验室的监测资质文件,监测报告</p>
											<Button type="primary" class="button1" @click="attach_type=39;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[1].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[1].em_type==2">
										<p  style="margin-bottom:5px">
											<span>选择第三方公司：</span>
											<i-select v-model="form3.em_type_info[1].em_type_third_enterprise_id" style="width:200px" >
												<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
											</i-select>
										</p>
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=39;attach_title='评测报告扫描件,委托合同、被委托单位的资质文件';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">评测报告扫描件,委托合同、被委托单位的资质文件</p>
											<Button  type="primary" class="button1" @click="attach_type=39;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[1].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[1].em_type==3">
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=38;attach_title='自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料</p>
											<Button  type="primary" class="button1" @click="attach_type=38;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[1].em_type_attach"></Table>
									</div>
									<div v-if="form3.em_type_info[1].em_type==4">
										<p style="margin-bottom:5px">
											<span>说明：</span> <i-input type="text" v-model="form3.em_type_info[1].em_type_explain" placeholder="请输入说明" ></i-input>
										</p>
										<div style="margin-bottom:5px">
											<Button type="primary" class="button1" @click="attach_type=39;attach_title='相关佐证材料';add_attach=true" style="width:100px">添加附件</Button>
											<p style="color:red">相关佐证材料</p>
											<Button  type="primary" class="button1" @click="attach_type=39;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
										</div>
										<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[1].em_type_attach"></Table>
									</div>
								</div>
							</div>
						</div>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="gas_show=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  @click="solid_show=true" v-if="solid_show==false" alt="">
					<p >4、是否产生一般固废</p>
					<RadioGroup v-model="form3.solid_waste"  >
						<Radio :label="0" border disabled>否</Radio>
						<Radio :label="1" border disabled>是</Radio>
					</RadioGroup>
				</div>
				<div  class="inner-card" v-if="showSolid" v-show="solid_show" style="padding-bottom: 15px">
					<div class="w-card" v-for="(item,index) in solid_total_info" :key="index" >
						<div style="margin:15px 0">
							<p>
								<span>固废名称：</span> <i-input disabled type="text" v-model="item.name" placeholder="请输入固废名称" style="width:150px"></i-input>
							</p>
							<p style="margin:15px 0">
								<span>第三方委外公司：</span>
								<i-select v-model="item.third_enterprise_id" style="width:150px"  >
									<i-option v-for="item1 in third_Enterprise_Select" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
								</i-select>
							</p>
							<p>
								<span >固废类型：</span>
								<Select disabled  :value="getSolidId(item.type_id)" placeholder="请选择固废类型" trigger="hover" style="width:200px;">
									<Option v-for="(item,index) in solid_waste_type" :key="index" :value="item.value">{{item.label}}</Option>
								</Select>
							</p>
						</div>
						<div class="item-card" v-for="(item3,index3) in item.month_count" >
							<p class="name">月份：{{item3.month}}</p>
							<p>产生量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_product_count"></Input>
							</p>
							<p>使用量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_use_count"></Input>
							</p>
							<p>委外处理量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_out_count"></Input>
							</p>
							<p>剩余存量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_remain_count"></Input>
							</p>
							<p>阈值（吨）：
								<Input type="number" placeholder="0" v-model="item3.limit" readonly></Input>
							</p>
							<p>执行标准：
								<Input type="number" placeholder="0" v-model="item3.standard"></Input>
							</p>
						</div>
<!--						<Table border highlight-row size="small" :columns="columns2" :data="item.month_count" @on-row-click='solid_index(index)'></Table>-->
					</div>

					<div class="item-card">
						<div >
							<span>环境监测类型</span>
							<i-select v-model="form3.em_type_info[2].em_type" style="width:150px;margin-left:30px" >
								<i-option  :value="1">自行监控</i-option>
								<i-option  :value="2">委托监控</i-option>
								<i-option  :value="3">自动监控</i-option>
								<i-option  :value="4">其他</i-option>
							</i-select>
						</div>
						<div >
							<div style="margin:0 0 10px 0;padding:10px;background-color:#fff" >
								<div v-if="form3.em_type_info[2].em_type==1">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=40;attach_title='企业实验室的监测资质文件,监测报告';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">企业实验室的监测资质文件,监测报告</p>
										<Button type="primary" class="button1" @click="attach_type=40;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[2].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[2].em_type==2">
									<p  style="margin-bottom:5px">
										<span>选择第三方公司：</span>
										<i-select v-model="form3.em_type_info[2].em_type_third_enterprise_id" style="width:200px" >
											<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
										</i-select>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=40;attach_title='评测报告扫描件,委托合同、被委托单位的资质文件';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">评测报告扫描件,委托合同、被委托单位的资质文件</p>
										<Button  type="primary" class="button1" @click="attach_type=40;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[2].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[2].em_type==3">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=40;attach_title='自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=40;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[2].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[2].em_type==4">
									<p style="margin-bottom:5px">
										<span>说明：</span> <i-input type="text" v-model="form3.em_type_info[2].em_type_explain" placeholder="请输入说明" ></i-input>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=40;attach_title='相关佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">相关佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=40;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[2].em_type_attach"></Table>
								</div>
							</div>
						</div>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="solid_show=false" alt="">
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  @click="dangerous_show=true" v-if="dangerous_show==false" alt="">
					<p >5、是否产生危险废物</p>
					<RadioGroup v-model="form3.dangerous_waste"  >
						<Radio :label="0" border disabled>否</Radio>
						<Radio :label="1" border disabled>是</Radio>
					</RadioGroup>
				</div>
				<div  class="inner-card" v-if="showDanger" v-show="dangerous_show" style="padding-top: 15px;padding-bottom:15px">
					<div  class="item-card" v-for="(item,index) in dangerous_waste_total" :key="index">
						<div style="margin-bottom:10px">
							<p>废物名称：<i-input disabled type="text" v-model="item.name" placeholder="请输入危险废物名称" style="width:150px"></i-input></p>
							<p>第三方处理公司：
								<i-select v-model="item.third_enterprise_id" style="width:150px" >
									<i-option v-for="item2 in third_Enterprise_Select" v-bind:key="item2.id" :value="item2.id">{{item2.name}}</i-option>
								</i-select>
							</p>
						</div>
						<div style="margin-bottom:10px">
							<span>种类代码：</span>
							<Cascader disabled :data="dangerous_waste_type_data" :value="getDangerousValue(index)" placeholder="请选择种类代码" trigger="hover"></Cascader>
						</div>

						<div class="card-two" v-for="(item3,index3) in item.month_count" >
							<p class="name">月份：{{item3.month}}</p>
							<p>产生量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_product_count"></Input>
							</p>
							<p>使用量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_use_count"></Input>
							</p>
							<p>处理量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_out_count"></Input>
							</p>
							<p>剩余存量（吨）：
								<Input type="number" placeholder="0" v-model="item3.solid_remain_count"></Input>
							</p>
							<p>阈值（吨）：
								<Input type="number" placeholder="0" v-model="item3.limit" readonly></Input>
							</p>
							<p>执行标准：
								<Input type="number" placeholder="0" v-model="item3.standard"></Input>
							</p>
						</div>

<!--						<Table border highlight-row size="small" :columns="columns3" :data="item.month_count" @on-row-click='dangerous_index(index)'></Table>-->
					</div>

					<div class="item-card">
						<div >
							<span>环境监测类型</span>
							<i-select v-model="form3.em_type_info[3].em_type" style="width:150px;margin-left:30px" >
								<i-option  :value="1">自行监控</i-option>
								<i-option  :value="2">委托监控</i-option>
								<i-option  :value="3">自动监控</i-option>
								<i-option  :value="4">其他</i-option>
							</i-select>
						</div>
						<div >
							<div style="margin:0 0 10px 0;padding:10px;background-color:#fff" >
								<div v-if="form3.em_type_info[3].em_type==1">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=41;attach_title='企业实验室的监测资质文件,监测报告';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">企业实验室的监测资质文件,监测报告</p>
										<Button type="primary" class="button1" @click="attach_type=41;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[3].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[3].em_type==2">
									<p  style="margin-bottom:5px">
										<span>选择第三方公司：</span>
										<i-select v-model="form3.em_type_info[3].em_type_third_enterprise_id" style="width:200px" >
											<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
										</i-select>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=41;attach_title='评测报告扫描件,委托合同、被委托单位的资质文件';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">评测报告扫描件,委托合同、被委托单位的资质文件</p>
										<Button  type="primary" class="button1" @click="attach_type=41;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[3].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[3].em_type==3">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=41;attach_title='自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=41;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[3].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[3].em_type==4">
									<p style="margin-bottom:5px">
										<span>说明：</span> <i-input type="text" v-model="form3.em_type_info[3].em_type_explain" placeholder="请输入说明" ></i-input>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=41;attach_title='相关佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">相关佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=41;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[3].em_type_attach"></Table>
								</div>
							</div>
						</div>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="dangerous_show=false" alt="">
					</div>
				</div>

				<div class="card" >
					<img class="icon-down" src="@/assets/img/down2.png"  @click="noise_show=true" v-if="noise_show==false" alt="">
					<p >6、是否有噪音排放</p>
					<RadioGroup v-model="form3.noise">
						<Radio :label="0" border disabled>否</Radio>
						<Radio :label="1" border disabled>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="showNoise" v-show="noise_show" style="padding-bottom: 15px">
					<div style="margin:15px 0;padding-top: 15px">
						<span>厂界长度：</span>
						<InputNumber disabled placeholder="请输入厂界长度" v-model="form3.factory_length" style="width:200px"></InputNumber>m
					</div>
					<div class="item-card" v-for="(item,index) in noise_list" :key="index">
						<div style="margin-bottom:15px">
							<p >监测点：<Input disabled placeholder="请输入监测点" v-model="item.name"  style="width:200px"></Input></p>

						</div>
						<div style="margin-bottom:15px">
							<p >编号：	<Input  disabled placeholder="请输入监测点编号" v-model="item.num"  style="width:200px"></Input></p>

						</div>
						<div style="margin-bottom:15px">
							<p >类型：<i-select :value="getNoiseId(item.type_id)" style="width:150px" :label-in-value="true" disabled>
								<i-option v-for="item1 in noise_type" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
							</i-select></p>
						</div>

						<div class="card-two" v-for="(item3,index3) in item.month_count" >
							<p class="name">月份：{{item3.month}}</p>
							<p>昼间噪声（dB）：
								<Input type="number" placeholder="0" v-model="item3.day_noise"></Input>
							</p>
							<p>昼间生产时间：
								<Input type="number" placeholder="0" v-model="item3.day_time"></Input>
							</p>

							<p>夜间噪声（dB）：
								<Input type="number" placeholder="0" v-model="item3.night_noise"></Input>
							</p>
							<p>夜间生产时间：
								<Input type="number" placeholder="0" v-model="item3.night_time"></Input>
							</p>
							<p>昼间阈值（dB）：{{item3.limit_day}}</p>
							<p>夜间阈值（dB）：{{item3.limit_night}}</p>
							<p>执行标准：{{item3.standard}}</p>
						</div>
<!--						<Table border highlight-row size="small" :columns="columns_noise" :data="item.month_count" @on-row-click='noise_index(index)'></Table>-->
					</div>

					<div class="item-card">
						<div >
							<span>环境监测类型</span>
							<i-select v-model="form3.em_type_info[4].em_type" style="width:150px;margin-left:30px" >
								<i-option  :value="1">自行监控</i-option>
								<i-option  :value="2">委托监控</i-option>
								<i-option  :value="3">自动监控</i-option>
								<i-option  :value="4">其他</i-option>
							</i-select>
						</div>
						<div >
							<div style="margin:0 0 10px 0;padding:10px;background-color:#fff" >
								<div v-if="form3.em_type_info[4].em_type==1">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=42;attach_title='企业实验室的监测资质文件,监测报告';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">企业实验室的监测资质文件,监测报告</p>
										<Button type="primary" class="button1" @click="attach_type=42;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[3].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[4].em_type==2">
									<p  style="margin-bottom:5px">
										<span>选择第三方公司：</span>
										<i-select v-model="form3.em_type_info[4].em_type_third_enterprise_id" style="width:200px" >
											<i-option v-for="item in third_Enterprise_Select" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
										</i-select>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=42;attach_title='评测报告扫描件,委托合同、被委托单位的资质文件';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">评测报告扫描件,委托合同、被委托单位的资质文件</p>
										<Button  type="primary" class="button1" @click="attach_type=42;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[4].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[4].em_type==3">
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=42;attach_title='自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">自动监控设备运行验收文件、自动监控设备运行（维护）委托合同等佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=42;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[4].em_type_attach"></Table>
								</div>
								<div v-if="form3.em_type_info[4].em_type==4">
									<p style="margin-bottom:5px">
										<span>说明：</span> <i-input type="text" v-model="form3.em_type_info[4].em_type_explain" placeholder="请输入说明" ></i-input>
									</p>
									<div style="margin-bottom:5px">
										<Button type="primary" class="button1" @click="attach_type=42;attach_title='相关佐证材料';add_attach=true" style="width:100px">添加附件</Button>
										<p style="color:red">相关佐证材料</p>
										<Button  type="primary" class="button1" @click="attach_type=42;attach_title='企业实验室的监测资质文件,监测报告';add_attach_history=true">选择历史附件</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_attach" :data="form3.em_type_info[4].em_type_attach"></Table>
								</div>
							</div>
						</div>
					</div>
					<div  class="fold"  style="margin-top: 30px">
						<img src="@/assets/img/uptwo.png"  @click="noise_show=false" alt="">
					</div>
				</div>

				<div class="card">
					<p>7、是否有申报环保税</p>
					<RadioGroup v-model="form3.et" >
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>

				<div class="card">
					<p >8、是否有环境违法记录</p>
					<RadioGroup v-model="form3.illegal_record" >
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form3.illegal_record==1">
						<div  style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=37;attach_title='环保行政处罚记录表、行政处罚记录完成整改（销案）的证明材料';add_attach=true" style="width:100px">添加附件</Button>
							<p style="color:red">环保行政处罚记录表、行政处罚记录完成整改（销案）的证明材料</p>
						</div>
						<Table border highlight-row size="small" :columns="columns_attach" :data="this.form3.illegal_record_attach"></Table>
					</div>
				</div>

			</form>
		</div>

		<Modal v-model="first_show" title="申报主体"   @on-cancel="goback">
			<div style="margin:10px;">
				<p style="margin-bottom:20px">
					<span>申报企业：</span>
					<i-select v-model="form1.enterprise_id"  style="width:200px">
						<i-option v-for="item in enterpriseData"  :key="item.id" :value="item.id">{{item.name}}</i-option>
					</i-select>
				</p>
				<p style="margin-bottom:20px">
					<span>年份：</span>
					<DatePicker   :open="open"
					type="year" placeholder="请选择年份" style="width:200px;"
								  @on-clear="handleClear" @on-change="handleChange" :value="form1.year" value-format="yyyy">
						<a href="javascript:void(0)" @click="handleClick">
							<Input type="text" placeholder="请选择年份" readonly v-model="form1.year" style="width:200px"></Input>
						</a>
					</DatePicker>
				</p>
				<p style="margin-bottom:10px">
					<span>季度：</span>
					<i-select v-model="form1.quarter"  style="width:200px;">
						<i-option :value="1">第一季度</i-option>
						<i-option :value="2">第二季度</i-option>
						<i-option :value="3">第三季度</i-option>
						<i-option :value="4">第四季度</i-option>
					</i-select>
				</p>
			</div>
			<div slot="footer" style="text-align:center">
				<Button type="primary" class="button2" @click="nextaction()"  style="width:150px">确定</Button>
			</div>
		</Modal>

		<Modal v-model="add_noise" title="噪音监测点信息" @on-ok="addData2()">
			<div style="margin-bottom:20px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">噪音监测点：</p>
				<Input type="text" placeholder="请输入噪音监测点名称" v-model="noise_name" style="width:200px"></Input>
			</div>
			<div>
				<p style="width:80px;float:left;line-height:30px;text-align:right">测试值：</p>
				<InputNumber placeholder="请输入测试值" v-model="noise_value" style="width:200px"></InputNumber>
			</div>
		</Modal>

		<Modal v-model="add_index" :title="index_title" @on-ok="addData()">
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">废物名称：</p>
				<Select v-show="index_type==31" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change" >
					<Option v-for="(item,index) in wa_tr_fa_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
				<Select  v-show="index_type==33" v-model="id"   :label-in-value="true" style="width:200px" @on-change="all_index_change" >
					<Option v-for="(item,index) in ga_tr_fa_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
				<Select  v-show="index_type==35" v-model="id"   :label-in-value="true" style="width:200px" @on-change="all_index_change" >
					<Option v-for="(item,index) in dangerous_waste_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
				<Select  v-show="index_type.toString().indexOf('water')!= -1" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change"  >
					<Option v-for="(item,index) in wastewater_total_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
				<Select  v-show="index_type.toString().indexOf('gas')!= -1" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change"  >
					<Option v-for="(item,index) in wastegas_total_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
			</div>
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">测试值：</p>
				<InputNumber placeholder="请输入测试值" v-model="index_value" style="width:200px"></InputNumber>
			</div>
			<div>
				<p style="width:80px;float:left;line-height:30px;text-align:right">备注：</p>
				<Input type="text" placeholder="" v-model="remarks" style="width:250px"></Input>
			</div>
		</Modal>

		<Modal v-model="add_attach_history" :title="attach_title" @on-ok="add_history_attach">
			<Select v-model="historyIndex" @on-change="changeAttachDetail">
				<Option v-for="(item,index) in history_list" :value="item.value" :key="index">{{item.label}}</Option>
			</Select>
		</Modal>

		<Modal v-model="add_attach" :title="attach_title" @on-ok="adddata1">
			<Input type="text" placeholder="请输入文件名" v-model="attach_name" style="width:100%"></Input>
			<Upload
					:headers="headers"
					:show-upload-list="false"
					:on-success="uploadSuccess"
					:on-error="uploadError"
					multiple type="drag"
					:action="baseURL + '/home/file/report_upload'"
					style="width:114px;margin-top:20px"
			>
				<i-button  icon="ios-cloud-upload-outline">上传文件</i-button>
			</Upload>
			<div class="demo-upload-list" v-if="attach_url">
				<span>{{attach_url}}</span>
			</div>
		</Modal>
		<div class="btns" v-if="!isLook">
			<div class="btn" @click="handleSave3">保存</div>
			<div class="btn" @click="handleSave5">提交审核</div>
		</div>
	</div>
</template>

<script>
	import {getmodel} from '@/lib/API/model';
	import {
		select,
		enterpriseSelect,
		third_enterpriseSelect,
		save1,
		getsave1,
		sub_verity,
		getsave3,
		save3,
		dangerousCode,
		limitValue
	} from '@/lib/API/report';
	import Config from '@/Config'
	import headBar from '@/components/head-bar/head-bar'
	import {Toast} from "vant";
	export default {
		components:{
			headBar,
		},
		data() {
			let self = this;
			return {
				produtimeList:[],
				open: false,
				value3: '',
				isLook:false,
				//控制展开，收缩按钮
				water_show:true,
				gas_show:true,
				solid_show:true,
				dangerous_show:true,
				noise_show:true,

				baseURL: Config.baseURL,
				//附件上传历史arr
				attach_history:[],
				historyIndex:0,

				first_show:true,
				em_show:true,
				limit_value:[],
				//物种类型和测试指标类型
				wastewater_type_data:[],
				wa_tr_fa_index_data:[],
				wastewater_total_index_data:[],
				ga_tr_fa_index_data:[],
				wastegas_total_index_data:[],
				dangerous_waste_type_data:[],
				dangerous_waste_index_data:[],
				third_Enterprise_Select:[],
				dangerous_waste_code:[],
				solid_waste_type:[],
				noise_type:[],



				//模板数据
				model_data:{},

				//第一步
				report_id:'',
				enterpriseData:[],
				form1:{
					enterprise_id:'',
					year:'',
					quarter:''
				},
				//第二步
				form3:{
					output_value:'',
					pay_taxes:'',
					use_water:'',
					use_electricity:'',
					waste_water:0,
					waste_gas:0,
					solid_waste:0,
					dangerous_waste:0,
					noise:0,
					em_type:'',
					et:0,
					illegal_record:0,
					illegal_record_attach:[],
					factory_length:0,
					em_type_info:[],
				},
				//季度基本信息
				base_show:true,
				year_month:'',
				quarter_info_base:[],

				//废水
				water_waste_e:'',
				water_waste_e1:'',
				water_index:'',
				water_attach:'',
				water_waste_total:[],

				//废气
				gas_waste_e:'',
				ga_tr_fa_index_array:[],
				ga_tr_fa_attach:[],
				ou_ga_fa_third_enterprise_id:'',
				ou_ga_fa_attach:[],
				ga_tr_fa:0,
				ou_ga_fa:0,
				wastegas_total:[],

				//固废
				solid_waste_index:'',
				solid_total_info:[],

				//危险物
				dangerous_waste_index:'',
				dangerous_waste_total:[],

				//噪声
				noise_e:'',

				noise_name:'',
				noise_value:0,
				add_noise:false,
				noise_list:[],

				//环境监测类型
				em_type_attach:[],
				em_type_third_enterprise_id:'',
				em_type_explain:'',


				//model指标绑定
				id:'',
				name:'',
				index_value:0,
				remarks:'',
				total:'',
				density:'',
				speed:'',

				//model指标绑定
				attach_name:'',
				attach_url:'',
				columns1: [{
					title:'月份',
					key:'month',
					align:'center',
					width:70
				},
					{
						title: '产值（元）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.output_value,
									},
									on:{
										'on-change':(event)=>{
											params.row.output_value = event;
											this.quarter_info_base[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '纳税（元）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.pay_taxes,
									},
									on:{
										'on-change':(event)=>{
											params.row.pay_taxes = event;
											this.quarter_info_base[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '用水（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.use_water,
									},
									on:{
										'on-change':(event)=>{
											params.row.use_water = event;
											this.quarter_info_base[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '用电（度）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.use_electricity,
									},
									on:{
										'on-change':(event)=>{
											params.row.use_electricity = event;
											this.quarter_info_base[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '生产时间（h）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.time,
									},
									on:{
										'on-change':(event)=>{
											params.row.time = event;
											this.quarter_info_base[params.index]=params.row;
											for (let i in this.water_waste_total) {
												this.water_waste_total[i].wastewater_total[0].outfall_count[params.index].hours=params.row.time;
												let total_count_water=params.row.time*this.water_waste_total[i].wastewater_total[0].count;
												this.water_waste_total[i].wastewater_total[0].outfall_count[params.index].total=total_count_water.toFixed(2);
											}
											for (let i in this.wastegas_total) {
												let total_count_gas=params.row.time*this.wastegas_total[i].count;
												this.wastegas_total[i].outfall_count[params.index].total = total_count_gas.toFixed(2)
												this.wastegas_total[i].outfall_count[params.index].hours=params.row.time;
											}
										}
									}
								})
							])
						}
					},
				],
				columns2: [{
					title:'月份',
					key:'month',
					align:'center',
					width:70
				},
					{
						title: '产生量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.solid_product_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.solid_product_count = event;
											this.solid_total_info[this.solid_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '使用量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.solid_use_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.solid_use_count = event;
											this.solid_total_info[this.solid_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '委外处理量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.solid_out_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.solid_out_count = event;
											this.solid_total_info[this.solid_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '剩余存量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.solid_remain_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.solid_remain_count = event;
											this.solid_total_info[this.solid_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title:'阈值（吨）',
						key:'limit',
						align:'center',
						width:80
					},
					{
						title:'执行标准',
						key:'standard',
						align:'center',
					}
				],
				columns3: [{
					title:'月份',
					key:'month',
					align:'center',
					width:70
				},
					{
						title: '产生量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.product_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.product_count = event;
											this.dangerous_waste_total[this.dangerous_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '使用量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.use_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.use_count = event;
											this.dangerous_waste_total[this.dangerous_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '处理量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.out_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.out_count = event;
											this.dangerous_waste_total[this.dangerous_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '剩余存量（吨）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.remain_count,
									},
									on:{
										'on-change':(event)=>{
											params.row.remain_count = event;
											this.dangerous_waste_total[this.dangerous_waste_index].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title:'阈值（吨）',
						key:'limit',
						align:'center',
						width:80
					},
					{
						title:'执行标准',
						key:'standard',
						align:'center',
					}
				],
				columns4: [{
					title:'月份',
					key:'month',
					align:'center',
					width:70
				},
					{
						title: '生产时间（h）',
						align: 'center',
						render:(h,params)=>{
							console.log(params)
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.hours,
									},
									on:{
										'on-change':(event)=>{
											params.row.hours = event;
											let total_count=params.row.hours*this.water_waste_total[this.water_waste_e].wastewater_total[this.water_waste_e1].count;
											params.row.total=total_count.toFixed(2);
											this.water_waste_total[this.water_waste_e].wastewater_total[this.water_waste_e1].outfall_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '总量(m³)',
						key:'total',
						align: 'center'
					},
				],
				columns5: [{
					title:'月份',
					key:'month',
					align:'center',
					width:70
				},
					{
						title: '生产时间（h）',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.hours,
									},
									on:{
										'on-change':(event)=>{
											params.row.hours = event;
											let total_count=params.row.hours*this.wastegas_total[this.gas_waste_e].count;
											params.row.total=total_count.toFixed(2);
											this.wastegas_total[this.gas_waste_e].outfall_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '总量(m³)',
						key:'total',
						align: 'center'
					},
				],
				columns_index: [
					{
					title: '污染物',
					key:'name',
					align: 'center',
					width: '100',},
					{
						title: '1月',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value1,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value1 = event;
											this.water_waste_total[this.water_waste_e].wastewater_total[this.water_waste_e1].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '2月',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value2,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value2= event;
											this.water_waste_total[this.water_waste_e].wastewater_total[this.water_waste_e1].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '3月',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value3,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value3 = event;
											this.water_waste_total[this.water_waste_e].wastewater_total[this.water_waste_e1].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					// {
					// 	title: '阈值',
					// 	key:'limit_value',
					// 	align: 'center'
					// },
					// {
					// 	title:'执行标准',
					// 	key:'standard',
					// 	align:'center',
					// },
					// {
					// 	title: '备注',
					// 	key:'remarks',
					// 	align: 'center'
					// }
				],
				columns_index1: [{
					title: '污染物',
					key:'name',
					align: 'center',
				},
					{
						title: '1月',
						align: 'center',
						render:(h,params)=>{
							// console.log('nd',params.row)
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value1,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value1 = event;
											this.wastegas_total[this.gas_waste_e].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '2月',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value2,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value2= event;
											this.wastegas_total[this.gas_waste_e].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '3月',
						align: 'center',
						render:(h,params)=>{
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.index_value3,
										min:1,
										step:0.1
									},
									on:{
										'on-change':(event)=>{
											params.row.index_value3 = event;
											this.wastegas_total[this.gas_waste_e].index_array[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					// {
					// 	title:'阈值',
					// 	key:'limit_value',
					// 	align:'center',
					// 	width:80
					// },
					// {
					// 	title:'执行标准',
					// 	key:'standard',
					// 	align:'center',
					// },
					// {
					// 	title: '备注',
					// 	key:'remarks',
					// 	align: 'center'
					// }
				],
				columns_attach: [{
					title: '文件名',
					key:'name',
					align: 'center',
				},
					{
						title: '操作',
						align: 'center',
						width: 120,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [h('Icon', {
											props: {
												type: 'ios-eye',
											},
											style: {
												fontSize: '20px',
												width: 'auto',
												marginRight:'10px'
											},
											on: {
												click: () => {
													//console.log(params.row.url);
													window.open(params.row.url,'_blank');
												}
											}
										}, ),
											h('Icon', {
												props: {
													type: 'md-close',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														if(params.row.attach_type==31){
															this.water_waste_total[params.row.water_attach].wa_tr_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==32){
															this.water_waste_total[params.row.water_attach].ou_wa_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==33){
															this.ga_tr_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==34){
															this.ou_ga_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==35){
															this.dangerous_waste_attach.splice(params.index,1);
														}else if(params.row.attach_type==36){
															this.em_type_attach.splice(params.index,1);
														}else if(params.row.attach_type==37){
															this.form3.illegal_record_attach.splice(params.index,1);
														}else if (params.row.attach_type==38) {
															this.form3.em_type_info[0].em_type_attach.splice(params.index,1)
														} else if (params.row.attach_type==39) {
															this.form3.em_type_info[1].em_type_attach.splice(params.index,1)
														} else if (params.row.attach_type==40) {
															this.form3.em_type_info[2].em_type_attach.splice(params.index,1)
														} else if (params.row.attach_type==41) {
															this.form3.em_type_info[3].em_type_attach.splice(params.index,1)
														} else if (params.row.attach_type==42) {
															this.form3.em_type_info[4].em_type_attach.splice(params.index,1)
														} else if(params.row.attach_type.toString().indexOf('dangerous')!=-1){
															let index=parseInt(params.row.attach_type);
															this.dangerous_waste_total[index].attach.splice(params.index,1);
														}
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_noise: [{
					title: '月份',
					key:'month',
					align: 'center',
				},
					{
						title: '昼间噪声（dB）',
						align: 'center',
						render:(h,params)=>{
							// console.log('params',params)
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.day_noise,
									},
									on:{
										'on-change':(event)=>{
											params.row.day_noise = event;
											this.noise_list[this.noise_e].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '夜间噪声（dB）',
						align: 'center',
						render:(h,params)=>{
							// console.log('params',params)
							return h('div',[
								h('InputNumber',{
									props:{
										value:params.row.night_noise,
									},
									on:{
										'on-change':(event)=>{
											params.row.night_noise = event;
											this.noise_list[this.noise_e].month_count[params.index]=params.row;
										}
									}
								})
							])
						}
					},
					{
						title: '昼间阈值（dB）',
						key:'limit_day',
						align: 'center',
					},
					{
						title: '夜间阈值（dB）',
						key:'limit_night',
						align: 'center'
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center'
					}
				],

				//弹出指标选择框
				index_type:'',
				index_title:'',
				add_index:false,

				//弹出附件上传
				attach_type:'',
				attach_title:'',
				add_attach:false,

				//历史附件上传
				add_attach_history:false,

				inputError: false,
				headers: {},
				type:'',
				uploadmodel:false,
				//输入验证
				rules: {
					enterprise_name: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}]
				}
			}
		},

		computed: {
			showWater(){
				return this.model_data.waste_water==1
			},
			showGas(){
				return this.model_data.waste_gas==1
			},
			showSolid(){
				return this.model_data.solid_waste==1
			},
			showDanger(){
				return this.model_data.dangerous_waste==1
			},
			showNoise(){
				return this.model_data.noise==1
			},
			//上传
			uploadList() {
				return this.$refs.upload ? this.$refs.upload.fileList : [];
			},

			history_list(){
				let res = []
				for (let i in this.attach_history) {
					res.push({
						value:i,
						label:this.attach_history[i].name
					})
				}
				return res
			}
		},
		//页面初始化
		mounted() {
			this.headers.Authorization = sessionStorage.token;
			this.getselectdata();
			//不属于企业账户获取企业列表
			this.handleGetenterpriseList();
			if (this.$route.query.id&&this.$route.query.from!=='look') {
				this.handleGetenterpriseDetail();
			}else {
				if(this.$route.query.from==='look'){
					this.isLook=true
					this.first_show=false
					this.handleGetenterpriseDetail2()
				}else {
					this.isLook=false
					this.first_show=true
				}
			}
		},

		activated() {
		},

		methods: {
			handleClick () {
				this.open = !this.open;
			},
			handleChange (date) {
				this.form1.year = date;
				this.open = false;
			},
			handleClear () {
				this.open = false;
			},
			//获取申报基础信息
			handleGetenterpriseDetail2(){
				let data={};
				if (this.$route.query.id) {
					data.id=this.$route.query.id
					getsave1(data).then(res=>{
						console.log(res);
						this.report_id=res.data.id;
						this.form1=res.data;
						setTimeout(()=>{
							this.getModel();
						},100)
						this.third_enterpriseSelect();
						this.getsave3info();
					})
				}
			},

			//获取危废类型
			getDangerousValue(index) {
				if(this.model_data.dangerous_waste_total) {
					// console.log(this.model_data.dangerous_waste_total)
					let arr = this.model_data.dangerous_waste_total[index].type_id.split(',')
					arr[0] = parseInt(arr[0])
					arr[1] = parseInt(arr[1])
					return arr
				}
			},

			//获取固废类型
			getSolidId(id) {
				return id-601
			},

			//获取噪音类型
			getNoiseId(id) {
				return id-120
			},

			getselectdata(){
				select().then(res => {
					if (res.errno==0) {
						this.wastewater_type_data=res.data.wastewater_type;
						this.wa_tr_fa_index_data=res.data.wa_tr_fa_index;
						this.wastewater_total_index_data=res.data.wastewater_total_index;
						this.ga_tr_fa_index_data=res.data.ga_tr_fa_index;
						this.wastegas_total_index_data=res.data.wastegas_total_index;
						this.dangerous_waste_type_data=res.data.dangerous_waste_type;
						this.solid_waste_type=res.data.solid_waste_type;
						this.noise_type=res.data.noise_type
					} else {
						this.$Notice.error({
							title: '获取指标类型选择列表出错',
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},
			goback(){
				this.$router.back()
			},
			async nextaction(){
				this.first_show= false;
				//更改浓度表头月份
				if(this.form1.quarter==1){
					this.columns_index[1].title="1月";
					this.columns_index1[1].title="1月";
					this.columns_index[2].title="2月";
					this.columns_index1[2].title="2月";
					this.columns_index[3].title="3月";
					this.columns_index1[3].title="3月";
					this.quarter_info_base=[
						{'month':'1月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'2月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'3月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0}
					];
				}else if(this.form1.quarter==2){
					this.columns_index[1].title="4月";
					this.columns_index1[1].title="4月";
					this.columns_index[2].title="5月";
					this.columns_index1[2].title="5月";
					this.columns_index[3].title="6月";
					this.columns_index1[3].title="6月";
					this.quarter_info_base=[
						{'month':'4月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'5月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'6月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0}
					];
				}else if(this.form1.quarter==3){
					this.columns_index[1].title="7月";
					this.columns_index1[1].title="7月";
					this.columns_index[2].title="8月";
					this.columns_index1[2].title="8月";
					this.columns_index[3].title="9月";
					this.columns_index1[3].title="9月";
					this.quarter_info_base=[
						{'month':'7月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'8月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'9月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0}
					];
				}else if(this.form1.quarter==4){
					this.columns_index[1].title="10月";
					this.columns_index1[1].title="10月";
					this.columns_index[2].title="11月";
					this.columns_index1[2].title="11月";
					this.columns_index[3].title="12月";
					this.columns_index1[3].title="12月";
					this.quarter_info_base=[
						{'month':'10月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'11月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0},
						{'month':'12月','output_value':0,'pay_taxes':0,'use_water':0,'use_electricity':0,'workTime':0}
					];
				};
				//构建基础表格数据
				//获取限制指标
				await this.handleLimitvalue()
				await this.handleSave1();
				await this.third_enterpriseSelect();
				await this.getsave3info();
			},

			//排污许可证阈值
			handleLimitvalue(){
				let data={
					enterprise_id:this.form1.enterprise_id
				}
				limitValue(data).then(res => {
					if (res.errno==0) {
						this.limit_value=JSON.parse(res.data.index_array);
					} else {
						this.$Notice.error({
							title: '排污许可证阈值列表',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
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
						// console.log(this.enterpriseData);
					}
				})
			},
			//第三方企业选择列表
			third_enterpriseSelect(){
				let data={
					enterprise_id:this.form1.enterprise_id
				}
				third_enterpriseSelect(data).then(res => {
					if (res.errno) {
						this.$Notice.error({
							title: '获取企业选择列表出错',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					} else {
						this.third_Enterprise_Select=res.data
					}
				})
			},
			//保存第一步信息
			handleSave1(){
				if(!this.form1.enterprise_id||!this.form1.year||!this.form1.quarter){
					this.first_show=true;
					this.$Notice.error({
						title: '没有选择完整申报主体信息',
						duration: this.$parent.getInfoFailTime
					});
					return
				};
				let data={
					enterprise_id:this.form1.enterprise_id,
					year:this.form1.year,
					quarter:this.form1.quarter
				};
				save1(data).then(res=>{
					if(res.errno==0){
						this.report_id=res.data.id;
						this.getModel();
						// this.$Notice.success({
						// 	title: '信息保存成功',
						// 	duration: this.$parent.successTime
						// });
					}else{
						this.$Notice.error({
							title: '保存失败',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
						this.first_show=true;
					}
				})
			},


			//获取第一步信息
			handleGetenterpriseDetail(){
				let data={};
				if (this.$route.query.id) {
					data.id=this.$route.query.id
					getsave1(data).then(res=>{
						this.report_id=res.data.id
						this.form1=res.data
					})
				}
			},

			//获取第二步信息
			getsave3info(){
				let data={
					id:this.report_id
				};
				getsave3(data).then(res=>{
					if(res.errno==0){
						if(res.data!='暂无数据'){
							this.form3=res.data;
							//判断em_type_info字段是否有值，无值则进行数据初始化
							if (res.data.em_type_info.length>0) {
								for (let i in res.data.em_type_info) {
									this.form3.em_type_info[i] = res.data.em_type_info[i]
									this.form3.em_type_info[i].em_type_attach = JSON.parse(res.data.em_type_info[i].em_type_attach)
								}
							} else {
								this.form3.em_type_info = this._initEmTypeInfo()
							}
							if(res.data.quarter_info_base.length>0){
								this.quarter_info_base=res.data.quarter_info_base
								this.quarter_info_base.forEach((i)=>{
									this.produtimeList.push(i.time)
								})
							}
							if(res.data.illegal_record_attach){
								this.form3.illegal_record_attach=JSON.parse(res.data.illegal_record_attach);
							};
							if(this.form3.waste_water==1){
								this.water_waste_total=res.data.waste_water_total
								// console.log(this.water_waste_total);
							};
							if(this.form3.waste_gas==1){
								this.ga_tr_fa=res.data.waste_gas_info.ga_tr_fa;
								this.ou_ga_fa=res.data.waste_gas_info.ou_ga_fa;
								if(this.ga_tr_fa==1){
									this.ga_tr_fa_index_array=JSON.parse(res.data.waste_gas_info.ga_tr_fa_info.index_array);
									this.ga_tr_fa_attach=JSON.parse(res.data.waste_gas_info.ga_tr_fa_info.attach)
								};
								if(this.ou_ga_fa==1){
									this.ou_ga_fa_third_enterprise_id=res.data.waste_gas_info.ou_ga_fa_info.third_enterprise_id;
									this.ou_ga_fa_attach=JSON.parse(res.data.waste_gas_info.ou_ga_fa_info.attach)
								}else{
									this.ou_ga_fa_attach=JSON.parse(res.data.waste_gas_info.ou_ga_fa_info.attach)
								};
								this.wastegas_total=res.data.waste_gas_info.wastegas_total_info
							};
							if(this.form3.solid_waste==1){
								this.solid_total_info=res.data.solid_total_info;
							};
							if(this.form3.dangerous_waste==1){
								this.dangerous_waste_total=res.data.dangerous_waste_total;
							};
							if(this.form3.noise==1){
								this.noise_list=res.data.noise_list
							}
							if(this.form3.em_type==1){
								this.em_type_attach=JSON.parse(res.data.em_type_info.attach);
							}else if(this.form3.em_type==2){
								this.em_type_third_enterprise_id=res.data.em_type_info.third_enterprise_id;
								this.em_type_attach=JSON.parse(res.data.em_type_info.attach);
							}else if(this.form3.em_type==3){
								this.em_type_attach=JSON.parse(res.data.em_type_info.attach);
							}else if(this.form3.em_type==4){
								this.em_type_explain=res.data.em_type_info.explain;
								this.em_type_attach=JSON.parse(res.data.em_type_info.attach);
							}
						}
					}else{
						this.$Notice.error({
							title: '获取信息出错',
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},

			//保存第二步信息
			handleSave3(){
				if(!this.report_id){
					this.$toast('没有选择并确认申报主体信息')
					this.first_show=true;
					return;
				}
				let data={
					report_id:this.report_id,
					waste_water:this.form3.waste_water,
					waste_gas:this.form3.waste_gas,
					solid_waste:this.form3.solid_waste,
					dangerous_waste:this.form3.dangerous_waste,
					noise:this.form3.noise,
					em_type:this.form3.em_type,
					et:this.form3.et,
					illegal_record:this.form3.illegal_record,
					illegal_record_attach:JSON.stringify(this.form3.illegal_record_attach),
					factory_length:this.form3.factory_length,
					//基础信息
					quarter_info_base:JSON.stringify(this.quarter_info_base),
					//废水
					water_waste_total:JSON.stringify(this.water_waste_total),
					//废气
					waste_gas_ga_tr_fa:this.ga_tr_fa,
					waste_gas_ou_ga_fa:this.ou_ga_fa,
					waste_gas_ga_tr_fa_index_array:JSON.stringify(this.ga_tr_fa_index_array),
					waste_gas_ga_tr_fa_attach:JSON.stringify(this.ga_tr_fa_attach),
					waste_gas_ou_ga_fa_attach:JSON.stringify(this.ou_ga_fa_attach),
					waste_gas_ou_ga_fa_third_enterprise_id:this.ou_ga_fa_third_enterprise_id,
					waste_gas_wastegas_total_info:JSON.stringify(this.wastegas_total),
					//产生固废物
					solid_total_info:JSON.stringify(this.solid_total_info),
					//产生危险物
					dangerous_waste_total:JSON.stringify(this.dangerous_waste_total),
					//环境监测
					em_type_info:JSON.stringify(this.form3.em_type_info),
					//产生噪声
					noise_list:JSON.stringify(this.noise_list)
				};
				save3(data).then(res=>{
					if(res.errno==0){
						this.$toast('保存成功')
						this.$router.back()
					}else{
						this.$Notice.error({
							title: '保存失败',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},

			//第三步提交审核
			handleSave5(){
				if(!this.report_id){
					this.$Notice.error({
						title: '没有填写并确认申报主体信息',
						duration: this.$parent.getInfoFailTime
					});
					this.first_show=true;
					return;
				};
				this.handleSave3();
				let data={
					id:this.report_id
				};
				sub_verity(data).then(res=>{
					if(res.errno==0){
						this.$toast('提交成功')
						this.$router.back()
					}else{
						this.$Notice.error({
							title: '提交失败',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},
			//第二步
			//指标选择
			all_index_change(e){
				if(e){
					this.name=e.label
				}
			},
			//获取危险物种类代码
			get_dangerous_code(){
				let data={
					id:this.dangerous_waste_type
				};
				dangerousCode(data).then(res=>{
					if(res.errno==0){
						this.dangerous_waste_code=res.data;
					}else{
						this.$Notice.error({
							title: '获取危险物种类代码失败',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					}
				})

			},

			//通用
			//插入排水口或排气口或危险物
			// add_total(e,index){
			//   if(e=='water_waste'){
			//     let data={
			//       type_id:'',
			//       wa_tr_fa:0,
			//       wa_tr_fa_index_array:[],
			//       wa_tr_fa_attach:[],
			//       ou_wa_fa:0,
			//       ou_wa_fa_attach:[],
			//       third_enterprise_id:'',
			//       wastewater_total:[]
			//     };
			//     this.water_waste_total.push(data);
			//   }else if(e=='water'){
			//     let data={
			//       outfall_name:'',
			//       count:0,
			//       index_array:[],
			//     };
			//     //构建表格数据
			//     if(this.form1.quarter==1){
			//         data.outfall_count=[
			//           {'month':'1月','hours':0,'total':0},
			//           {'month':'2月','hours':0,'total':0},
			//           {'month':'3月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==2){
			//         data.outfall_count=[
			//           {'month':'4月','hours':0,'total':0},
			//           {'month':'5月','hours':0,'total':0},
			//           {'month':'6月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==3){
			//         data.outfall_count=[
			//           {'month':'7月','hours':0,'total':0},
			//           {'month':'8月','hours':0,'total':0},
			//           {'month':'9月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==4){
			//         data.outfall_count=[
			//           {'month':'10月','hours':0,'total':0},
			//           {'month':'11月','hours':0,'total':0},
			//           {'month':'12月','hours':0,'total':0}
			//         ];
			//     };
			//     this.water_waste_total[index].wastewater_total.push(data);
			//   }else if(e=='gas'){
			//     let data={
			//       vent_name:'',
			//       count:0,
			//       index_array:[],
			//     };
			//     //构建表格数据
			//     if(this.form1.quarter==1){
			//         data.outfall_count=[
			//           {'month':'1月','hours':0,'total':0},
			//           {'month':'2月','hours':0,'total':0},
			//           {'month':'3月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==2){
			//         data.outfall_count=[
			//           {'month':'4月','hours':0,'total':0},
			//           {'month':'5月','hours':0,'total':0},
			//           {'month':'6月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==3){
			//         data.outfall_count=[
			//           {'month':'7月','hours':0,'total':0},
			//           {'month':'8月','hours':0,'total':0},
			//           {'month':'9月','hours':0,'total':0}
			//         ];
			//     }else if(this.form1.quarter==4){
			//         data.outfall_count=[
			//           {'month':'10月','hours':0,'total':0},
			//           {'month':'11月','hours':0,'total':0},
			//           {'month':'12月','hours':0,'total':0}
			//         ];
			//     };
			//     this.wastegas_total.push(data);
			//   }else if(e=='dangerous'){
			//     let data={
			//       name:'',
			//       type_id:[],
			//       third_enterprise_id:''
			//     };
			//     //构建表格数据
			//     if(this.form1.quarter==1){
			//         data.month_count=[
			//           {'month':'1月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'2月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'3月','product_total':0,'out_deal_count':0,'remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==2){
			//         data.month_count=[
			//           {'month':'4月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'5月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'6月','product_total':0,'out_deal_count':0,'remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==3){
			//         data.month_count=[
			//           {'month':'7月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'8月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'9月','product_total':0,'out_deal_count':0,'remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==4){
			//         data.month_count=[
			//           {'month':'10月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'11月','product_total':0,'out_deal_count':0,'remain_count':0},
			//           {'month':'12月','product_total':0,'out_deal_count':0,'remain_count':0}
			//         ];
			//     };
			//     this.dangerous_waste_total.push(data);
			//   }else if(e=='year_month'){
			//     if(!this.year_month){
			//       this.$Notice.error({
			//         title: '请选择年月',
			//         duration: this.$parent.getInfoFailTime
			//       });
			//       return;
			//     };
			//     let data={
			//       year_month:this.year_month,
			//       output_value:'',
			//       pay_taxes:'',
			//       use_water:'',
			//       use_electricity:'',
			//     };
			//     this.quarter_info_base.push(data);
			//   }else if(e=='solid_total_info'){
			//     let data={
			//       type_id:[],
			//       third_enterprise_id:''
			//     };
			//     //构建表格数据
			//     if(this.form1.quarter==1){
			//         data.month_count=[
			//           {'month':'1月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'2月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'3月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==2){
			//         data.month_count=[
			//           {'month':'4月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'5月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'6月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==3){
			//         data.month_count=[
			//           {'month':'7月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'8月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'9月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0}
			//         ];
			//     }else if(this.form1.quarter==4){
			//         data.month_count=[
			//           {'month':'10月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'11月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0},
			//           {'month':'12月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0}
			//         ];
			//     };
			//     this.solid_total_info.push(data);
			//   }
			// },
			delete_total(e,index,index1){
				if(e=='water_waste'){
					this.water_waste_total.splice(index,1);
				}else if(e=='water'){
					this.water_waste_total[index].wastewater_total.splice(index1,1);
				}else if(e=='gas'){
					this.wastegas_total.splice(index,1);
				}else if(e=='dangerous'){
					this.dangerous_waste_total.splice(index,1);
				}else if(e=='year_month'){
					this.quarter_info_base.splice(index,1);
				}else if(e=='solid_total_info'){
					this.solid_total_info.splice(index,1);
				}
			},
			//指标插入数据
			addData(){
				if(this.index_type==31){
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						remarks:this.remarks,
						water_index:this.water_index
					};
					this.water_waste_total[this.water_index].wa_tr_fa_index_array.push(index_array)
				}else if(this.index_type==33){
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						remarks:this.remarks
					};
					this.ga_tr_fa_index_array.push(index_array)
				}else if(this.index_type==35){
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						remarks:this.remarks
					};
					this.dangerous_waste_index_array.push(index_array)
				}else if(this.index_type.toString().indexOf('water')!=-1){
					let index=parseInt(this.index_type);
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						limit_value:'无',
						remarks:this.remarks,
						water_index:this.water_index
					};
					for(var j in this.limit_value){
						if(this.limit_value[j].name==this.name){
							index_array.limit_value=this.limit_value[j].density
						}
					}
					this.water_waste_total[this.water_index].wastewater_total[index].index_array.push(index_array)
				}else if(this.index_type.toString().indexOf('gas')!=-1){
					let index=parseInt(this.index_type);
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						limit_value:'无',
						remarks:this.remarks
					};
					for(var j in this.limit_value){
						if(this.limit_value[j].name==this.name){
							index_array.limit_value=this.limit_value[j].density
						}
					}
					this.wastegas_total[index].index_array.push(index_array)
				};
				this.id='';
				this.name='';
				this.index_value='';
				this.total='';
				this.density='';
				this.speed='';
				this.remarks='';
				this.water_index='';
			},
			//上传文件插入数据
			adddata1(){
				if(!this.attach_name||!this.attach_url){
					this.$Notice.error({
						title: '文件不能为空',
						duration: this.$parent.getInfoFailTime
					});
					return;
				};
				let data;
				if(this.attach_type==31||this.attach_type==32){
					data={
						"name":this.attach_name,
						"url":this.attach_url,
						"attach_type":this.attach_type,
						"water_attach":this.water_attach
					};
				}else{
					data={
						"name":this.attach_name,
						"url":this.attach_url,
						"attach_type":this.attach_type,
					};
				};
				if(this.attach_type==31){
					if(!this.water_waste_total[this.water_attach].wa_tr_fa_attach){
						this.water_waste_total[this.water_attach].wa_tr_fa_attach=[];
					};
					this.water_waste_total[this.water_attach].wa_tr_fa_attach.push(data);
				}else if(this.attach_type==32){
					if(!this.water_waste_total[this.water_attach].ou_wa_fa_attach){
						this.water_waste_total[this.water_attach].ou_wa_fa_attach=[];
					};
					this.water_waste_total[this.water_attach].ou_wa_fa_attach.push(data);
				}else if(this.attach_type==33){
					this.ga_tr_fa_attach.push(data);
				}else if(this.attach_type==34){
					this.ou_ga_fa_attach.push(data);
				}else if(this.attach_type==35){
					this.dangerous_waste_attach.push(data);
				}else if(this.attach_type==36){
					this.em_type_attach.push(data);
				}else if(this.attach_type==37){
					this.form3.illegal_record_attach.push(data);
				}else if(this.attach_type.toString().indexOf('dangerous')!=-1){
					let index=parseInt(this.attach_type);
					this.dangerous_waste_total[index].attach.push(data)
				}else if (this.attach_type == 38) {
					this.form3.em_type_info[0].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 39) {
					this.form3.em_type_info[1].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 40) {
					this.form3.em_type_info[2].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 41) {
					this.form3.em_type_info[3].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 42) {
					this.form3.em_type_info[4].em_type_attach.push(data)
					this.attach_history.push(data)
				};
				this.attach_name='';
				this.attach_url='';
				this.water_attach=''
			},

			//上传历史文档
			add_history_attach(){
				if(!this.attach_name||!this.attach_url){
					this.$Notice.error({
						title: '文件不能为空',
						duration: this.$parent.getInfoFailTime
					});
					return;
				};
				let data={
					"name":this.attach_name,
					"url":this.attach_url,
					"attach_type":this.attach_type,
				};
				if (this.attach_type == 38) {
					this.form3.em_type_info[0].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 39) {
					this.form3.em_type_info[1].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 40) {
					this.form3.em_type_info[2].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 41) {
					this.form3.em_type_info[3].em_type_attach.push(data)
					this.attach_history.push(data)
				}else if (this.attach_type == 42) {
					this.form3.em_type_info[4].em_type_attach.push(data)
					this.attach_history.push(data)
				};
				this.attach_name='';
				this.attach_url='';
				this.water_attach=''
			},
			prodTime(item,index){
				if(index==0){
					console.log(0);
					this.produtimeList[0]= parseInt(item.time)
				}else if(index==1){
					console.log(1);
					this.produtimeList[1]=parseInt(item.time)
				}else if(index==2){
					console.log(2);
					this.produtimeList[2]=parseInt(item.time)
				}
				console.log(this.produtimeList);
				for (let i in this.water_waste_total) {
					this.water_waste_total[i].wastewater_total[0].outfall_count[index].hours=parseInt(item.time);
					let total_count_water=item.time*this.water_waste_total[i].wastewater_total[0].count;
					this.water_waste_total[i].wastewater_total[0].outfall_count[index].total=total_count_water.toFixed(2);
				}
				for (let i in this.wastegas_total) {
					let total_count_gas=item.time*this.wastegas_total[i].count;
					this.wastegas_total[i].outfall_count[index].total = total_count_gas.toFixed(2)
					this.wastegas_total[i].outfall_count[index].hours=parseInt(item.time);
				}
			},

			changeWaterhours(item,index,index3){
				console.log(item.hours,index,index3);
				if(index3==0){
					if(item.hours>this.produtimeList[0]){
						this.$toast('生产时间不得超过企业季度信息中填写的生产时间,请重新填写')
						setTimeout(()=>{
							item.hours = this.produtimeList[0]
						},100)
					}
				}else if(index3==1){
					if(item.hours>this.produtimeList[1]){
						this.$toast('生产时间不得超过企业季度信息中填写的生产时间,请重新填写')
						setTimeout(()=>{
							item.hours = this.produtimeList[1]
						},100)
					}
				}else if(index3==2){
					if(item.hours>this.produtimeList[2]){
						this.$toast('生产时间不得超过企业季度信息中填写的生产时间,请重新填写')
						setTimeout(()=>{
							item.hours = this.produtimeList[2]
						},100)
					}
				}
				this.update_outfall_count(index,0)

			},
			changeAttachDetail(value){
				console.log('index',value)
				this.attach_name = this.attach_history[value].name
				this.attach_url = this.attach_history[value].url
				this.attach_type = this.attach_history[value].attach_type
			},

			addData2(){
				let data={
					name:this.noise_name,
					value:this.noise_value
				};
				this.noise_list.push(data);
			},

			solid_index(e){
				this.solid_waste_index=e;
			},

			dangerous_index(e){
				this.dangerous_waste_index=e
			},

			water_waste_index(e,e1){
				this.water_waste_e=e;
				this.water_waste_e1=e1;
			},

			gas_waste_index(e){
				this.gas_waste_e=e;
			},

			noise_index(e){
				this.noise_e=e
			},

			update_outfall_count(index,index1){
				console.log(index,index1)
				let speed=this.water_waste_total[index].wastewater_total[index1].count
				let data=this.water_waste_total[index].wastewater_total[index1].outfall_count
				for(var i in data){
					if(!data[i].hours){
						data[i].hours=0
					}
					let total_count=speed*data[i].hours
					data[i].total=total_count.toFixed(2)
				}
				this.water_waste_total[index].wastewater_total[index1].outfall_count=data
			},

			update_gas_outfall_count(index){
				let speed=this.wastegas_total[index].count;
				let data=this.wastegas_total[index].outfall_count;
				for(var i in data){
					if(!data[i].hours){
						data[i].hours=0;
					};
					let total_count=speed*data[i].hours;
					data[i].total=total_count.toFixed(2);
				};
				this.wastegas_total[index].outfall_count=data;
			},


			//获取模板数据
			getModel(){
				Toast.loading({
					message: '加载数据中...',
					forbidClick: true,
					loadingType: 'spinner',
				})
				let data={
					id:this.form1.enterprise_id
				};
				getmodel(data).then(res=>{
					if(res.errno==0){
						this.model_data=res.data;
						if(res.data.waste_water == 1) {
							this.form3.waste_water = 1
							this.waste_water_change()
						}
						if(res.data.waste_gas == 1) {
							this.form3.waste_gas = 1
							this.waste_gas_change()
						}
						if(res.data.solid_waste == 1) {
							this.form3.solid_waste = 1
							this.solid_waste_change()
						}
						if(res.data.dangerous_waste == 1) {
							this.form3.dangerous_waste = 1
							this.dangerous_waste_change()
						}
						if(res.data.noise == 1) {
							this.form3.noise = 1
							this.noise_change()
						}else if(res.data.noise == 0){
							this.form3.noise = 0
						}
					}
				});
			},
			//废水
			waste_water_change(){
				//如果等于1获取模板
				if(this.model_data.waste_water==1){
					// this.water_waste_total[i].wastewater_total[0].outfall_count=this.produtimeList;
					let data= this.water_waste_total.length>0 ? this.water_waste_total : this.model_data.waste_water_total;
					for(let i in data){
						data[i].wa_tr_fa=this.water_waste_total[i] ?  this.water_waste_total[i].wa_tr_fa : 0;
						data[i].ou_wa_fa=this.water_waste_total[i] ? this.water_waste_total[i].ou_wa_fa : 0;
						data[i].wa_tr_fa_attach=this.water_waste_total[i] ? this.water_waste_total[i].wa_tr_fa_attach : [];
						data[i].ou_wa_fa_attach=this.water_waste_total[i] ? this.water_waste_total[i].ou_wa_fa_attach : [];
						data[i].third_enterprise_id=this.water_waste_total[i] ? this.water_waste_total[i].third_enterprise_id : '';
						let data1 = data[i].wastewater_total;
						if(data1[0].index_array.length < this.model_data.waste_water_total[i].wastewater_total[0].index_array.length) {
							let start = data1[0].index_array.length
							data1[0].index_array = data1[0].index_array.concat(this.model_data.waste_water_total[i].wastewater_total[0].index_array.slice(start))
						}
						for(let j in data1){
							if(!data1[j].outfall_count){
								if(this.form1.quarter==1){
									data1[j].outfall_count=[
										{'month':'1月','hours':0,'total':0},
										{'month':'2月','hours':0,'total':0},
										{'month':'3月','hours':0,'total':0}
									];
								}else if(this.form1.quarter==2){
									data1[j].outfall_count=[
										{'month':'4月','hours':0,'total':0},
										{'month':'5月','hours':0,'total':0},
										{'month':'6月','hours':0,'total':0}
									];
								}else if(this.form1.quarter==3){
									data1[j].outfall_count=[
										{'month':'7月','hours':0,'total':0},
										{'month':'8月','hours':0,'total':0},
										{'month':'9月','hours':0,'total':0}
									];
								}else if(this.form1.quarter==4){
									data1[j].outfall_count=[
										{'month':'10月','hours':0,'total':0},
										{'month':'11月','hours':0,'total':0},
										{'month':'12月','hours':0,'total':0}
									];
								};
							}
							if(!data1[j].index_array) {
								for(let k in data1[j].index_array){
									data1[j].index_array[k].index_value1=0;
									data1[j].index_array[k].index_value2=0;
									data1[j].index_array[k].index_value3=0;
								}
							}
						}
						data[i].wastewater_total=data1
					};
					// console.log(data);
					this.water_waste_total=data
				}
			},
			//废气
			waste_gas_change(){
				//如果等于1获取模板
				if(this.model_data.waste_gas==1){
					// console.log(this.wastegas_total)
					let data=this.wastegas_total.length>0 ? this.wastegas_total : this.model_data.waste_gas_info.wastegas_total_info;
					for(let i in data){
						if(!data[i].outfall_count) {
							if(this.form1.quarter==1){
								data[i].outfall_count=[
									{'month':'1月','hours':0,'total':0},
									{'month':'2月','hours':0,'total':0},
									{'month':'3月','hours':0,'total':0}
								];
							}else if(this.form1.quarter==2){
								data[i].outfall_count=[
									{'month':'4月','hours':0,'total':0},
									{'month':'5月','hours':0,'total':0},
									{'month':'6月','hours':0,'total':0}
								];
							}else if(this.form1.quarter==3){
								data[i].outfall_count=[
									{'month':'7月','hours':0,'total':0},
									{'month':'8月','hours':0,'total':0},
									{'month':'9月','hours':0,'total':0}
								];
							}else if(this.form1.quarter==4){
								data[i].outfall_count=[
									{'month':'10月','hours':0,'total':0},
									{'month':'11月','hours':0,'total':0},
									{'month':'12月','hours':0,'total':0}
								];
							};
						}
						if(!data[i].index_array){
							for(let j in data[i].index_array){
								data[i].index_array[j].index_value1=0;
								data[i].index_array[j].index_value2=0;
								data[i].index_array[j].index_value3=0;
							}
						}
					};
					this.wastegas_total=data
				}
			},
			//固废
			solid_waste_change(){
				//如果等于1获取模板
				if(this.model_data.solid_waste==1){
					let data=this.solid_total_info.length>0? this.solid_total_info : this.model_data.solid_total_info;
					for(let i in data){
						if (!data[i].month_count) {
							if(this.form1.quarter==1){
								data[i].month_count=[
									{'month':'1月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'2月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'3月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==2){
								data[i].month_count=[
									{'month':'4月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'5月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'6月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==3){
								data[i].month_count=[
									{'month':'7月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'8月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'9月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==4){
								data[i].month_count=[
									{'month':'10月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'11月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'12月','solid_product_count':0,'solid_use_count':0,'solid_out_count':0,'solid_remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							};
						}
					};
					this.solid_total_info=data
				}
			},
			//危险物
			dangerous_waste_change(){
				//如果等于1获取模板
				if(this.model_data.dangerous_waste==1){
					let data=this.dangerous_waste_total.length>0 ? this.dangerous_waste_total : this.model_data.dangerous_waste_total;
					for(let i in data){
						if(!data[i].month_count) {
							if(this.form1.quarter==1){
								data[i].month_count=[
									{'month':'1月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'2月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'3月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==2){
								data[i].month_count=[
									{'month':'4月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'5月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'6月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==3){
								data[i].month_count=[
									{'month':'7月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'8月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'9月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							}else if(this.form1.quarter==4){
								data[i].month_count=[
									{'month':'10月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'11月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard},
									{'month':'12月','product_count':0,'use_count':0,'out_count':0,'remain_count':0,'limit':data[i].total_limit,'standard':data[i].standard}
								];
							};
						}
					};
					this.dangerous_waste_total=data
				}
			},
			//噪音
			noise_change(){
				//如果等于1获取模板
				if(this.model_data.noise==1){
					this.form3.factory_length=this.model_data.factory_length;
					let data= this.noise_list.length>0? this.noise_list : this.model_data.noise_list;
					for(var i in data){
						data[i].limit_day = this.model_data.noise_list[i].limit_day
						data[i].limit_night = this.model_data.noise_list[i].limit_night
						if (!data[i].month_count) {
							if(this.form1.quarter==1){
								data[i].month_count=[
									{'month':'1月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'2月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'3月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
								];
							}else if(this.form1.quarter==2){
								data[i].month_count=[
									{'month':'4月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'5月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'6月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
								];
							}else if(this.form1.quarter==3){
								data[i].month_count=[
									{'month':'7月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'8月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'9月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
								];
							}else if(this.form1.quarter==4){
								data[i].month_count=[
									{'month':'10月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'11月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
									{'month':'12月','noise':0,'limit_day':data[i].limit_day,'limit_night':data[i].limit_night,'standard':data[i].standard},
								];
							};
						}
					};
					this.noise_list=data
				}
			},

			//打开文件上传窗口
			toAddfiles(){
				this.uploadmodel=true
			},

			//上传文件成功
			uploadSuccess(res, file) {
				if (res.errno) {
					this.$Notice.error({
						title: '上传失败',
						desc: res.errmsg,
						duration: this.$parent.saveFailTime
					});
				} else {
					this.attach_url = res.url;
					this.$Notice.success({
						title: '上传成功',
						duration: this.$parent.successTime
					});
				}
			},
			//上传文件失败
			uploadError(error, file) {
				this.$Notice.error({
					title: '上传失败',
					desc: file,
					duration: this.$parent.saveFailTime
				});
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 2;
				if (!check) {
					this.$Notice.warning({
						title: '最多只能上传 1个文件。'
					});
				}
				return check;
			},
			_initEmTypeInfo(){
				let arr = []
				for(let i = 0; i<5 ; i++){
					arr.push({
						em_type_attach:[],
						em_type_third_enterprise_id:'',
						em_type_explain:'',
						em_type:0,
						type:i+1
					})
				}
				return arr
			}
		},

	}
</script>

<style scoped>
	.page>>>.ivu-modal-body{
		font-size: 28px;
	}
	.page>>>.ivu-input-wrapper{
		width: auto;
	}
	.page>>>.ivu-input{
		width: 250px;
	}
	.page>>>.ivu-radio-group{
		font-size: 28px;
	}
	.page>>>.ivu-radio-wrapper{
		font-size: 32px;
		margin-right: 100px;
	}
	.page>>>.ivu-form .ivu-form-item-label{
		font-size: 28px;
	}
	.page>>>.ivu-form-item-content{
		font-size: 28px;
		text-align: left;
	}
	.page>>>.ivu-btn{
		font-size: 28px;
	}
	.page>>>.ivu-table-cell{
		padding:0 10px;
	}
	.page>>>.ivu-input-number{
		width: auto;
	}
</style>
<style lang="less" scoped>
	.page{
		padding-top: 112px;
		background-color: #F7F7FA;
		.content{
			background-color: #ffffff;
			/*padding: 50px 44px;*/
			text-align: left;
			.card{
				border-top:solid 1px #ECECEC;
				padding: 30px 44px;
				position: relative;
				>p{
					margin-bottom:16px;
				}
				.icon-down{
					position: absolute;
					right: 30px;
					top: 30px;
					height: 50px;
					width: 52px;
				}
			}
			.card:first-child{
				border:none;
			}
			.inner-card{
				background:#e6eaec;
				margin: 0 20px;
				padding: 0 20px;
				border-radius: 10px;
				position: relative;
				.w-card{
					padding: 30px 0 40px;
					>p{
						margin: 10px 0;
					}
				}
				.null{
					padding: 20px;
					text-align: center;
				}
				.fold{
					display: flex;
					align-items: center;
					justify-content: center;
					border-top: solid 1px #B3B3B3;
					padding-top: 15px;
					img{
						height: 50px;
						width: 52px;
						margin-top: 10px;
					}
				}
			}
			.item-card{
				background:rgba(255,255,255,1);
				border-radius:10px;
				padding: 16px 15px;
				margin-bottom: 15px;
				p{
					margin-bottom: 18px;
				}
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
				p:nth-child(2){
					padding-top:10px;
				}
			}
		}
		.line{
			border-bottom: 2px solid #e0cece;
			margin: 50px 0;
		}
		.card-two{
			background: #f2faff;
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
		.btns{
			display: flex;
			align-items: center;
			justify-content: center;
			.btn{
				width:40%;
				height:90px;
				line-height: 90px;
				background:rgba(33,68,61,1);
				box-shadow:0px 4px 18px 0px rgba(166,172,191,0.5);
				border-radius:52px;
				color: #ffffff;
				margin: 30px auto;
			}
		}

	}
</style>
