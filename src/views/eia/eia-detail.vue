<template>
	<div class="page">
		<head-bar title="环评基本信息详情"></head-bar>
		<p style="margin-bottom: 10px;display: flex;align-items: center;background-color: #fff;padding:  15px">
			<span style="width: 80px">企业：</span>
			<i-select v-model="enterprise_id"  >
				<i-option v-for="item in enterpriseData"  :value="item.id">{{item.name}}</i-option>
			</i-select>
		</p>
		<div class="content">
			<Form ref="form" :model="form"   :rules="ruleValidate" label-position="left">
				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  v-if="form.affect_book==1&&!show1" @click="show1=true" alt="">
					<p>1、是否有做环境影响评价报告</p>
					<RadioGroup v-model="form.affect_book" @on-change="onChange1">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" >
					<div class="w-card" v-if="form.affect_book==1&&show1" >
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
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show1=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.department_reply==1&&!show2" @click="show2=true" alt="">
					<p >2、是否有环保部门的环评批复意见</p>
					<RadioGroup v-model="form.department_reply">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.department_reply==1&&show2">
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
						<Table style="margin-bottom: 30px" border highlight-row size="small" :columns="columns_attach" :data="form.department_reply_other_attach"></Table>
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show2=false" alt="">
						</div>
					</div>
				</div>
				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.check_accept==1&&!show3" @click="show3=true" alt="">
					<p >3、是否有环评验收手续</p>
					<RadioGroup v-model="form.check_accept">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>

					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.check_accept==1&&show3">
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
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show3=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.waste_water==1&&!show4" @click="show4=true" alt="">
					<p >4、是否产生工业废水</p>
					<RadioGroup v-model="form.waste_water">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.waste_water==1&&show4">
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评废水指标';pe_index=1" style="margin-bottom:5px">添加环评废水指标</Button>
							<FormItem prop="po_emit_prove_index_array1" label="">
								<p>环评废水指标：</p>
									<div class="item-card" v-for="(item,index) in form.po_emit_prove_index_array1">
										<p class="name">{{index+1}} 、{{item.name}} <span @click="delFs(index)">删除</span></p>
										<p>年排污总量(Kg)：{{item.total}}</p>
										<p>排放浓度(mg/m³)：{{item.density}}</p>
										<p>排放速率(m³/h)：{{item.speed}}</p>
										<p>执行标准：{{item.standard}}</p>
									</div>
<!--								<Table border highlight-row size="small" :columns="columns_index6" :data="form.po_emit_prove_index_array1" ></Table>-->
							</FormItem>
						</div>


						<p class="line"></p>
						<Button type="primary" class="button1" @click="add_total('water_waste')">添加排污监测点</Button>
						<FormItem prop="water_waste_total" label="">
							<div class="card-one" v-for="(item,index) in form.water_waste_total" :key="index">
								<div class="card-two" v-for="(item2,index1) in item.wastewater_total" :key="index1">
									<p>排污监测点：<Button type="primary" class="del-btn" @click="delete_total('water_waste',index)" >删除</Button></p>
									<i-input type="text" v-model="item2.outfall_name" placeholder="请输入排污监测点名称、编号" style="width: 100%;margin: 15px 0"></i-input>
									<p style="margin-top:5px">
										<span>废水类型：</span>
										<i-select v-model="item.type_id" >
											<i-option v-for="item1 in wastewater_type_data" :key="item1.id" :value="item1.id">{{item1.name}}</i-option>
										</i-select>
									</p>
									<div style="margin-top:5px;margin-bottom:5px">
										<Button type="primary" class="button1" @click="add_index=true;index_title='排污监测点数据';water_index=index;index_type=index1.toString()+'water'">选择环评废水指标</Button>
									</div>
									<div style="margin-top: 10px" class="item-card" v-for="(item3,index3) in item2.index_array">
										<p class="name">{{index3+1}} 、{{item3.name}} <span @click="delFszb(item3,index3)">删除</span></p>
										<p>年排污总量(Kg)：{{item3.year_total}}</p>
										<p>排污浓度限值（mg/l)：{{item3.limit_value}}</p>
										<p>排放速率(m³/h)：{{item3.speed}}</p>
										<p>执行标准名称及标准号：{{item3.standard}}</p>
										<p>备注：{{item3.remarks}}</p>
									</div>
