<template>
	<div class="page">
		<head-bar title="环评基本信息详情"></head-bar>
		<p style="margin-bottom: 10px;display: flex;align-items: center;background-color: #fff;padding:  15px">
			<span style="width: 80px">企业：</span>
			<i-select v-model="enterprise_id"  >
				<i-option v-for="item in enterpriseData" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
			</i-select>
		</p>
		<div class="content">
			<Form ref="form" :model="form"   :rules="ruleValidate" label-position="left">
				<div class="card">
					<p>1、是否有做环境影响评价报告</p>
					<RadioGroup v-model="form.affect_book">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div v-if="form.affect_book==1">
						<div style="margin-bottom:5px">
							<FormItem prop="unit_name" label="编制单位：">
								<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">编制单位：</p>  -->
								<i-input type="text" v-model="form.unit_name" placeholder="请输入编制单位全称" style="width:200px"></i-input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=1;attach_title='单位资质证书';add_attach=true" >上传资质证书</Button>
						</div>
						<FormItem prop="unit_prove" >
							<p><em style="color: #ed4014">*</em>资质证书：</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.unit_prove"></Table>
						</FormItem>
						<div style="margin-top:5px;margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">注册环评工程师：</p>  -->
							<FormItem label="注册环评工程师：" prop="register_name" >
								<i-input type="text" v-model="form.register_name" placeholder="请输入注册环评工程师姓名" style="width:200px"></i-input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">注册证书编号：</p>  -->
							<FormItem label="注册证书编号：" prop="register_code" >
								<i-input type="text" v-model="form.register_code" placeholder="请输入注册证书编号" style="width:200px"></i-input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">环评报告类型：</p> -->
							<FormItem prop="book_type" label="环评报告类型：">
								<i-select v-model="form.book_type" style="width:200px" >
									<i-option :value="1">报告书</i-option>
									<i-option :value="2">报告表</i-option>
									<i-option :value="3">登记表</i-option>
								</i-select>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">编制日期：</p> -->
							<FormItem prop="book_date" label="编制日期：">
								<DatePicker type="date" placeholder="请选择编制日期" style="width: 30%;" @on-change="form.book_date=$event" :value="form.book_date" value-format="yyyy-MM-dd" ></DatePicker>
							</FormItem>
						</div>

						<!-- <div style="margin-bottom:5px">
                          <Button type="primary" class="button1" @click="add_index1=true;index_title='环境影响评价报告书指标';index_type=4" >添加指标</Button>
                        </div>
                        <Table border highlight-row size="small" :columns="columns_index6" :data="po_emit_prove_index_array" style="margin-bottom:5px"></Table> -->

						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=2;attach_title='环评报告文件';add_attach=true" style="width:150px">上传环评报告文件</Button>
						</div>
						<FormItem prop="affect_book_attach" >
							<p>环评报告文件：</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.affect_book_attach"></Table>
						</FormItem>
						<div style="margin-top:5px;margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=3;attach_title='其他附件';add_attach=true" >其他附件</Button>
						</div>
						<FormItem prop="affect_book_other_attach">
							<p>其他附件：</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.affect_book_other_attach"></Table>
						</FormItem>
					</div>
				</div>

				<div class="card">
					<p >2、是否有环保部门的环评批复意见</p>
					<RadioGroup v-model="form.department_reply">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div v-if="form.department_reply==1">
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">环保批准部门：</p> -->
							<FormItem prop="department_reply_name" label="环保批准部门：">
								<Input type="text" placeholder="请输入环保批准部门全称" v-model="form.department_reply_name" style="width:200px"></Input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">批复文号：</p>  -->
							<FormItem prop="reply_code" label="批复文号：">
								<i-input type="text" v-model="form.reply_code" placeholder="请输入批复文号" style="width:200px"></i-input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">批复日期：</p> -->
							<FormItem prop="reply_date" label="批复日期：">
								<DatePicker type="date" placeholder="批复日期" style="width: 30%;" @on-change="form.reply_date=$event" :value="form.reply_date" value-format="yyyy-MM-dd" ></DatePicker>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=4;attach_title='批复文件';add_attach=true" >添加批复文件</Button>
							<span style="color:red;font-size:14px;margin-left:5px">环保部门批复文件的扫描件</span>
						</div>
						<FormItem prop="department_reply_attach">
							<p>批复文件：</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.department_reply_attach"></Table>
						</FormItem>
						<div style="margin-top:5px;margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=5;attach_title='其他附件';add_attach=true" >添加其他附件</Button>
							<span style="color:red;font-size:14px;margin-left:5px">其他附件</span>
						</div>
						<Table border highlight-row size="small" :columns="columns_attach" :data="form.department_reply_other_attach"></Table>
					</div>
				</div>
				<div class="card">
					<p >3、是否有环评验收手续</p>
					<RadioGroup v-model="form.check_accept">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div v-if="form.check_accept==1">
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">环评验收单位：</p> -->
							<FormItem prop="check_accept_name" label="环评验收单位：">
								<Input type="text" placeholder="请输入环评验收单位全称" v-model="form.check_accept_name" style="width:200px"></Input>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<!-- <p style="width:100px;float:left;text-align:right;line-height:32px">批复日期：</p> -->
							<FormItem prop="check_accept_date" label="批复日期：">
								<DatePicker type="date" placeholder="批复日期" style="width: 30%;" @on-change="form.check_accept_date=$event" :value="form.check_accept_date" value-format="yyyy-MM-dd" ></DatePicker>
							</FormItem>
						</div>
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=6;attach_title='佐证文件';add_attach=true" >添加佐证文件</Button>
							<span style="color:red;font-size:14px;margin-left:5px">佐证文件</span>
						</div>
						<FormItem prop="check_accept_attach" label="">
							<p>佐证文件：</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.check_accept_attach"></Table>
						</FormItem>
					</div>
				</div>


				<div class="card">
					<p >4、是否产生工业废水</p>
					<RadioGroup v-model="form.waste_water">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div v-if="form.waste_water==1">
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评废水指标';pe_index=1" style="width:150px;margin-bottom:5px">添加环评废水指标</Button>
							<FormItem prop="po_emit_prove_index_array1" label="">
								<p>环评废水指标：</p>
									<div class="item-card">
										<p>name</p>
										<p>年排污总量(Kg)：</p>
										<p>排放浓度(mg/m³)：</p>
										<p>排放速率(m³/h)：</p>
										<p>执行标准：</p>
										<div>
											<span>删除</span>
										</div>
									</div>
