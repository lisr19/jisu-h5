<template>
	<div class="page">
		<head-bar title="其他环保手续"></head-bar>
		<p style="margin-bottom: 1px;display: flex;align-items: center;background-color: #fff;padding:15px">
			<span style="width: 80px">企业：</span>
			<i-select v-model="form.enterprise_id"  >
				<i-option v-for="item in enterpriseData" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
			</i-select>
		</p>
		<p style="margin-bottom: 10px;display: flex;align-items: center;background-color: #fff;padding:5px 10px">
			<span style="width: 80px">年份：</span>
			<i-input  readonly  v-model="form.year" placeholder="请选择年份"  @on-focus="openDate('year')"></i-input>
<!--			<DatePicker type="year" placeholder="请选择年份"  @on-change="form.year=$event" :value="form.year" value-format="yyyy"></DatePicker>-->
		</p>

		<div class="content">
			<Form ref="form" :model="form" >
				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png"  v-if="form.po_emit_prove==1&&!show1" @click="show1=true" alt="">
					<p>1、是否有污染物排放许可证</p>
					<RadioGroup v-model="form.po_emit_prove">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card" >
					<div class="w-card" v-if="form.po_emit_prove==1&&show1">
						<FormItem  label="" prop="po_emit_prove"  >
							<div style="margin: 0">
								<p style="margin-bottom:5px">
									<span>发证部门：</span>
									<Input type="text" placeholder="请输入发证部门全称" v-model="prove_department_name" ></Input>
								</p>
								<p style="margin-bottom:5px">
									<span>证书编号：</span>
									<Input type="text" placeholder="请输入证书编号" v-model="prove_department_code" ></Input>
								</p>
								<!-- 废水表格 -->
								<Row type="flex" justify="center" v-if="wasteWater">
									<Col span="6"><h2 style="text-align:center;">废水表格</h2></Col>
								</Row>
								<div class="item-card" v-for="(item,index) in wasteWater">
									<p class="name">{{index+1}} 、{{item.name}}