<!--									<Table border highlight-row size="small" :columns="columns_index" :data="item2.index_array" ></Table>-->
								</div>
							</div>
						</FormItem>
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show4=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.waste_gas==1&&!show5" @click="show5=true" alt="">
					<p >5、是否产生工业废气</p>
					<RadioGroup v-model="form.waste_gas">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div  class="inner-card">
					<div class="w-card" v-if="form.waste_gas==1&&show5">
						<div style="margin-bottom:5px;">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评废气指标';pe_index=2" >添加环评废气指标</Button>
							<FormItem prop="po_emit_prove_index_array2" label="">
								<p><em style="color: #ed4014">*</em>环评废气指标：</p>
								<div class="item-card" v-for="(item,index) in form.po_emit_prove_index_array2">
									<p class="name">{{index+1}} 、{{item.name}} <span @click="delFs2(index)">删除</span></p>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>排放浓度(mg/m³)：{{item.density}}</p>
									<p>排放速率(m³/h)：{{item.speed}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>
								<!--							<Table border highlight-row size="small" :columns="columns_index7" :data="form.po_emit_prove_index_array2" ></Table>-->
							</FormItem>
						</div>

						<p class="line"></p>
						<Button type="primary"  class="button1" @click="add_total('gas')" >添加排放口（监测点）</Button>
						<div class="card-one">
							<FormItem prop="wastegas_total" label="">
								<div class="card-two" v-for="(item,index) in form.wastegas_total" :key="index">
									<p>排气监测点：<Button type="primary" class="del-btn" @click="delete_total('gas',index)" >删除</Button></p>
									<i-input type="text" v-model="item.vent_name" placeholder="请输入排气监测点名称" style="width: 100%;margin: 15px 0"></i-input>

									<!-- <p style="margin-top:5px;margin-bottom:5px">
                                      <span style="margin-left:12px">排放风量：</span> <InputNumber v-model="item.count" placeholder="请输入排放风量"  @on-change="update_gas_outfall_count(index)"></InputNumber>标杆m³/h
                                    </p> -->

									<div style="margin:10px 0">
										<Button type="primary" class="button1" @click="add_index=true;index_title='排气监测点数据';index_type=index.toString()+'gas'" >选择环评废气指标</Button>
									</div>

									<div style="margin-top: 10px" class="item-card" v-for="(item3,index3) in item.index_array">
										<p class="name">{{index3+1}} 、{{item3.name}} <span @click="delFszb(item3,index3)">删除</span></p>
										<p>排污浓度限值(mg/m³)：{{item3.limit_value}}</p>
										<p>执行标准名称及标准号：{{item3.standard}}</p>
										<p>备注：{{item3.remarks}}</p>
									</div>
									<!--								<Table border highlight-row size="small" :columns="columns_index1" :data="item.index_array"></Table>-->
								</div>
							</FormItem>
							<div  class="fold"  >
								<img src="@/assets/img/uptwo.png"  @click="show5=false" alt="">
							</div>
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.solid_waste==1&&!show6" @click="show6=true" alt="">
					<p >6、是否产生一般固废</p>
					<RadioGroup v-model="form.solid_waste">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.solid_waste==1&&show6">
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评固废指标';pe_index=3" style="width:150px;margin-bottom:5px">添加环评固废指标</Button>
							<FormItem prop="po_emit_prove_index_array3" label="">

								<p><em style="color: #ed4014">*</em>环评固废指标：</p>
								<div class="item-card" v-for="(item,index) in form.po_emit_prove_index_array3">
									<p class="name">{{index+1}} 、{{item.name}} <span @click="delFs3(index)">删除</span></p>
									<template>
										<p v-if="item.solid_type == 1">固废类型：固态</p>
										<p v-else-if="item.solid_type == 2">固废类型：半固态</p>
										<p v-else>固废类型：液态</p>
									</template>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>
								<!--							<Table border highlight-row size="small" :columns="columns_index8" :data="form.po_emit_prove_index_array3" ></Table>-->
							</FormItem>
						</div>


						<p class="line"></p>
						<Button type="primary" class="button1" @click="add_total('solid_total_info')" >添加固废信息</Button>
						<div class="card-one">
							<FormItem prop="solid_total_info" label="">
								<div class="card-two" v-for="(item,index) in form.solid_total_info" :key="index" >
									<p>固废名称：<Button type="primary" class="del-btn" @click="delete_total('solid_total_info',index)" >删除</Button></p>
									<i-input type="text" v-model="item.name" placeholder="请输入固废名称" style="width: 100%;margin: 15px 0"></i-input>
									<div style="margin-bottom:10px">
										<div >固废类型：</div>
										<Select  :label-in-value="true"  v-model="item.type_id" @on-change="(value,selectedData)=>{get_solid_total_limit(value,index)}" >
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
							<div  class="fold"  >
								<img src="@/assets/img/uptwo.png"  @click="show6=false" alt="">
							</div>
						</div>

					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.dangerous_waste==1&&!show7" @click="show7=true" alt="">
					<p >7、是否产生危险废物</p>
					<RadioGroup v-model="form.dangerous_waste">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.dangerous_waste==1&&show7">
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评危险废物指标';pe_index=4" >添加环评危险废物指标</Button>
							<FormItem prop="po_emit_prove_index_array4" label="">

								<p><em style="color: #ed4014">*</em>危险废物指标：</p>
								<div class="item-card" v-for="(item,index) in form.po_emit_prove_index_array4">
									<p class="name">{{index+1}} 、{{item.name}} <span @click="delFs4(index)">删除</span></p>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>

								<!--							<Table border highlight-row size="small" :columns="columns_index9" :data="form.po_emit_prove_index_array4" ></Table>-->
							</FormItem>
						</div>

						<p class="line"></p>
						<Button type="primary" class="button1" @click="add_total('dangerous')" >添加危险物信息</Button>
						<div class="card-one">
							<FormItem prop="dangerous_waste_total" label="">
								<div class="card-two" v-for="(item,index) in form.dangerous_waste_total" :key="index">
									<p>废物名称：<Button type="primary" class="del-btn" @click="delete_total('dangerous',index)" >删除</Button></p>
									<i-input type="text" v-model="item.name" placeholder="请输入危险废物名称" style="width: 100%;margin: 15px 0"></i-input>

									<div style="margin-bottom:10px">
										<div >种类代码：</div>
										<Select  label-in-value style="width:200px" @on-change="(value,selectedData)=>{get_dangerous_total_limit(value,index)}" v-model="item.type_id" >
											<Option v-for="(v,i) in form.po_emit_prove_index_array4" v-bind:key="i" :value="getDangerousId(v.id)" :label="v.name"></Option>
										</Select>
										<p style="line-height:32px">
											<span>排污总量（许可量）：{{item.total_limit}}t</span>
											<!-- <span>执行标准：{{item.standard}}</span> -->
										</p>
									</div>
								</div>
							</FormItem>
						</div>



						<p class="line"></p>
						<Button type="primary" class="button1" @click="attach_type=7;attach_title='危险废物服务合同';add_attach=true" >添加危险废物服务合同</Button>
						<FormItem prop="dangerous_attach" label="">
							<p>危险废物服务合同:</p>
							<Table border highlight-row size="small" :columns="columns_attach" :data="form.dangerous_attach"></Table>
						</FormItem>
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show7=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.noise==1&&!show8" @click="show8=true" alt="">
					<p >8、是否有噪音排放</p>
					<RadioGroup v-model="form.noise">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div  class="w-card" v-if="form.noise==1&&show8" >
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="add_index1=true;index_title='环评噪音指标';pe_index=5" style="width:150px;margin-bottom:5px">添加环评噪音指标</Button>
							<FormItem prop="po_emit_prove_index_array5" label=" ">
								<p><em style="color: #ed4014">*</em>噪音指标：</p>
								<div class="item-card" v-for="(item,index) in form.po_emit_prove_index_array5">
									<p class="name">{{index+1}} 、{{item.name}} <span @click="delFs5(index)">删除</span></p>
									<p>昼间噪音(dB)：{{item.day_noise}}</p>
									<p>昼间噪音(dB)：{{item.night_noise}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>


								<!--							<Table border highlight-row size="small" :columns="columns_index10" :data="form.po_emit_prove_index_array5" ></Table>-->
							</FormItem>
						</div>

						<div>
							<span>厂界长度：</span>
							<InputNumber placeholder="请输入厂界长度" v-model="form.factory_length" style="width:200px" @on-change="computecount"></InputNumber>
						</div>
						<FormItem prop="noise_list" label="">
							<div style="margin:5px 0 0 0;padding:10px;background-color:#fff;border-radius: 10px" v-for="(item,index) in form.noise_list" :key="index">
								<div style="margin-bottom:10px">
									<span>监测点：</span>
									<Input placeholder="请输入监测点" v-model="item.name" ></Input>
								</div>
								<div style="margin-bottom:10px">
									<span>编号：</span>
									<Input placeholder="请输入监测点编号" v-model="item.num"></Input>
								</div>
								<div style="margin-bottom:10px">
									<span>类型：</span>
									<i-select v-model="item.type_id" style="width:200px" :label-in-value="true" @on-change="get_noise_limit($event,index)" >
										<i-option v-for="item1 in form.po_emit_prove_index_array5" v-bind:key="item1.id" :value="item1.id">{{item1.name}}</i-option>
									</i-select>
									<div style="margin-top: 10px;background: #f2faff;border-radius: 10px;padding: 5px 10px">
										<p>阈值：昼间{{item.limit_day}}dB</p>
										<p>夜间{{item.limit_night}}dB</p>
										<p>执行标准：{{item.standard}}</p>
									</div>
								</div>

							</div>
						</FormItem>
						<!-- <div style="margin-top:5px;margin-bottom:5px">
                          <Button type="primary" class="button1" @click="add_total('noise')"  style="width:200px">添加噪音监测点</Button>
                        </div> -->
						<div  class="fold"  >
							<img src="@/assets/img/uptwo.png"  @click="show8=false" alt="">
						</div>
					</div>
				</div>
			</Form>
		</div>
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

		<Modal v-model="add_index1" :title="index_title" @on-ok="addindexData()">
			<!-- <div style="margin-bottom:10px" >
              <p style="width:80px;float:left;line-height:30px;text-align:right">指标类型：</p>
              <Select  style="width:200px" v-model="waste_type" @on-change="changedata" >
                  <Option :value="1" >废水</Option>
                  <Option :value="2" >废气</Option>
                  <Option :value="3" >固废</Option>
                  <Option :value="4" >危废</Option>
                  <Option :value="5" >噪音</Option>
              </Select>
            </div> -->
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">名称：</p>
				<Select  v-model="id" ref="nameselect" :label-in-value="true" style="width:200px" @on-change="all_index_change" >
					<Option v-for="(item,index) in po_emit_prove_index_data1" v-bind:key="index" :value="item.id" :label="item.name" v-if="item.type==pe_index"></Option>
				</Select>
			</div>
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">执行标准：</p>
				<Input placeholder="请输入执行标准名称及标准号" v-model="standard" style="width:200px"></Input>
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==5">
				<p style="width:80px;float:left;line-height:30px;text-align:right">昼间噪音：</p>
				<InputNumber placeholder="请输入噪音限值" v-model="day_noise" style="width:150px"></InputNumber>dB
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==5">
				<p style="width:80px;float:left;line-height:30px;text-align:right">夜间噪音：</p>
				<InputNumber placeholder="请输入噪音限值" v-model="night_noise" style="width:150px"></InputNumber>dB
			</div>
			<div style="margin-bottom:10px" v-if="pe_index!=5">
				<p style="width:80px;float:left;line-height:30px;text-align:right">年排污总量：</p>
				<InputNumber placeholder="请输入年排污总量" v-model="total" style="width:150px"></InputNumber>
				<span v-if="pe_index==1||pe_index==2">kg</span><span v-else>t</span>
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==1||pe_index==2">
				<p style="width:80px;float:left;line-height:30px;text-align:right">排放浓度：</p>
				<InputNumber  placeholder="请输入排放浓度" v-model="density" style="width:150px"></InputNumber>
				<span v-if="pe_index==1">mg/l</span><span v-else>mg/m³</span>
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==1">
				<p style="width:80px;float:left;line-height:30px;text-align:right" >废水流量：</p>
				<InputNumber  placeholder="废水流量" v-model="speed" style="width:150px"></InputNumber>m³/h
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==2">
				<p style="width:80px;float:left;line-height:30px;text-align:right" >排放风量：</p>
				<InputNumber  placeholder="请输入排放风量" v-model="speed" style="width:150px"></InputNumber>m³/h
			</div>
			<div style="margin-bottom:10px" v-if="pe_index==3">
				<p style="width:80px;float:left;line-height:30px;text-align:right" >固废类型：</p>
				<Select v-model="solid_type" placeholder="请选择固废类型" style="width:200px;float:left;margin-right:10px">
					<Option :value=1>固态</Option>
					<Option :value=2>半固态</Option>
					<Option :value=3>液态</Option>
				</Select>
			</div>

		</Modal>

		<Modal v-model="add_index" :title="index_title" @on-ok="addData()">
			<div style="margin-bottom:10px" >
				<span>废物名称：</span>
				<Select  v-show="index_type.toString().indexOf('water')!= -1" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change"  >
					<Option v-for="(item,index) in form.po_emit_prove_index_array1" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
				<Select  v-show="index_type.toString().indexOf('gas')!= -1" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change"  >
					<Option v-for="(item,index) in form.po_emit_prove_index_array2" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
			</div>
			<!-- <div style="margin-bottom:10px" >
              <p style="width:80px;float:left;line-height:30px;text-align:right">测试值：</p>
              <InputNumber placeholder="请输入测试值" v-model="index_value" style="width:200px"></InputNumber>
            </div> -->
			<div>
				<span>备注：</span>
				<Input type="text" placeholder="" v-model="remarks"></Input>
			</div>
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
	import Config from '@/Config'
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
				baseURL: Config.baseURL,
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				show6:false,
				show7:false,
				show8:false,
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
							// console.log(params)
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
			this.enterprise_id=this.$route.query.enterprise_id;
			console.log(this.enterprise_id);
			this.enterpriseSelect()
			if(this.enterprise_id){
				this.nextaction()
			}

		},
		mounted(){
			this.add_total('water_waste')
			this.add_total('gas')
			this.add_total('solid_total_info')
			this.add_total('dangerous')
			this.add_total('noise')
			this.getselectdata();
			//上传验证
			this.headers.Authorization = sessionStorage.token;

		},
		activated() {
		},
		methods: {
			//危废typeID类型转换
			getDangerousId(v) {
				return v.join(',')
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
						this.noise_type=res.data.noise_type,
								this.po_emit_prove_index_data1=res.data.po_emit_prove_index;
					} else {
						this.$toast('获取指标类型选择列表出错')
					}
				})
			},
			async nextaction(){
				await this.third_enterpriseSelect();
				await this.getModelInfo();
				await this.handleLimitvalue();
			},

			delFs(index){
				this.form.po_emit_prove_index_array1.splice(index,1);
			},
			delFs2(index){
				this.form.po_emit_prove_index_array2.splice(index,1);
			},
			delFs3(index){
				this.form.po_emit_prove_index_array3.splice(index,1);
			},
			delFs4(index){
				this.form.po_emit_prove_index_array4.splice(index,1);
			},
			delFs5(index){
				this.form.po_emit_prove_index_array5.splice(index,1);
			},
			choseOne(item2,index1){
				console.log(item2);
				console.log(index1);
				this.add_index=true;
				this.index_title='排污监测点数据';
				this.water_index=index1;
				this.index_type=index1.toString()+'water';
			},
			delFszb(item3,index3){
				if(item3.index_type==31){
					// this.form.water_waste_total[item3.water_index].wa_tr_fa_index_array.splice(item.index,1);
				}else if(item3.index_type==33){
					// this.ga_tr_fa_index_array.splice(item.index,1);
				}else if(item3.index_type==35){
					// this.dangerous_waste_index_array.splice(params.index,1);
				}else if(item3.index_type.toString().indexOf('water')!=-1){
					let index=parseInt(item3.index_type);
					this.form.water_waste_total[item3.water_index].wastewater_total[index].index_array.splice(index3,1);
				}else if(item3.index_type.toString().indexOf('gas')!=-1){
					console.log(1212);
					let index=parseInt(item3.index_type);
					this.form.wastegas_total[index].index_array.splice(index3,1);
				}
			},
			//获取企业选择列表
			async enterpriseSelect(){
				let res = await enterpriseSelect()
				if (res.errno) {
					this.$toast('获取企业选择列表出错')
				} else {
					console.log(res.data);
					this.enterpriseData=res.data
				}
			},

			//获取模板信息
			getModelInfo(){
				let data={
					id:this.enterprise_id
				};
				getmodel(data).then(res=>{
					if(res.errno==0){
						if(res.data!='暂无数据'){
							for (let i in res.data) {
								if(i == 'waste_water_total') {
									continue
								}
								// if(i == 'factory_length') {
								//   this.form[i] = res.data[i]>0?res.data[i]:100
								//   continue
								// }
								this.form[i] = res.data[i]
							}
							if(this.form.affect_book==1){
								this.show1 =true
								this.form.test = 1
								this.form.unit_name=res.data.affect_book_info.unit_name;
								this.form.unit_prove=res.data.affect_book_info.unit_prove || [];
								this.form.register_name=res.data.affect_book_info.register_name;
								this.form.register_code=res.data.affect_book_info.register_code;
								this.form.book_type=res.data.affect_book_info.book_type;
								this.form.book_date=res.data.affect_book_info.book_date;
								this.form.affect_book_attach=res.data.affect_book_info.attach || [];
								this.form.affect_book_other_attach=res.data.affect_book_info.other_attach || [];
								this.form.po_emit_prove_index_array=res.data.affect_book_info.po_emit_prove_index_array || [];
							};
							if(this.form.department_reply==1){
								this.show2 =true
								this.form.department_reply_name=res.data.department_reply_info.department_reply_name;
								this.form.reply_code=res.data.department_reply_info.reply_code;
								this.form.reply_date=res.data.department_reply_info.reply_date;
								this.form.department_reply_attach=res.data.department_reply_info.attach || [];
								this.form.department_reply_other_attach=res.data.department_reply_info.other_attach || [];
							};
							if(this.form.check_accept==1){
								this.show3 =true
								this.form.check_accept_name=res.data.check_accept_info.check_accept_name;
								this.form.check_accept_date=res.data.check_accept_info.check_accept_date;
								this.form.check_accept_attach=res.data.check_accept_info.attach || [];
							};
							if(this.form.waste_water==1){
								this.show4 =true
								this.form.water_waste_total=res.data.waste_water_total
							};
							if(this.form.waste_gas==1){
								this.show5 =true
								this.form.wastegas_total=res.data.waste_gas_info.wastegas_total_info
							};
							if(this.form.solid_waste==1){
								this.show6 =true
								this.form.solid_total_info=res.data.solid_total_info;
								for (let index in res.data.solid_total_info) {
									this.form.solid_total_info[index].type_id = parseInt(res.data.solid_total_info[index].type_id)
								}
							};
							if(this.form.dangerous_waste==1){
								this.show7 =true
								this.form.dangerous_waste_total=res.data.dangerous_waste_total;
								this.form.dangerous_attach = JSON.parse(res.data.dangerous_attach) || []
							};
							if(this.form.noise==1){
								this.show8 =true
								this.form.noise_list=res.data.noise_list
							};
						}
					}else{
						this.$Notice.error({
							title: '获取信息出错',
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},

			//保存模板信息
			savemodel(){
				if(!this.enterprise_id){
					debugger
					// this.$Notice.error({
					// 	title: '请选择企业',
					// 	duration: this.$parent.getInfoFailTime
					// });
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
								this.$Notice.success({
									title: '保存成功',
									duration: this.$parent.successTime
								});
								if(!sessionStorage.getItem('set_level_3')){
									sessionStorage.setItem('per',JSON.stringify(this.level_3_access))
									sessionStorage.setItem('set_level_3',true)
									this.$router.push({
										name:'home'
									})
									alert('权限更新！')
									this.$router.go(0)
								}
							}else{
								this.$Notice.error({
									title: '保存失败',
									desc: res.errmsg,
									duration: this.$parent.getInfoFailTime
								});
							}
						})
					} else {
						this.$Message.error('请查看信息是否填写完整！');
					}
				})
			},
			//排污许可证阈值
			handleLimitvalue(){
				let data={
					enterprise_id:this.enterprise_id
				}
				limitValue(data).then(res => {
					if (res.errno==0) {
						this.limit_value=JSON.parse(res.data.index_array);
						for(var i in this.limit_value){
							if(this.limit_value[i].pe_index==1){
								this.form.po_emit_prove_index_array1.push(this.limit_value[i])
							}else if(this.limit_value[i].pe_index==2){
								this.form.po_emit_prove_index_array2.push(this.limit_value[i])
							}else if(this.limit_value[i].pe_index==3){
								this.form.po_emit_prove_index_array3.push(this.limit_value[i])
							}else if(this.limit_value[i].pe_index==4){
								this.form.po_emit_prove_index_array4.push(this.limit_value[i])
							}else{
								this.form.po_emit_prove_index_array5.push(this.limit_value[i])
							}
						}
					}
				})
			},
			//第三方企业选择列表
			third_enterpriseSelect(){
				let data={
					enterprise_id:this.enterprise_id
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

			//获取固废总量阈值
			get_solid_total_limit(value,index){
				let label = value.label;
				var a=0;
				for(var j in this.form.po_emit_prove_index_array3){
					if(this.form.po_emit_prove_index_array3[j].name==label){
						this.form.solid_total_info[index].total_limit=this.form.po_emit_prove_index_array3[j].total;
						this.form.solid_total_info[index].standard=this.form.po_emit_prove_index_array3[j].standard;
						a=1
					}
				};
				if(a==0){
					this.form.solid_total_info[index].total_limit='';
					this.form.solid_total_info[index].standard='';
				}
			},

			//获取危险物总量阈值
			get_dangerous_total_limit(value,index){
				let label = value.label;
				console.log(label)
				var a=0;
				for(var j in this.form.po_emit_prove_index_array4){
					if(this.form.po_emit_prove_index_array4[j].name==label){
						this.form.dangerous_waste_total[index].total_limit=this.form.po_emit_prove_index_array4[j].total;
						this.form.dangerous_waste_total[index].standard=this.form.po_emit_prove_index_array4[j].standard;
						a=1;
					}
				};
				if(a==0){
					this.form.dangerous_waste_total[index].total_limit='';
					this.form.dangerous_waste_total[index].standard=''
				}
			},

			//获取噪音阈值
			get_noise_limit(a,b){
				if(a){
					let label=a.label;
					var a=0;
					for(var j in this.form.po_emit_prove_index_array5){
						if(this.form.po_emit_prove_index_array5[j].name==label){
							this.form.noise_list[b].limit_day=this.form.po_emit_prove_index_array5[j].day_noise;
							this.form.noise_list[b].limit_night=this.form.po_emit_prove_index_array5[j].night_noise;
							this.form.noise_list[b].standard=this.form.po_emit_prove_index_array5[j].standard;
							a=1;
							break;
						}
					};
					if(a==0){
						this.form.noise_list[b].limit_day='';
						this.form.noise_list[b].limit_night='';
						this.form.noise_list[b].standard='';
					}
				}
			},

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
			add_total(e,index){
				// console.log(index);
				if(e=='water_waste'){
					let data={
						type_id:'',
						wa_tr_fa:0,
						wa_tr_fa_index_array:[],
						wa_tr_fa_attach:[],
						ou_wa_fa:0,
						ou_wa_fa_attach:[],
						third_enterprise_id:'',
						wastewater_total:[]
					};
					this.form.water_waste_total.push(data);
					this.add_total('water',this.form.water_waste_total.length-1)
				}else if(e=='water'){
					let data={
						outfall_name:'',
						count:0,
						index_array:[],
					};
					this.form.water_waste_total[index].wastewater_total.push(data);
				}else if(e=='gas'){
					let data={
						vent_name:'',
						count:0,
						index_array:[],
					};
					this.form.wastegas_total.push(data);
				}else if(e=='dangerous'){
					let data={
						name:'',
						type_id:[],
						third_enterprise_id:''
					};
					this.form.dangerous_waste_total.push(data);
				}else if(e=='year_month'){
					if(!this.year_month){
						this.$Notice.error({
							title: '请选择年月',
							duration: this.$parent.getInfoFailTime
						});
						return;
					};
					let data={
						year_month:this.year_month,
						output_value:'',
						pay_taxes:'',
						use_water:'',
						use_electricity:'',
					};
					this.quarter_info_base.push(data);
				}else if(e=='solid_total_info'){
					let data={
						type_id:0,
						solid_type:'',
						name:'',
						total_limit:'',
						standard:'',
						third_enterprise_id:''
					};
					this.form.solid_total_info.push(data);
				}else if(e=='noise'){
					let data={
						type_id:'',
						name:'',
						num:'',
						standard:'',
						limit:'',
					};
					this.form.noise_list.push(data);
				}
			},
			delete_total(e,index,index1){
				if(e=='water_waste'){
					this.form.water_waste_total.splice(index,1);
				}else if(e=='water'){
					this.form.water_waste_total[index].wastewater_total.splice(index1,1);
				}else if(e=='gas'){
					this.form.wastegas_total.splice(index,1);
				}else if(e=='dangerous'){
					this.form.dangerous_waste_total.splice(index,1);
				}else if(e=='year_month'){
					this.quarter_info_base.splice(index,1);
				}else if(e=='solid_total_info'){
					this.form.solid_total_info.splice(index,1);
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
					this.form.water_waste_total[this.water_index].wa_tr_fa_index_array.push(index_array)
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
					for(var j in this.form.po_emit_prove_index_array1){
						if(this.form.po_emit_prove_index_array1[j].name==this.name){
							index_array.limit_value=this.form.po_emit_prove_index_array1[j].density;
							index_array.standard=this.form.po_emit_prove_index_array1[j].standard
							index_array.speed = this.form.po_emit_prove_index_array1[j].speed
							index_array.year_total = this.form.po_emit_prove_index_array1[j].total
						}
					}
					this.form.water_waste_total[this.water_index].wastewater_total[index].index_array.push(index_array)
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
					for(var j in this.form.po_emit_prove_index_array2){
						if(this.form.po_emit_prove_index_array2[j].name==this.name){
							index_array.limit_value=this.form.po_emit_prove_index_array2[j].density;
							index_array.standard=this.form.po_emit_prove_index_array2[j].standard
							index_array.speed = this.form.po_emit_prove_index_array2[j].speed
							index_array.year_total = this.form.po_emit_prove_index_array2[j].total
						}
					}
					this.form.wastegas_total[index].index_array.push(index_array)
				};
				this.id='';
				this.name='';
				this.total=0;
				this.density=0;
				this.speed=0;
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
				if(this.attach_type==1){
					//环评单位资质证书
					this.form.unit_prove.push(data)
				}else if(this.attach_type==2){
					//环境影响报告书
					this.form.affect_book_attach.push(data);
				}else if(this.attach_type==3){
					//环境影响其他附件
					this.form.affect_book_other_attach.push(data);
				}else if(this.attach_type==4){
					//环保部门批复书
					this.form.department_reply_attach.push(data)
				}else if(this.attach_type==5){
					//环保部门批复其他附件
					this.form.department_reply_other_attach.push(data)
				}else if(this.attach_type==6){
					//环评验收
					this.form.check_accept_attach.push(data);
				} else if (this.attach_type==7) {
					this.form.dangerous_attach.push(data)
				}else if(this.attach_type==31){
					if(!this.form.water_waste_total[this.water_attach].wa_tr_fa_attach){
						this.form.water_waste_total[this.water_attach].wa_tr_fa_attach=[];
					};
					this.form.water_waste_total[this.water_attach].wa_tr_fa_attach.push(data);
				}else if(this.attach_type==32){
					if(!this.form.water_waste_total[this.water_attach].ou_wa_fa_attach){
						this.form.water_waste_total[this.water_attach].ou_wa_fa_attach=[];
					};
					this.form.water_waste_total[this.water_attach].ou_wa_fa_attach.push(data);
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
					this.form.dangerous_waste_total[index].attach.push(data)
				};
				this.attach_name='';
				this.attach_url='';
				this.water_attach=''
			},

			addData2(){
				let data={
					name:this.noise_name,
					value:this.noise_value
				};
				this.form.noise_list.push(data);
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

			update_outfall_count(index,index1){
				let speed=this.form.water_waste_total[index].wastewater_total[index1].count;
				let data=this.form.water_waste_total[index].wastewater_total[index1].outfall_count;
				for(var i in data){
					if(!data[i].hours){
						data[i].hours=0;
					};
					let total_count=speed*data[i].hours;
					data[i].total=total_count.toFixed(2);
				};
				this.form.water_waste_total[index].wastewater_total[index1].outfall_count=data;
			},

			update_gas_outfall_count(index){
				let speed=this.form.wastegas_total[index].count;
				let data=this.form.wastegas_total[index].outfall_count;
				for(var i in data){
					if(!data[i].hours){
						data[i].hours=0;
					};
					let total_count=speed*data[i].hours;
					data[i].total=total_count.toFixed(2);
				};
				this.form.wastegas_total[index].outfall_count=data;
			},

			//报告书指标插入数据
			addindexData(){
				let index_array={
					id:this.id,
					name:this.name,
					index_value:this.index_value,
					pe_index:this.pe_index,
					remarks:this.remarks,
					day_noise:this.day_noise,
					night_noise:this.night_noise,
					total:this.total,
					standard:this.standard,
					density:this.density,
					speed:this.speed,
					waste_type:this.waste_type,
					solid_type:this.solid_type
				};
				if(this.pe_index==1){
					this.form.po_emit_prove_index_array1.push(index_array);
				}else if(this.pe_index==2){
					this.form.po_emit_prove_index_array2.push(index_array);
				}else if(this.pe_index==3){
					this.form.po_emit_prove_index_array3.push(index_array);
				}else if(this.pe_index==4){
					this.form.po_emit_prove_index_array4.push(index_array);
				}else{
					this.form.po_emit_prove_index_array5.push(index_array);
				};
				// this.po_emit_prove_index_array.push(index_array);
				// //虽未保存，要更新数组
				// this.limit_value=this.po_emit_prove_index_array
				this.id='';
				this.name='';
				this.total=0;
				this.density=0;
				this.speed=0;
				this.standard='';
				this.noise=0;
				this.waste_type='';
				this.solid_type="";

			},

			changedata(e){
				let data=[];
				for(var i in this.po_emit_prove_index_data1){
					if(this.po_emit_prove_index_data1[i].type==e){
						data.push(this.po_emit_prove_index_data1[i])
					}
				};
				this.po_emit_prove_index_data=data;
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
			computecount(e){
				if(e){
					this.form.noise_list=[];
					var count=e%100==0?(e/100):(Math.floor(e/100)+1);
					for(var i=0;i<count;i++){
						this.add_total('noise')
					}
				}
			},
			onChange1(e){
				if(e===1){
					this.show1 = true
				}
			},
			hidden(item){
				if(item===1){
					this.show1= false
				}
			}

		},
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
			/*padding: 50px 44px;*/
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
				margin: 0 20px;
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
</style>