<!--								<Table border highlight-row size="small" :columns="columns_index6" :data="form.po_emit_prove_index_array1" ></Table>-->
							</FormItem>
						</div>


						<Button type="primary" class="button1" @click="add_total('water_waste')" style="width:120px">添加排污监测点</Button>
						<FormItem prop="water_waste_total" label="排污监测点：">
							<div style="margin:10px 0 10px 0;padding:10px;background-color:#fff" v-for="(item,index) in form.water_waste_total" :key="index">
								<!-- <span>废水类型：</span>
                                <i-select v-model="item.type_id" style="width:200px" >
                                  <i-option v-for="item1 in wastewater_type_data" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
                                </i-select>
                                <Button type="primary" class="button1" @click="delete_total('water_waste',index)" style="width:60px">删除</Button> -->
								<!-- <p style="margin:10px 0 0 0">
                                  <span>废水分布：</span>
                                  <Button type="primary" class="button1" @click="add_total('water',index)" style="width:150px">添加排污监测点</Button>
                                </p> -->
								<div style="margin:10px 0 0 0;" v-for="(item2,index1) in item.wastewater_total" :key="index1">
									<span>排污监测点：</span> <i-input type="text" v-model="item2.outfall_name" placeholder="请输入排污监测点名称、编号" style="width:300px"></i-input>
									<!-- <Button type="primary" class="button1" @click="delete_total('water',index,index1)" style="width:60px">删除</Button> -->
									<Button type="primary" class="button1" @click="delete_total('water_waste',index)" style="width:60px">删除</Button>
									<p style="margin-top:5px">
										<span>废水类型：</span>
										<i-select v-model="item.type_id" style="width:200px" >
											<i-option v-for="item1 in wastewater_type_data" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
										</i-select>
									</p>

									<!-- <p style="margin-top:5px;margin-bottom:5px">
                                      <span >废水流量：</span> <InputNumber v-model="item2.count" placeholder="请输入废水流量"  ></InputNumber>m³/h
                                    </p> -->
									<div style="margin-top:5px;margin-bottom:5px">
										<Button type="primary" class="button1" @click="add_index=true;index_title='排污监测点数据';water_index=index;index_type=index1.toString()+'water'"  style="width:150px">选择环评废水指标</Button>
									</div>
									<Table border highlight-row size="small" :columns="columns_index" :data="item2.index_array" ></Table>
								</div>
							</div>
						</FormItem>
					</div>
				</div>

				<div class="card">
					<p >5、是否产生工业废气</p>
					<RadioGroup v-model="form.waste_gas">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="form.waste_gas==1">
					<div style="margin-bottom:5px">
						<Button type="primary" class="button1" @click="add_index1=true;index_title='环评废气指标';pe_index=2" style="width:150px;margin-bottom:5px">添加环评废气指标</Button>
						<FormItem prop="po_emit_prove_index_array2" label="环评废气指标：">
							<Table border highlight-row size="small" :columns="columns_index7" :data="form.po_emit_prove_index_array2" ></Table>
						</FormItem>
					</div>
					<div style="margin:10px 0 10px 0;padding:10px;background-color:#fff">
						<p style="margin:10px 0 0 0">
							<Button type="primary" class="button1" @click="add_total('gas')" style="width:150px; margin-bottom:20px;">添加排放口（监测点）</Button>
						</p>
						<FormItem prop="wastegas_total" label="排放口（监测点）：">
							<div style="margin-bottom:10px;padding:10px;border:1px solid #007aff;border-radius:2px" v-for="(item,index) in form.wastegas_total" :key="index">
								<span>排气监测点：</span> <i-input type="text" v-model="item.vent_name" placeholder="请输入排气监测点名称" style="width:300px"></i-input>
								<Button type="primary" class="button1" @click="delete_total('gas',index)" style="width:60px">删除</Button>

								<!-- <p style="margin-top:5px;margin-bottom:5px">
                                  <span style="margin-left:12px">排放风量：</span> <InputNumber v-model="item.count" placeholder="请输入排放风量"  @on-change="update_gas_outfall_count(index)"></InputNumber>标杆m³/h
                                </p> -->

								<div style="margin-top:5px;margin-bottom:5px">
									<Button type="primary" class="button1" @click="add_index=true;index_title='排气监测点数据';index_type=index.toString()+'gas'"  style="width:150px">选择环评废气指标</Button>
								</div>
								<Table border highlight-row size="small" :columns="columns_index1" :data="item.index_array"></Table>
							</div>
						</FormItem>
					</div>
				</div>

				<div class="card">
					<p >6、是否产生一般固废</p>
					<RadioGroup v-model="form.solid_waste">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="form.solid_waste==1">
					<div style="margin-bottom:5px">
						<Button type="primary" class="button1" @click="add_index1=true;index_title='环评固废指标';pe_index=3" style="width:150px;margin-bottom:5px">添加环评固废指标</Button>
						<FormItem prop="po_emit_prove_index_array3" label="环评固废指标：">
							<Table border highlight-row size="small" :columns="columns_index8" :data="form.po_emit_prove_index_array3" ></Table>
						</FormItem>
					</div>
					<div style="margin-top:10px">
						<Button type="primary" class="button1" @click="add_total('solid_total_info')" style="width:120px">添加固废信息</Button>
					</div>
					<FormItem prop="solid_total_info" label="固废信息：">
						<div style="margin:10px 0 0 0;padding:20px;background-color:#fff" v-for="(item,index) in form.solid_total_info" :key="index" >
							<p style="margin-bottom:10px">
								<span>固废名称：</span> <i-input type="text" v-model="item.name" placeholder="请输入固废名称" style="width:200px"></i-input>

								<!-- <span>第三方委外公司：</span>
                                <i-select v-model="item.third_enterprise_id" style="width:200px" >
                                  <i-option v-for="item1 in third_Enterprise_Select" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
                                </i-select> -->
								<Button type="primary" class="button1" @click="delete_total('solid_total_info',index)" style="width:60px;margin-left:30px">删除</Button>
							</P>
							<div style="height:32px;margin-bottom:10px">
								<div style="float:left;width:63px;line-height:32px">固废类型：</div>
								<Select  :label-in-value="true" style="width:200px" v-model="item.type_id" @on-change="(value,selectedData)=>{get_solid_total_limit(value,index)}" >
									<Option v-for="(item,index) in form.po_emit_prove_index_array3" v-bind:key="index" :value="item.id" :label="item.name"></Option>
								</Select>
								<!-- <Cascader :data="solid_waste_type" v-model="item.type_id" placeholder="请选择固废类型" trigger="hover" @on-change="(value,selectedData)=>{get_solid_total_limit(value, selectedData,index)}" style="width:200px;float:left;margin-right:10px" ></Cascader> -->
								<p style="line-height:32px">
									<span>排污总量（许可值）：{{item.total_limit}}t</span>
									<!-- <span>执行标准：{{item.standard}}</span> -->
								</p>
							</div>
						</div>
					</FormItem>
				</div>

				<div class="card">
					<p >7、是否产生危险废物</p>
					<RadioGroup v-model="form.dangerous_waste">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="form.dangerous_waste==1">
					<div style="margin-bottom:5px">
						<Button type="primary" class="button1" @click="add_index1=true;index_title='环评危险废物指标';pe_index=4" style="width:150px;margin-bottom:5px">添加环评危险废物指标</Button>
						<FormItem prop="po_emit_prove_index_array4" label="危险废物指标：">
							<Table border highlight-row size="small" :columns="columns_index9" :data="form.po_emit_prove_index_array4" ></Table>
						</FormItem>
					</div>
					<div style="margin-top:10px">
						<Button type="primary" class="button1" @click="add_total('dangerous')" style="width:120px">添加危险物信息</Button>
					</div>
					<FormItem prop="dangerous_waste_total" label="危险物信息：">
						<div style="margin:10px 0 0 0;padding:20px;background-color:#fff" v-for="(item,index) in form.dangerous_waste_total" :key="index">
							<p style="margin-bottom:10px">
								<span>废物名称：</span> <i-input type="text" v-model="item.name" placeholder="请输入危险废物名称" style="width:200px"></i-input>
								<!-- <span>第三方处理公司：</span>
                                <i-select v-model="item.third_enterprise_id" style="width:200px" >
                                  <i-option v-for="item2 in third_Enterprise_Select" v-bind:key="item2.id" :value="item2.id">{{item2.name}}</i-option>
                                </i-select> -->
								<Button type="primary" class="button1" @click="delete_total('dangerous',index)" style="width:60px">删除</Button>
							</p>
							<div style="height:32px;margin-bottom:10px">
								<div style="float:left;width:63px;line-height:32px">种类代码：</div>
								<!-- <Cascader :data="dangerous_waste_type_data" v-model="item.type_id" placeholder="请选择种类代码" trigger="hover" @on-change="(value,selectedData)=>{get_dangerous_total_limit(value, selectedData,index)}" style="width:250px;float:left"></Cascader> -->
								<Select  label-in-value style="width:200px" @on-change="(value,selectedData)=>{get_dangerous_total_limit(value,index)}" v-model="item.type_id" >
									<Option v-for="(item,index) in form.po_emit_prove_index_array4" v-bind:key="index" :value="item.id" :label="item.name"></Option>
								</Select>
								<p style="line-height:32px">
									<span>排污总量（许可量）：{{item.total_limit}}t</span>
									<!-- <span>执行标准：{{item.standard}}</span> -->
								</p>
							</div>
						</div>
					</FormItem>
					<div style="margin-bottom:5px ;margin-top:15px;">
						<Button type="primary" class="button1" @click="attach_type=7;attach_title='危险废物服务合同';add_attach=true" style="width:150px">添加危险废物服务合同</Button>
						<span style="color:red;font-size:14px;margin-left:5px">危险废物服务合同</span>
					</div>
					<FormItem prop="dangerous_attach" label="危险废物服务合同：">
						<Table border highlight-row size="small" :columns="columns_attach" :data="form.dangerous_attach"></Table>
					</FormItem>
				</div>

				<div class="card">
					<p >8、是否有噪音排放</p>
					<RadioGroup v-model="form.noise">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" v-if="form.noise==1" >
					<div style="margin-bottom:5px">
						<Button type="primary" class="button1" @click="add_index1=true;index_title='环评噪音指标';pe_index=5" style="width:150px;margin-bottom:5px">添加环评噪音指标</Button>
						<FormItem prop="po_emit_prove_index_array5" label="噪音指标：">
							<Table border highlight-row size="small" :columns="columns_index10" :data="form.po_emit_prove_index_array5" ></Table>
						</FormItem>
					</div>

					<div style="margin-bottom:5px">
						<span>厂界长度：</span>
						<InputNumber placeholder="请输入厂界长度" v-model="form.factory_length" style="width:200px" @on-change="computecount"></InputNumber>m
					</div>
					<FormItem prop="noise_list" label="监测点信息：">
						<div style="margin:5px 0 0 0;padding:10px;background-color:#fff" v-for="(item,index) in form.noise_list" :key="index">

							<div style="margin-bottom:5px">
								<p style="width:100px;float:left;text-align:right;line-height:32px">监测点：</p>
								<Input placeholder="请输入监测点" v-model="item.name"  style="width:200px"></Input>
							</div>
							<div style="margin-bottom:5px">
								<p style="width:100px;float:left;text-align:right;line-height:32px">编号：</p>
								<Input placeholder="请输入监测点编号" v-model="item.num"  style="width:200px"></Input>
							</div>
							<div style="margin-bottom:5px">
								<p style="width:100px;float:left;text-align:right;line-height:32px">类型：</p>
								<i-select v-model="item.type_id" style="width:200px" :label-in-value="true" @on-change="get_noise_limit($event,index)" >
									<i-option v-for="item1 in form.po_emit_prove_index_array5" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
								</i-select>
								<span>阈值：昼间{{item.limit_day}}dB</span>
								<span>夜间{{item.limit_night}}dB</span>
								<span>执行标准：{{item.standard}}</span>
							</div>

						</div>
					</FormItem>
					<!-- <div style="margin-top:5px;margin-bottom:5px">
                      <Button type="primary" class="button1" @click="add_total('noise')"  style="width:200px">添加噪音监测点</Button>
                    </div> -->
				</div>

			</Form>
		</div>
		<div class="btn" @click="savemodel">保存</div>
	</div>