<!--										<span @click="delFs(index)">删除</span>-->
									</p>
									<p>类型：废水</p>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>排放浓度(mg/l)：{{item.density}}</p>
									<p>排放速率(m³/h)：{{item.speed}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>

<!--								<Table border highlight-row size="small" :columns="columns_wasteWater" :data="wasteWater" v-if="wasteWater.length>0" style="margin-top:10px"></Table>-->
								<!-- 废气表格 -->
								<Row type="flex" justify="center" v-if="wasteGas">
									<Col span="6"><h2 style="text-align:center;">废气表格</h2></Col>
								</Row>

								<div class="item-card" v-for="(item,index) in wasteGas">
									<p class="name">{{index+1}} 、{{item.name}}
<!--										<span @click="delFs2(index)">删除</span>-->
									</p>
									<p>类型：废气</p>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>排放浓度(mg/l)：{{item.density}}</p>
									<p>排放速率(m³/h)：{{item.speed}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>

<!--								<Table border highlight-row size="small" :columns="columns_wasteGas" :data="wasteGas" v-if="wasteGas.length>0" style="margin-top:10px"></Table>-->
								<!-- 废固表格 -->
								<Row type="flex" justify="center" v-if="wasteSolid">
									<Col span="6"><h2 style="text-align:center;">废固表格</h2></Col>
								</Row>
								<div class="item-card" v-for="(item,index) in wasteSolid">
								<p class="name">{{index+1}} 、{{item.name}}</p>
								<p>类型：废固</p>
								<p>年排污总量(Kg)：{{item.total}}</p>
								<p>执行标准：{{item.standard}}</p>
							</div>
<!--								<Table border highlight-row size="small" :columns="columns_wasteSolid" :data="wasteSolid" v-if="wasteSolid.length>0" style="margin-top:10px"></Table>-->
								<!-- 噪音表格 -->
								<Row type="flex" justify="center" v-if="noise_emission">
									<Col span="6"><h2 style="text-align:center;">噪音表格</h2></Col>
								</Row>
								<div class="item-card" v-for="(item,index) in noise_emission">
									<p class="name">{{index+1}} 、{{item.name}}</p>
									<p>类型：噪音</p>
									<p>昼间噪音(dB)：{{item.day_noise}}</p>
									<p>夜间噪音(dB)：{{item.night_noise}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>
<!--								<Table border highlight-row size="small" :columns="columns_noise" :data="noise_emission" v-if="noise_emission.length>0" style="margin-top:10px"></Table>-->
								<!-- 危废表格 -->
								<Row type="flex" justify="center" v-if="wasteDanger">
									<Col span="6"><h2 style="text-align:center;">危废表格</h2></Col>
								</Row>
								<div class="item-card" v-for="(item,index) in wasteDanger">
									<p class="name">{{index+1}} 、{{item.name}}</p>
									<p>年排污总量(Kg)：{{item.total}}</p>
									<p>执行标准：{{item.standard}}</p>
								</div>

<!--								<Table border highlight-row size="small" :columns="columns_wasteDanger" :data="wasteDanger" v-if="wasteDanger.length>0" style="margin-top:10px"></Table>-->
								<div style="margin-top:5px;margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=4;attach_title='污染物排放许可证（正本、副本）扫描件';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">污染物排放许可证（正本、副本）扫描件</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="po_emit_prove_attach"></Table>
								<div  class="fold"  style="margin-top: 30px">
									<img src="@/assets/img/uptwo.png"  @click="show1=false" alt="">
								</div>
							</div>
						</FormItem>
					</div>

				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.ra_safe_prove==1&&!show2" @click="show2=true" alt="">
					<p >2、是否有辐射安全许可证</p>
					<RadioGroup v-model="form.ra_safe_prove">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.ra_safe_prove==1&&show2">
						<span>发证部门：</span>
						<Input type="text" placeholder="请输入发证部门全称" v-model="ra_safe_name" ></Input>
						<div style="margin-bottom:5px">
							<Button type="primary" class="button1" @click="attach_type=5;attach_title='辐射安全许可证（正本、副本）扫描件';add_attach=true" style="width:100px">添加附件</Button>
							<p style="color:red">辐射安全许可证（正本、副本）扫描件</p>
						</div>
						<Table border highlight-row size="small" :columns="columns_attach" :data="ra_safe_prove_attach"></Table>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show2=false" alt="">
						</div>
					</div>
				</div>
				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.drainage_prove==1&&!show3" @click="show3=true" alt="">
					<p >3、是否有排水许可证</p>
					<RadioGroup v-model="form.drainage_prove">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.drainage_prove==1&&show3">
						<FormItem label="" prop="drainage_prove" >
							<div>
								<span>发证部门：</span>
								<Input type="text" placeholder="请输入发证部门全称" v-model="drainage_prove_department_name"  style="width:200px"></Input>
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=6;attach_title='排水证扫描件';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">排水证扫描件</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="drainage_prove_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show3=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.em_manager==1&&!show4" @click="show4=true" alt="">
					<p >4、是否有环境应急预案</p>
					<RadioGroup v-model="form.em_manager">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.em_manager==1&&show4">
						<FormItem label="" prop="em_manager"  >
							<div>
								<span>预案编制单位：</span>
								<Input type="text" placeholder="请输入预案编制单位全称" v-model="em_manager_department_name" style="width:200px"></Input>
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=7;attach_title='企业突发性环境污染事故应急预案';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">企业突发性环境污染事故应急预案</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="em_manager_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show4=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.se_ou_manager==1&&!show5" @click="show5=true" alt="">
					<p >5、是否规范排污口管理</p>
					<RadioGroup v-model="form.se_ou_manager">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
						<Radio :label="2" border>无</Radio>
					</RadioGroup>
				</div>
				<div  class="inner-card">
					<div class="w-card" v-if="form.se_ou_manager==1&&show5">
						<FormItem label="" prop="se_ou_manager" >
							<div v-if="form.se_ou_manager==1">
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=8;attach_title='排污口标志照片（废水/废气/噪声）';add_attach=true" style="width:100px">添加照片</Button>
									<p style="color:red">排污口标志照片（废水/废气/噪声）</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="se_ou_manager_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show5=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.cl_pr_manager==1&&!show6" @click="show6=true" alt="">
					<p >6、是否清洁生产管理</p>
					<RadioGroup v-model="form.cl_pr_manager">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.cl_pr_manager==1&&show6">
						<FormItem label="" prop="cl_pr_manager" >
							<div>
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=9;attach_title='上传附件';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">纳入重点企业清洁生产（强制性）的通知公告、企业清洁生产（包括自愿性）审核验收（评估）报告、有关部门对通过清洁生产审核企业的公告文件等佐证材料</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="cl_pr_manager_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show6=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.po_co_fa==1&&!show7" @click="show7=true" alt="">
					<p >7、是否有污染治理设施</p>
					<RadioGroup v-model="form.po_co_fa">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.po_co_fa==1&&show7">
						<FormItem label="" prop="po_co_fa" >
							<div >
								<span>设施名称：</span>
								<Input type="text" placeholder="请输入设施名称" v-model="po_co_fa_facilities_name"></Input>
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=10;attach_title='主要污染物治理设施方案';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">主要污染物治理设施方案</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="po_co_fa_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show7=false" alt="">
						</div>
					</div>
				</div>


				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.ba_pr_power==1&&!show8" @click="show8=true" alt="">
					<p >8、是否有淘汰落后产能</p>
					<RadioGroup v-model="form.ba_pr_power">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.ba_pr_power==1&&show8">
						<FormItem label="" prop="ba_pr_power" >
							<div >
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=11;attach_title='企业关停证明材料';add_attach=true" style="width:100px">添加附件</Button>
									<p style="color:red">企业关停证明材料</p>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="ba_pr_power_attach"></Table>
							</div>
						</FormItem>

						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show8=false" alt="">
						</div>
					</div>
				</div>

				<div class="card">
					<img class="icon-down" src="@/assets/img/down2.png" v-if="form.other_data==1&&!show9" @click="show9=true" alt="">
					<p >9、是否有其他数据</p>
					<RadioGroup v-model="form.other_data">
						<Radio :label="0" border>否</Radio>
						<Radio :label="1" border>是</Radio>
					</RadioGroup>
				</div>
				<div class="inner-card">
					<div class="w-card" v-if="form.other_data==1&&show9">
						<FormItem label="" prop="other_data" >
							<div>
								<div style="margin-bottom:5px">
									<Button type="primary" class="button1" @click="attach_type=12;attach_title='其他数据';add_attach=true" style="width:100px">添加附件</Button>
								</div>
								<Table border highlight-row size="small" :columns="columns_attach" :data="other_data_attach"></Table>
							</div>
						</FormItem>
						<div  class="fold"  style="margin-top: 30px">
							<img src="@/assets/img/uptwo.png"  @click="show9=false" alt="">
						</div>
					</div>
				</div>
			</Form>
		</div>




		<Modal v-model="add_index" :title="index_title" @on-ok="addData()">
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">指标类型：</p>
				<Select  style="width:200px" v-model="waste_type" @on-change="changedata" >
					<Option :value="1" >废水</Option>
					<Option :value="2" >废气</Option>
					<Option :value="3" >固废</Option>
					<Option :value="4" >危废</Option>
					<Option :value="5" >噪音</Option>
				</Select>
			</div>
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">名称：</p>
				<Select  v-show="index_type==4" v-model="id"  :label-in-value="true" style="width:200px" @on-change="all_index_change" >
					<Option v-for="(item,index) in po_emit_prove_index_data" v-bind:key="index" :value="item.id" :label="item.name"></Option>
				</Select>
			</div>
			<div style="margin-bottom:10px" >
				<p style="width:80px;float:left;line-height:30px;text-align:right">执行标准：</p>
				<Input placeholder="请输入执行标准名称及标准号" v-model="standard" style="width:200px"></Input>
			</div>
			<div style="margin-bottom:10px" v-if="waste_type==5">
				<p style="width:80px;float:left;line-height:30px;text-align:right">噪音：</p>
				<InputNumber placeholder="请输入噪音限值" v-model="noise" style="width:150px"></InputNumber>dB
			</div>
			<div style="margin-bottom:10px" v-if="waste_type!=5">
				<p style="width:80px;float:left;line-height:30px;text-align:right">年排污总量：</p>
				<InputNumber placeholder="请输入年排污总量" v-model="total" style="width:150px"></InputNumber>
				<span v-if="waste_type==1||waste_type==2">kg</span><span v-else>t</span>
			</div>
			<div style="margin-bottom:10px" v-if="waste_type==1||waste_type==2">
				<p style="width:80px;float:left;line-height:30px;text-align:right">排放浓度：</p>
				<InputNumber  placeholder="请输入排放浓度" v-model="density" style="width:150px"></InputNumber>
				<span v-if="waste_type==1">mg/l</span><span v-else>mg/m³</span>
			</div>
			<div style="margin-bottom:10px" v-if="waste_type==1||waste_type==2">
				<p style="width:80px;float:left;line-height:30px;text-align:right" >排放速率：</p>
				<InputNumber  placeholder="请输入排放速率" v-model="speed" style="width:150px"></InputNumber>m³/h
			</div>
		</Modal>

		<Modal v-model="add_attach" :title="attach_title" @on-ok="adddata1">
			<Input type="text" placeholder="请输入文件名" v-model="attach_name" style="width:100%"></Input>
			<i-input  readonly  v-model="start_time" placeholder="文件生成日期"  @on-focus="openDate('start_time')"></i-input>
			<i-input  readonly  v-model="end_time" placeholder="文件截止有效期"  @on-focus="openDate('end_time')"></i-input>
<!--			<DatePicker type="date" placeholder="文件生成日期" style="width: 30%;margin-top:10px" @on-change="start_time=$event" :value="start_time" value-format="yyyy-MM-dd" ></DatePicker>-->
<!--			<DatePicker type="date" placeholder="文件截止有效期" style="width: 30%;margin-top:10px" @on-change="end_time=$event" :value="end_time" value-format="yyyy-MM-dd" ></DatePicker>-->
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
			<Input type="textarea" :rows="3" placeholder="备注"  v-model="remarks" style="margin-top:10px"></Input>
		</Modal>

		<div v-if="isAdd" class="btn" @click="handleAdd">新增</div>
		<div v-else class="btn" @click="handleUpdate">保存</div>

		<van-popup v-model="showDate" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker
					v-model="currentDate"
					type="date"
					:min-date="minDate"
					:formatter="formatter"
					@confirm="confirmPicker()"
					@cancel="cancleDate"
			/>
		</van-popup>

		<van-popup v-model="showYear" position="bottom" :style="{ height: '40%' }">
			<van-picker
					show-toolbar
					title="年份"
					:default-index="selectYear"
					:columns="columnsYear"
					@cancel="showYear = false"
					@confirm="confirmYear"
			/>
		</van-popup>

	</div>
</template>

<script>
	import {procedureDetail,procedureAdd,procedureUpdate,procedureDelete,getProcedureEp} from '@/lib/API/otherEia';
	import {select, enterpriseSelect} from '@/lib/API/model';
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
			//可操作
			canChange() {
				return true;
			},
			//可添加
			canAdd() {
				if (this.$route.query.id == 0) {
					return true;
				} else {
					return false;
				}
			},
			//可保存
			canSave() {
				if (this.$route.query.id != 0) {
					return true;
				} else {
					return false;
				}
			},
			//可删除
			canDelete() {
				if (this.$route.query.id != 0) {
					return true;
				} else {
					return false;
				}
			},
			//上传
			uploadList() {
				return this.$refs.upload ? this.$refs.upload.fileList : [];
			}
		},
		data() {
			return {
				columnsYear: ['2015', '2016','2017', '2018', '2019', '2020'],
				showDate:false,
				showYear:false,
				currentDate: new Date(),
				selectYear: 1000,
				currentYear: new Date().getFullYear(),
				currentType:'',
				minDate: new Date(1950, 0, 1),
				isAdd:true,
				show1:false,
				show2:false,
				show3:false,
				show4:false,
				show5:false,
				show6:false,
				show7:false,
				show8:false,
				show9:false,
				baseURL: Config.baseURL,
				//指标类型
				waste_type:'',
				po_emit_prove_index_data:[],
				po_emit_prove_index_data1:[],

				//各个污染物分类
				wasteWater:[],
				wasteGas:[],
				wasteSolid:[],
				wasteDanger:[],
				noise_emission:[],

				enterpriseData:[],
				form:{
					enterprise_id:'',
					year:'',
					affect_book:0,
					department_reply:0,
					check_accept:0,
					po_emit_prove:0,
					ra_safe_prove:0,
					drainage_prove:0,
					em_manager:0,
					se_ou_manager:0,
					cl_pr_manager:0,
					po_co_fa:0,
					ba_pr_power:0,
					other_data:0
				},
				affect_book_attach:[],
				department_reply_name:'',
				department_reply_attach:[],
				check_accept_attach:[],
				po_emit_prove_index_array:[],
				prove_department_name:'',
				prove_department_code:'',
				po_emit_prove_attach:[],
				ra_safe_name:'',
				ra_safe_prove_attach:[],
				drainage_prove_department_name:'',
				drainage_prove_attach:[],
				em_manager_department_name:'',
				em_manager_attach:[],
				se_ou_manager_attach:[],
				cl_pr_manager_attach:[],
				po_co_fa_facilities_name:'',
				po_co_fa_attach:[],
				ba_pr_power_attach:[],
				other_data_attach:[],

				//model指标绑定
				id:'',
				name:'',
				standard:'',
				noise:0,
				total:0,
				density:0,
				speed:0,

				//model指标绑定
				attach_name:'',
				start_time:'',
				end_time:'',
				attach_url:'',
				remarks:'',

				columns_wasteWater: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '类型',
						align: 'center',
						render:(h,params)=>{
							return h('div', [
								h('span',{},'废水'),
							]);
							// }else if(this.po_emit_prove_index_array[params.index].pe_index==2){
							//     return h('div', [
							//       h('span',{},'废气'),
							//   ]);
							// }else if(this.po_emit_prove_index_array[params.index].pe_index==3){
							//     return h('div', [
							//       h('span',{},'固废'),
							//   ]);
							// }else if(this.po_emit_prove_index_array[params.index].pe_index==4){
							//     return h('div', [
							//       h('span',{},'危废'),
							//   ]);
							// }else{
							//     return h('div', [
							//         h('span',{},'噪音'),
							//     ]);
							// }
						}
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
														this.po_emit_prove_index_array.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_wasteGas: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '类型',
						align: 'center',
						render:(h,params)=>{
							return h('div', [
								h('span',{},'废气'),
							]);
						}
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
														this.po_emit_prove_index_array.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_wasteSolid: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '类型',
						align: 'center',
						render:(h,params)=>{
							return h('div', [
								h('span',{},'固废'),
							]);
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
														this.po_emit_prove_index_array.splice(params.index,1);
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
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '类型',
						align: 'center',
						render:(h,params)=>{
							return h('div', [
								h('span',{},'噪音'),
							]);
						}
					},
					{
						title: '噪音(dB)',
						key:'noise',
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
														this.po_emit_prove_index_array.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_wasteDanger: [{
					title: '名称',
					key:'name',
					align: 'center',
				},
					{
						title: '类型',
						align: 'center',
						render:(h,params)=>{
							return h('div', [
								h('span',{},'危废'),
							]);
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
														this.po_emit_prove_index_array.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				columns_attach: [
					// {
					// 	title: '序号',
					// 	type:'index',
					// 	align: 'center',
					// 	width:50
					// },
					{
						title: '文件名',
						key:'name',
						align: 'center',
					},
					// {
					// 	title: '生成日期',
					// 	key:'start_time',
					// 	align: 'center',
					// },
					// {
					// 	title: '截止有效期',
					// 	key:'end_time',
					// 	align: 'center',
					// },
					{
						title: '备注',
						key:'remarks',
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
															this.affect_book_attach.splice(params.index,1);
														}else if(params.row.attach_type==2){
															this.department_reply_attach.splice(params.index,1);
														}else if(params.row.attach_type==3){
															this.check_accept_attach.splice(params.index,1);
														}else if(params.row.attach_type==4){
															this.po_emit_prove_attach.splice(params.index,1);
														}else if(params.row.attach_type==5){
															this.ra_safe_prove_attach.splice(params.index,1);
														}else if(params.row.attach_type==6){
															this.drainage_prove_attach.splice(params.index,1);
														}else if(params.row.attach_type==7){
															this.em_manager_attach.splice(params.index,1);
														}else if(params.row.attach_type==8){
															this.se_ou_manager_attach.splice(params.index,1);
														}else if(params.row.attach_type==9){
															this.cl_pr_manager_attach.splice(params.index,1);
														}else if(params.row.attach_type==10){
															this.po_co_fa_attach.splice(params.index,1);
														}else if(params.row.attach_type==11){
															this.ba_pr_power_attach.splice(params.index,1);
														}else if(params.row.attach_type==12){
															this.other_data_attach.splice(params.index,1);
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

				//弹出指标选择框
				index_type:'',
				index_title:'',
				add_index:false,

				//弹出附件上传
				attach_type:'',
				attach_title:'',
				add_attach:false,

				headers: {},
				deleteModal: false,
				inputError: false,

				type:'',
				uploadmodel:false,
			}
		},
		created() {
			let arr2 = new Array();
			for(let i=1950;i<this.currentYear+1;i++){
				arr2.push(i);
			}
			this.columnsYear = arr2
			setTimeout(()=>{
				if(this.form.year){
					this.selectYear =this.form.year-1950
				}
			},500)
		},
		mounted(){
			this.getselectdata();

			//不属于企业账户获取企业列表
			this.handleGetenterpriseList();
			if (this.$route.query.id) {
				this.isAdd =false
				this.handleGetInfo();
			}
			//上传验证
			this.headers.Authorization = sessionStorage.token;

		},
		methods: {
			openDate(type){
				if(type==='year'){
					this.showYear =  true
				}else {
					this.currentType = type
					this.showDate =  true
				}
			},
			confirmYear(value){
				this.form.year = value
				this.showYear = false
			},
			formatter(type, val) {
				if (type === 'year') {
					return `${val}年`;
				} else if (type === 'month') {
					return `${val}月`
				}else if (type === 'day') {
					return `${val}日`
				}
				return val;
			},
			confirmPicker(value) {
				let date = this.currentDate;
				let m = date.getMonth() + 1;
				let d = date.getDate();
				if (m >= 1 && m <= 9) {
					m = "0" + m;
				}
				if (d >= 0 && d <= 9) {
					d = "0" + d;
				}
				let timer = date.getFullYear() + "-" + m + "-" + d
				if(this.currentType==='start_time'){
					this.start_time = timer
				}else if(this.currentType==='end_time'){
					this.end_time = timer
				}
				this.showDate = false
				console.log(timer);
			},
			cancleDate(){
				this.showDate = false
				this.start_time =''
				this.end_time =''
			},
			delFs(index){
				this.po_emit_prove_index_array.splice(index,1);
			},
			delFs2(index){
				this.po_emit_prove_index_array.splice(index,1);
			},
			getselectdata(){
				select().then(res => {
					if (res.errno==0) {
						this.po_emit_prove_index_data1=res.data.po_emit_prove_index;
					} else {
						this.$Notice.error({
							title: '获取指标类型选择列表出错',
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
					}
				})
			},

			//获取指标表格数据
			handleGetProcedureEp(id) {
				let data={
					id
				};
				getProcedureEp(data).then(res => {
					if (res.errno == 0) {
						if (res.data.length>0) {
							let arr = res.data
							for (let i in res.data) {
								if (arr[i].pe_index == 1) {
									this.wasteWater.push({
										name:arr[i].name,
										total:arr[i].total,
										density:arr[i].density,
										speed:arr[i].speed,
										standard:arr[i].standard
									})
								}
								if (arr[i].pe_index == 2) {
									this.wasteGas.push({
										name:arr[i].name,
										total:arr[i].total,
										density:arr[i].density,
										speed:arr[i].speed,
										standard:arr[i].standard
									})
								}
								if (arr[i].pe_index == 3) {
									this.wasteSolid.push({
										name:arr[i].name,
										total:arr[i].total,
										standard:arr[i].standard
									})
								}
								if (arr[i].pe_index == 4) {
									this.wasteDanger.push({
										name:arr[i].name,
										total:arr[i].total,
										density:arr[i].density,
										speed:arr[i].speed,
										standard:arr[i].standard
									})
								}
								if (arr[i].pe_index == 5) {
									this.noise_emission.push({
										name:arr[i].name,
										day_noise:arr[i].day_noise,
										night_noise:arr[i].night_noise,
										standard:arr[i].standard
									})
								}
							}
						}
					}
				})
			},


			//获取信息
			handleGetInfo(){
				let data={
					id:this.$route.query.id
				};
				procedureDetail(data).then(res=>{
					if(res.errno==0){
						if(res.data){
							this.form=res.data;
							this.handleGetProcedureEp(res.data.enterprise_id)
							if(this.form.po_emit_prove==1){
								this.show1 =true
								this.po_emit_prove_index_array=res.data.po_emit_prove_info.index_array;
								this.splitDetailData(this.po_emit_prove_index_array)
							}
							if(this.form.po_emit_prove==1){
								this.show1 =true
								this.prove_department_name=res.data.po_emit_prove_info.prove_department_name;
								this.prove_department_code=res.data.po_emit_prove_info.prove_department_code;
								this.po_emit_prove_attach=JSON.parse(res.data.po_emit_prove_info.attach);
							}
							if(this.form.ra_safe_prove==1){
								this.show2 =true
								this.ra_safe_name=res.data.ra_safe_prove_info.ra_safe_name;
								this.ra_safe_prove_attach=JSON.parse(res.data.ra_safe_prove_info.attach);
							}
							if(this.form.drainage_prove==1){
								this.show3 =true
								this.drainage_prove_department_name=res.data.drainage_prove_info.department_name;
							}
							if(this.form.drainage_prove==1){
								this.show3 =true
								this.drainage_prove_attach=JSON.parse(res.data.drainage_prove_info.attach);
							}
							if(this.form.em_manager==1){
								this.show4 =true
								this.em_manager_department_name=res.data.em_manager_info.department_name;
							}
							if(this.form.em_manager==1){
								this.show4 =true
								this.em_manager_attach=JSON.parse(res.data.em_manager_info.attach);
							}
							if(this.form.se_ou_manager==1){
								this.show5 =true
								this.se_ou_manager_attach=JSON.parse(res.data.se_ou_manager_info.attach);
							}
							if(this.form.cl_pr_manager==1){
								this.show6 =true
								this.cl_pr_manager_attach=JSON.parse(res.data.cl_pr_manager_info.attach);
							}
							if(this.form.po_co_fa==1){
								this.show7 =true
								this.po_co_fa_facilities_name=res.data.po_co_fa_info.facilities_name;
							}
							if(this.form.po_co_fa==1){
								this.show7 =true
								this.po_co_fa_attach=JSON.parse(res.data.po_co_fa_info.attach);
							}
							if(this.form.ba_pr_power==1){
								this.show8 =true
								this.ba_pr_power_attach=JSON.parse(res.data.ba_pr_power_info.attach);
							}
							if(this.form.other_data==1){
								this.show9 =true
								this.other_data_attach=JSON.parse(res.data.other_data_info.attach);
							}
						}
					}else{
						this.$Notice.error({
							title: '获取环保手续信息出错',
							duration: this.$parent.getInfoFailTime
						});
					}
				})
			},
			//新增
			handleAdd(){
				let data={
					enterprise_id:this.form.enterprise_id,
					year:this.form.year,
					affect_book:this.form.affect_book,
					department_reply:this.form.department_reply,
					check_accept:this.form.check_accept,
					po_emit_prove:this.form.po_emit_prove,
					ra_safe_prove:this.form.ra_safe_prove,
					drainage_prove:this.form.drainage_prove,
					em_manager:this.form.em_manager,
					se_ou_manager:this.form.se_ou_manager,
					cl_pr_manager:this.form.cl_pr_manager,
					po_co_fa:this.form.po_co_fa,
					ba_pr_power:this.form.ba_pr_power,
					other_data:this.form.other_data,
					affect_book_index_array:JSON.stringify(this.affect_book_index_array),
					affect_book_attach:JSON.stringify(this.affect_book_attach),
					department_reply_name:this.department_reply_name,
					department_reply_attach:JSON.stringify(this.department_reply_attach),
					check_accept_attach:JSON.stringify(this.check_accept_attach),
					po_emit_prove_index_array:JSON.stringify(this.po_emit_prove_index_array),
					prove_department_name:this.prove_department_name,
					prove_department_code:this.prove_department_code,
					po_emit_prove_attach:JSON.stringify(this.po_emit_prove_attach),
					ra_safe_name:this.ra_safe_name,
					ra_safe_prove_attach:JSON.stringify(this.ra_safe_prove_attach),
					drainage_prove_department_name:this.drainage_prove_department_name,
					drainage_prove_attach:JSON.stringify(this.drainage_prove_attach),
					em_manager_department_name:this.em_manager_department_name,
					em_manager_attach:JSON.stringify(this.em_manager_attach),
					se_ou_manager_attach:JSON.stringify(this.se_ou_manager_attach),
					cl_pr_manager_attach:JSON.stringify(this.cl_pr_manager_attach),
					po_co_fa_facilities_name:this.po_co_fa_facilities_name,
					po_co_fa_attach:JSON.stringify(this.po_co_fa_attach),
					ba_pr_power_attach:JSON.stringify(this.ba_pr_power_attach),
					other_data_attach:JSON.stringify(this.other_data_attach),
				};
				procedureAdd(data).then(res=>{
					if(res.errno==0){
						this.$toast('新增成功')
						this.$router.back()
					}else{
						this.$toast('新增失败')
					}
				})
			},
			//保存信息
			handleUpdate(){
				let data={
					id:this.$route.query.id,
					enterprise_id:this.form.enterprise_id,
					year:this.form.year,
					affect_book:this.form.affect_book,
					department_reply:this.form.department_reply,
					check_accept:this.form.check_accept,
					po_emit_prove:this.form.po_emit_prove,
					ra_safe_prove:this.form.ra_safe_prove,
					drainage_prove:this.form.drainage_prove,
					em_manager:this.form.em_manager,
					se_ou_manager:this.form.se_ou_manager,
					cl_pr_manager:this.form.cl_pr_manager,
					po_co_fa:this.form.po_co_fa,
					ba_pr_power:this.form.ba_pr_power,
					other_data:this.form.other_data,
					affect_book_index_array:JSON.stringify(this.affect_book_index_array),
					affect_book_attach:JSON.stringify(this.affect_book_attach),
					department_reply_name:this.department_reply_name,
					department_reply_attach:JSON.stringify(this.department_reply_attach),
					check_accept_attach:JSON.stringify(this.check_accept_attach),
					po_emit_prove_index_array:JSON.stringify(this.po_emit_prove_index_array),
					prove_department_name:this.prove_department_name,
					prove_department_code:this.prove_department_code,
					po_emit_prove_attach:JSON.stringify(this.po_emit_prove_attach),
					ra_safe_name:this.ra_safe_name,
					ra_safe_prove_attach:JSON.stringify(this.ra_safe_prove_attach),
					drainage_prove_department_name:this.drainage_prove_department_name,
					drainage_prove_attach:JSON.stringify(this.drainage_prove_attach),
					em_manager_department_name:this.em_manager_department_name,
					em_manager_attach:JSON.stringify(this.em_manager_attach),
					se_ou_manager_attach:JSON.stringify(this.se_ou_manager_attach),
					cl_pr_manager_attach:JSON.stringify(this.cl_pr_manager_attach),
					po_co_fa_facilities_name:this.po_co_fa_facilities_name,
					po_co_fa_attach:JSON.stringify(this.po_co_fa_attach),
					ba_pr_power_attach:JSON.stringify(this.ba_pr_power_attach),
					other_data_attach:JSON.stringify(this.other_data_attach),
				};
				procedureUpdate(data).then(res=>{
					if(res.errno==0){
						this.$toast('保存成功')
						this.$router.back()
					}else{
						this.$toast('保存失败')
					}
				})
			},
			//删除信息
			handleDelete() {
				let data = {};
				data.id = this.$route.query.id;
				procedureDelete(data).then(res => {
					if (res.errno) {
						this.$toast('删除企业环保手续信息出错')
					} else {
						this.$toast('删除企业环保手续信息成功')
						this.$router.push({
							path: '/pe_report/procedure_manager'
						});
					}
				})
			},
			//跳转新增
			toAdd() {
				this.form = {
					enterprise_id:'',
					year:'',
					affect_book:0,
					department_reply:0,
					check_accept:0,
					po_emit_prove:0,
					ra_safe_prove:0,
					drainage_prove:0,
					em_manager:0,
					se_ou_manager:0,
					cl_pr_manager:0,
					po_co_fa:0,
					ba_pr_power:0,
					other_data:0
				};
				this.affect_book_attach=[];
				this.department_reply_name='';
				this.department_reply_attach=[];
				this.check_accept_attach=[];
				this.po_emit_prove_index_array=[];
				this.prove_department_name='';
				this.prove_department_code='';
				this.po_emit_prove_attach=[];
				this.ra_safe_name='';
				this.ra_safe_prove_attach=[];
				this.drainage_prove_department_name='';
				this.drainage_prove_attach=[];
				this.em_manager_department_name='';
				this.em_manager_attach=[];
				this.se_ou_manager_attach=[];
				this.cl_pr_manager_attach=[];
				this.po_co_fa_facilities_name='';
				this.po_co_fa_attach=[];
				this.ba_pr_power_attach=[];
				this.other_data_attach=[];
				this.$router.replace({
					path: '/pe_report/procedure_detail/0'
				});
			},

			//指标选择
			all_index_change(e){
				if(e){
					this.name=e.label
				}
			},

			//指标插入数据
			addData(){
				if(this.index_type==4){
					let index_array={
						id:this.id,
						name:this.name,
						index_value:this.index_value,
						index_type:this.index_type,
						remarks:this.remarks,
						noise:this.noise,
						total:this.total,
						standard:this.standard,
						density:this.density,
						speed:this.speed,
						waste_type:this.waste_type
					};
					this.po_emit_prove_index_array.push(index_array)
				};
				this.id='';
				this.name='';
				this.total=0;
				this.density=0;
				this.speed=0;
				this.standard='';
				this.noise=0;
				this.waste_type='';
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
				let data={
					"name":this.attach_name,
					"start_time":this.start_time,
					"end_time":this.end_time,
					"url":this.attach_url,
					"remarks":this.remarks,
					"attach_type":this.attach_type,
				};
				if(this.attach_type==1){
					this.affect_book_attach.push(data);
				}else if(this.attach_type==2){
					this.department_reply_attach.push(data);
				}else if(this.attach_type==3){
					this.check_accept_attach.push(data);
				}else if(this.attach_type==4){
					this.po_emit_prove_attach.push(data);
				}else if(this.attach_type==5){
					this.ra_safe_prove_attach.push(data);
				}else if(this.attach_type==6){
					this.drainage_prove_attach.push(data);
				}else if(this.attach_type==7){
					this.em_manager_attach.push(data);
				}else if(this.attach_type==8){
					this.se_ou_manager_attach.push(data);
				}else if(this.attach_type==9){
					this.cl_pr_manager_attach.push(data);
				}else if(this.attach_type==10){
					this.po_co_fa_attach.push(data);
				}else if(this.attach_type==11){
					this.ba_pr_power_attach.push(data);
				}else if(this.attach_type==12){
					this.other_data_attach.push(data);
				}
				this.attach_name='';
				this.attach_url='';
				this.start_time='';
				this.end_time='';
				this.remarks='';
			},

			changedata(e){
				this.po_emit_prove_index_data=[];
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
			splitDetailData(data){
				for (let i in data) {
					if (data[i].pe_index == 1) {
						this.wasteWater.push(data[i])
					}else if (data[i].pe_index == 2) {
						this.wasteGas.push(data[i])
					}else if (data[i].pe_index == 3) {
						this.wasteSolid.push(data[i])
					}else if (data[i].pe_index == 4) {
						this.wasteDanger.push(data[i])
					}else if (data[i].pe_index == 5) {
						this.noise_emission.push(data[i])
					}
				}
			}
		},

	}
</script>

<style >
	.ivu-form-item{
		margin-bottom: 0;
	}
	.ivu-input-wrapper{

	}
	.ivu-input{
		margin: 10px 0;
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
					height: 45px;
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
						height: 45px;
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