</template>

<script>
	import {
		select,
		enterpriseSelect,
		third_enterpriseSelect,
		getmodel,
		savemodel,
		dangerousCode,
		limitValue
	} from '@/lib/API/model';
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		watch:{
			index_type:function(newVal,OldVal){
				this.waste_type= newVal==OldVal?this.waste_type:"";
			}
		},
		computed: {
			//上传
			uploadList() {
				return this.$refs.upload ? this.$refs.upload.fileList : [];
			}
		},
		data() {
			let self = this;
			//废水排放口表单验证
			const waterValidate = (rule, value, callback) => {
				let result = value.every(v => {return v.type_id && v.wastewater_total[0].outfall_name && v.wastewater_total[0].index_array.length !== 0})
				if (result) {
					callback()
				} else {
					callback(new Error('请查看排污口信息是否填写完整！'));
				}
			}
			//废气排放口表单验证
			const gasValidate = (rule,value,callback) => {
				let result = value.every(v => {return v.vent_name && v.index_array.length !== 0})
				if (result) {
					callback()
				} else {
					callback(new Error('请查看排污口信息是否填写完整！'))
				}
			}
			//固废信息表单验证
			const solidValidate = (rule, value, callback) => {
				let result = value.every(v => { return  v.name && v.type_id })
				if (result) {
					callback()
				} else {
					callback(new Error('请查看信息是否填写完整！'))
				}
			}
			//危废信息表单验证
			const dangerousValidate = (rule,value, callback) => {
				let result = value.every(v => { return  v.name && v.type_id })
				if (result) {
					callback()
				} else {
					callback(new Error('请查看信息是否填写完整！'))
				}
			}
			const noiseValidate = (rule, value, callback) => {
				let result = value.every(v => { return v.name && v.num})
				if (result) {
					callback()
				} else {
					callback(new Error('请查看信息是否填写完整！'))
				}
			}
			return {
				//表单验证
				ruleValidate:{
					unit_name:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					register_name:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					register_code:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					unit_prove:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					book_type:[{
						required:true,
						type:'number',
						message:'不能为空',
						trigger:'blur'
					}],
					book_date:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					affect_book_attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					affect_book_other_attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					department_reply_name:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					reply_code:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					reply_date:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					department_reply_attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					check_accept_name:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					check_accept_date:[{
						required:true,
						message:'不能为空',
						trigger:'blur'
					}],
					check_accept_attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					po_emit_prove_index_array1:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					water_waste_total:[
						{ validator: waterValidate, trigger: 'blur' }
					],
					po_emit_prove_index_array2:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					wastegas_total:[
						{ validator: gasValidate, trigger: 'blur' }
					],
					po_emit_prove_index_array3:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					solid_total_info:[
						{ validator: solidValidate, trigger: 'blur' }
					],
					po_emit_prove_index_array4:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					dangerous_waste_total:[
						{ validator: dangerousValidate, trigger: 'blur' }
					],
					dangerous_attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					po_emit_prove_index_array5:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}],
					noise_list:[
						{ validator: noiseValidate, trigger: 'blur' }
					],
				},
				//指标类型
				waste_type:'',
				po_emit_prove_index_data:[],
				po_emit_prove_index_data1:[],
				add_index1:false,

				first_show:false,
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

				//企业选择
				enterprise_id:'',
				enterpriseData:[],

				form:{
					po_emit_prove_index_array:[],
					//环评报告
					affect_book:0,
					unit_name:'',
					register_name:'',
					register_code:'',
					unit_prove:[],
					book_type:'',
					book_date:'',
					affect_book_attach:[],
					affect_book_other_attach:[],
					//环保部门批复意见
					department_reply:0,
					department_reply_name:'',
					reply_code:'',
					reply_date:'',
					department_reply_attach:[],
					department_reply_other_attach:[],
					//环评验收
					check_accept:0,
					check_accept_name:'',
					check_accept_date:'',
					check_accept_attach:[],
					//环评指标废水
					waste_water:0,
					po_emit_prove_index_array1:[],
					water_waste_total:[],
					//环评指标废气
					waste_gas:0,
					po_emit_prove_index_array2:[],
					wastegas_total:[],
					//环评固废
					po_emit_prove_index_array3:[],
					solid_waste:0,
					solid_total_info:[],
					//环评危废
					dangerous_waste:0,
					po_emit_prove_index_array4:[],
					dangerous_attach:[],
					dangerous_waste_total:[],
					//环评噪音
					noise:0,
					factory_length:0,
					po_emit_prove_index_array5:[],
					noise_list:[],
				},

				//环评指标
				pe_index:'',




				//废水
				water_waste_e:'',
				water_waste_e1:'',
				water_index:'',
				water_attach:'',

				//废气
				gas_waste_e:'',
				ga_tr_fa_index_array:[],
				ga_tr_fa_attach:[],
				ou_ga_fa_third_enterprise_id:'',
				ou_ga_fa_attach:[],
				ga_tr_fa:0,
				ou_ga_fa:0,


				//固废
				solid_waste_index:'',

				//危险物
				dangerous_waste_index:'',


				//噪声
				noise_name:'',
				noise_value:0,
				add_noise:false,

				//model指标绑定
				id:'',
				name:'',
				index_value:0,
				standard:'',
				remarks:'',
				total:0,
				density:0,
				speed:0,
				index_type:'',
				day_noise:0,
				night_noise:0,
				waste_type:'',
				solid_type:'',


				//model指标绑定
				attach_name:'',
				attach_url:'',
				columns_index: [{
					title: '污染物名称',
					key:'name',
					align: 'center',
				},
					{
						title: '排污浓度限值（mg/l)',
						key:'limit_value',
						align: 'center'
					},
					{
						title: '执行标准名称及标准号',
						key:'standard',
						align: 'center'
					},
					{
						title: '备注',
						key:'remarks',
						align: 'center'
					},
					{
						title: '操作',
						align: 'center',
						width: 100,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														if(params.row.index_type==31){
															this.form.water_waste_total[params.row.water_index].wa_tr_fa_index_array.splice(params.index,1);
														}else if(params.row.index_type==33){
															this.ga_tr_fa_index_array.splice(params.index,1);
														}else if(params.row.index_type==35){
															this.dangerous_waste_index_array.splice(params.index,1);
														}else if(params.row.index_type.toString().indexOf('water')!=-1){
															let index=parseInt(params.row.index_type);
															this.form.water_waste_total[params.row.water_index].wastewater_total[index].index_array.splice(params.index,1);
														}else if(params.row.index_type.toString().indexOf('gas')!=-1){
															let index=parseInt(params.row.index_type);
															this.form.wastegas_total[index].index_array.splice(params.index,1);
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
				columns_index1: [{
					title: '污染物名称',
					key:'name',
					align: 'center',
				},
					{
						title: '排污浓度限值(mg/m³)',
						key:'limit_value',
						align: 'center'
					},
					{
						title: '执行标准名称及标准号',
						key:'standard',
						align: 'center'
					},
					{
						title: '备注',
						key:'remarks',
						align: 'center'
					},
					{
						title: '操作',
						align: 'center',
						width: 100,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														if(params.row.index_type==31){
															this.form.water_waste_total[params.row.water_index].wa_tr_fa_index_array.splice(params.index,1);
														}else if(params.row.index_type==33){
															this.ga_tr_fa_index_array.splice(params.index,1);
														}else if(params.row.index_type==35){
															this.dangerous_waste_index_array.splice(params.index,1);
														}else if(params.row.index_type.toString().indexOf('water')!=-1){
															let index=parseInt(params.row.index_type);
															this.form.water_waste_total[params.row.water_index].wastewater_total[index].index_array.splice(params.index,1);
														}else if(params.row.index_type.toString().indexOf('gas')!=-1){
															let index=parseInt(params.row.index_type);
															this.form.wastegas_total[index].index_array.splice(params.index,1);
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
				columns_index6: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '年排污总量(Kg)',
						key:'total',
						align: 'center',
					},
					{
						title: '排放浓度(mg/m³)',
						key:'density',
						align: 'center',
					},
					{
						title: '排放速率(m³/h)',
						key:'speed',
						align: 'center',
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center',
					},
					{
						title: '操作',
						align: 'center',
						width: 60,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.po_emit_prove_index_array1.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_index7: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '年排污总量(Kg)',
						key:'total',
						align: 'center',
					},
					{
						title: '排放浓度(mg/l)',
						key:'density',
						align: 'center',
					},
					{
						title: '排放速率(m³/h)',
						key:'speed',
						align: 'center',
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center',
					},
					{
						title: '操作',
						align: 'center',
						width: 60,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.po_emit_prove_index_array2.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_index8: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title:'固废类型',
						key:'solid_type',
						align:'center',
						render:(h,params) => {
							console.log(params)
							switch (true){
								case params.row.solid_type == 1 :
									return '固态'
								case params.row.solid_type == 2 :
									return '半固态'
								case params.row.solid_type == 3 :
									return '液态'
							}
						}
					},
					{
						title: '年排污总量(t)',
						key:'total',
						align: 'center',
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center',
					},
					{
						title: '操作',
						align: 'center',
						width: 60,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.po_emit_prove_index_array3.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_index9: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '年排污总量(t)',
						key:'total',
						align: 'center',
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center',
					},
					{
						title: '操作',
						align: 'center',
						width: 60,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.po_emit_prove_index_array4.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_index10: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '昼间噪音(dB)',
						key:'day_noise',
						align: 'center',
					},
					{
						title: '夜间噪音(dB)',
						key:'night_noise',
						align: 'center',
					},
					{
						title: '执行标准',
						key:'standard',
						align: 'center',
					},
					{
						title: '操作',
						align: 'center',
						width: 60,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.po_emit_prove_index_array5.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
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
										}, [h('Button', {
											props: {
												type: 'text',
												icon: 'eye',
											},
											style: {
												fontSize: '20px',
												width: 'auto'
											},
											on: {
												click: () => {
													//console.log(params.row.url);
													window.open(params.row.url,'_blank');
												}
											}
										}, ),
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														if(params.row.attach_type==1){
															this.form.unit_prove.splice(params.index,1);
														}else if(params.row.attach_type==2){
															this.form.affect_book_attach.splice(params.index,1);
														}else if(params.row.attach_type==3){
															this.form.affect_book_other_attach.splice(params.index,1);
														}else if(params.row.attach_type==4){
															this.form.department_reply_attach.splice(params.index,1);
														}else if(params.row.attach_type==5){
															this.form.department_reply_other_attach.splice(params.index,1);
														}else if(params.row.attach_type==6){
															this.form.check_accept_attach.splice(params.index,1);
														}else if(params.row.attach_type==7){
															this.form.dangerous_attach.splice(params.index,1)
														}else if(params.row.attach_type==31){
															this.form.water_waste_total[params.row.water_attach].wa_tr_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==32){
															this.form.water_waste_total[params.row.water_attach].ou_wa_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==33){
															this.ga_tr_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==34){
															this.ou_ga_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==35){
															this.dangerous_waste_attach.splice(params.index,1);
														}else if(params.row.attach_type==36){
															this.em_type_attach.splice(params.index,1);
														}else if(params.row.attach_type==37){
															this.form.illegal_record_attach.splice(params.index,1);
														}else if(params.row.attach_type.toString().indexOf('dangerous')!=-1){
															let index=parseInt(params.row.attach_type);
															this.form.dangerous_waste_total[index].attach.splice(params.index,1);
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
					title: '噪声点名称',
					key:'name',
					align: 'center',
				},
					{
						title: '测试值',
						key:'value',
						align: 'center'
					},
					{
						title: '操作',
						align: 'center',
						width: 100,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
											props: {
												span: '24',
											},
										}, [
											h('Button', {
												props: {
													type: 'text',
													icon: 'close-round',
												},
												style: {
													fontSize: '20px',
													width: 'auto'
												},
												on: {
													click: () => {
														this.form.noise_list.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
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
		created() {
			this.enterpriseSelect()
		},
		activated() {

		},
		mounted(){

		},
		methods: {
			//获取企业选择列表
			async enterpriseSelect(){
				let res = await enterpriseSelect()
				if (res.errno) {
					this.$toast('获取企业选择列表出错')
				} else {
					this.enterpriseData=res.data
				}
			},
			//保存模板信息
			savemodel(){
				if(!this.enterprise_id){
					debugger
					this.$Notice.error({
						title: '请选择企业',
						duration: this.$parent.getInfoFailTime
					});
					return;
				};
				this.$refs.form.validate((valid) => {
					if (valid) {
						//指标数组合并
						let pe_index_array=[]
						this.form.po_emit_prove_index_array=pe_index_array.concat(this.form.po_emit_prove_index_array1).concat(this.form.po_emit_prove_index_array2).concat(this.form.po_emit_prove_index_array3).concat(this.form.po_emit_prove_index_array4).concat(this.form.po_emit_prove_index_array5);
						let data={
							enterprise_id:this.enterprise_id,
							affect_book:this.form.affect_book,
							department_reply:this.form.department_reply,
							check_accept:this.form.check_accept,
							waste_water:this.form.waste_water,
							waste_gas:this.form.waste_gas,
							solid_waste:this.form.solid_waste,
							dangerous_waste:this.form.dangerous_waste,
							noise:this.form.noise,
							factory_length:this.form.factory_length,
							//环评报告书
							unit_name:this.form.unit_name,
							unit_prove:JSON.stringify(this.form.unit_prove),
							register_name:this.form.register_name,
							register_code:this.form.register_code,
							book_type:this.form.book_type,
							book_date:this.form.book_date,
							affect_book_attach:JSON.stringify(this.form.affect_book_attach),
							affect_book_other_attach:JSON.stringify(this.form.affect_book_other_attach),
							po_emit_prove_index_array:JSON.stringify(this.form.po_emit_prove_index_array),
							//部门回复
							department_reply_name:this.form.department_reply_name,
							reply_code:this.form.reply_code,
							reply_date:this.form.reply_date,
							department_reply_attach:JSON.stringify(this.form.department_reply_attach),
							department_reply_other_attach:JSON.stringify(this.form.department_reply_other_attach),
							//环评验收
							check_accept_name:this.form.check_accept_name,
							check_accept_date:this.form.check_accept_date,
							check_accept_attach:JSON.stringify(this.form.check_accept_attach),
							//废水
							water_waste_total:JSON.stringify(this.form.water_waste_total),
							//废气
							waste_gas_wastegas_total_info:JSON.stringify(this.form.wastegas_total),
							//产生固废物
							solid_total_info:JSON.stringify(this.form.solid_total_info),
							//产生危险物
							dangerous_waste_total:JSON.stringify(this.form.dangerous_waste_total),
							dangerous_attach:JSON.stringify(this.form.dangerous_attach),
							//产生噪声
							noise_list:JSON.stringify(this.form.noise_list)
						};
						savemodel(data).then(res=>{
							if(res.errno==0){
								this.$toast('保存成功')
							}else{
								this.$toast('保存失败')
							}
						})
					} else {
						this.$toast('请查看信息是否填写完整')
					}
				})
			},

		},
	}
</script>

<style >
	.ivu-input{
		width: auto;
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
	}
	.ivu-btn{
		font-size: 28px;
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
			}
			.card:first-child{
				border:none;
			}
			.inner-card{
				background:#e6eaec;
				margin: 0 20px;
				padding: 0 20px;
				border-radius: 10px;
				>div{
					padding: 30px 0;
				}
			}
			.item-card{
				background:rgba(255,255,255,1);
				border-radius:10px;
				padding: 16px 30px;
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
		}
	}
</style>
