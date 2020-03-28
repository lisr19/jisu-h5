<template>
	<div class="main">
		<head-bar title="企业信息"></head-bar>
		<div class="base-info">
			<img class="head-img" src="@/assets/img/headimg.jpg" alt="">
			<!--				<van-uploader v-model="fileList"  :max-count="1" :after-read="afterRead"  />-->
			<div class="desc">
				<p class="name">{{enterDate.name}}</p>
				<p class="ID">营业执照：{{enterDate.code}}</p>
				<p class="address" @click="showMap=!showMap">
					定位：<van-icon name="location" color="#999999" />
					{{enterDate.address}}
				</p>
				<span v-if="isEdit" class="edit-btn" @click="handleUpdate">保存</span>
				<span v-else  class="edit-btn" @click="isEdit=true">编辑</span>
			</div>
		</div>
		<div class="map-box" v-if="showMap">
			<div style="display:flex;justify-content: space-between;margin: 0 0 10px">
				<span>经度：
				<Input style="width: 60%" type="number" placeholder="经度" v-model="enterDate.longit" @on-change="updatemap"></Input>
			</span>
				<span>纬度：
				<Input style="width: 60%" type="number" placeholder="纬度" v-model="enterDate.lati"  @on-change="updatemap"></Input>
			</span>
			</div>
			<el-amap vid="amapDemo" :zoom="zoom" :center="center" :expandZoomRange="expandZoomRange" :zooms="zooms"
					 style="height:250px ">
				<el-amap-marker v-for="(marker, index) in markers" v-bind:key="index.position" :position="marker.position"
								:events="marker.events" :visible="marker.visible" :draggable=true :vid="index"></el-amap-marker>
			</el-amap>
		</div>
		<div class="content">
			<Form ref="enterDate" :model="enterDate" :rules="rules" :label-width="100">
				<i-col>
					<FormItem label="企业名称" prop="name" >
						<i-input :disabled="!isEdit" type="text" placeholder="企业名称" v-model="enterDate.name" ></i-input>
					</FormItem>

					<FormItem label="营业执照号码" prop="code" >
						<i-input :disabled="!isEdit" type="text" placeholder="社会统一信用代码" v-model="enterDate.code"></i-input>
					</FormItem>

					<FormItem label="企业地址" prop="address" >
						<al-selector v-model="area" gutter="0px" :disabled="!isEdit" />
						<i-input :disabled="!isEdit" type="text" placeholder="请输入具体地址" v-model="enterDate.address" style="margin-top: 10px"> </i-input>
					</FormItem>

					<FormItem label="联系人" prop="link_name" >
						<i-input :disabled="!isEdit" type="text" placeholder="联系人" v-model="enterDate.link_name"></i-input>
					</FormItem>

					<FormItem label="联系电话" prop="link_phone" >
						<i-input :disabled="!isEdit" type="text" placeholder="联系电话" v-model="enterDate.link_phone"></i-input>
					</FormItem>

					<FormItem label="行业类型" prop="industry_id"  >
						<Cascader :disabled="!isEdit" :data="industrydata" v-model="enterDate.industry_id" placeholder="请选择行业类型" trigger="hover" ></Cascader>
					</FormItem>
					<FormItem prop="product" label="主要产品" >
						<i-input :disabled="!isEdit"  placeholder="请输入主要产品" v-model="enterDate.product"></i-input>
					</FormItem>

					<FormItem prop="materials" label="原辅材料">
						<i-input :disabled="!isEdit" placeholder="请输入原辅材料" v-model="enterDate.materials"></i-input>
					</FormItem>

					<FormItem prop="product_technology" label="主要生产工艺" >
						<i-input :disabled="!isEdit" placeholder="请输入主要生产工艺" v-model="enterDate.product_technology"></i-input>
					</FormItem>
					<FormItem label="规模" prop="scale_id"  >
						<i-select v-model="enterDate.scale_id"  :disabled="!isEdit" >
							<i-option v-for="item in scaledata" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
						</i-select>
					</FormItem>

					<FormItem label="登记注册类型" prop="register_id"  >
						<i-select v-model="enterDate.register_id"  :disabled="!isEdit">
							<i-option  v-for="item in registerdata" v-bind:key="item.id" :value="item.id">{{item.name}}</i-option>
						</i-select>
					</FormItem>

					<FormItem label="运行状态" prop="status"  >
						<i-select v-model="enterDate.status"  :disabled="!isEdit">
							<i-option :value="1">运行</i-option>
							<i-option :value="2">全年停产</i-option>
						</i-select>
					</FormItem>

					<FormItem label="注册时间" prop="register_time"  >
						<DatePicker  :disabled="!isEdit" type="date" placeholder="注册时间" @on-change="enterDate.register_time=$event" :value="enterDate.register_time" value-format="yyyy-MM-dd"></DatePicker>
					</FormItem>

					<FormItem label="企业简介" prop="describe" class="my-form-item">
						<i-input  :disabled="!isEdit" type="textarea" :rows="5" placeholder="企业简介" v-model="enterDate.describe"></i-input>
					</FormItem>

				</i-col>
				<FormItem label="上传附件" prop="attach"   >
					<p style="text-align: left" >
						<Button type="primary" :disabled="!isEdit" @click="toAddfiles" >添加文件</Button>
						<span @click="showlist=true" style="color:red;margin-left: 15px"><Icon type="ios-help"></Icon>查看需上传附件内容</span>
					</p>
				</FormItem>
				<Table border highlight-row size="small" :columns="columns1" :data="data1"></Table>
				<div v-if="isAdd" class="btn" @click="handleAdd" >新增</div>
				<div v-else class="btn" @click="handleUpdate">保存</div>
			</Form>
		</div>
		<Modal v-model="showlist" title="需上传附件内容">
			<p>工商营业执照</p>
			<p>企业总平面图示意图</p>
			<p>主要产品生产工艺流程及排污点示意图</p>
			<p>主要生产设备清单</p>
			<p>企业照片（正门、车间）</p>
			<p>环境管理制度，责任人员组织结构，培训资料，签到表附照片等</p>
		</Modal>

		<Modal v-model="uploadmodel" title="上传文件"  @on-ok="adddata1">
			<Input type="text" placeholder="请输入文件名" v-model="files_name"></Input>
			<Upload
					:headers="headers"
					:show-upload-list="false"
					:on-success="uploadSuccess"
					:on-error="uploadError"
					multiple
					action="http://120.76.140.168:11008/home/file/report_upload"
					style="width:100px;margin-top:20px"
			>
				<i-button>上传文件</i-button>
			</Upload>
			<div class="demo-upload-list" v-if="files_url">
				<span>{{files_url}}</span>
			</div>
		</Modal>
	</div>
</template>

<script>
	import headBar from '@/components/head-bar/head-bar'
	import {enterpriseUpdate,enterpriseList,enterpriseDetail,industrySelect,scaleSelect,registertypeSelect,enterpriseAdd} from '@/lib/API/enterprise'
	// import { Toast,Dialog } from 'vant'
	export default {
		components:{
			headBar
		},
		computed: {
			//可操作
			canChange() {
				return true;
			},
			//可添加
			canAdd() {
				if (this.$route.params.id == 0) {
					return true;
				} else {
					return false;
				}
			},
			//可保存
			canSave() {
				if (this.$route.params.id != 0) {
					return true;
				} else {
					return false;
				}
			},
			//可删除
			canDelete() {
				if (this.$route.params.id != 0) {
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
				files_name:'',
				files_url:'',
				headers: {
					Authorization:localStorage.getItem('token')
				},
				showlist:false,
				showMap:false,
				//地图
				count: 1,
				slotStyle: {
					padding: '2px 8px',
					background: '#eee',
					color: '#333',
					border: '1px solid #aaa'
				},
				zoom: 10,
				expandZoomRange: true,
				zooms: [3, 20],
				center: [113.264417, 23.130067],
				markers: [{
					position: [113.264417, 23.130067],
					events: {
						dragend: (e) => {
							this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
							this.enterDate.longit = e.lnglat.lng.toString();
							this.enterDate.lati = e.lnglat.lat.toString();
						}
					},
					visible: true,
					draggable: false,
					template: '<span>1</span>',
				}],
				data1:[],
				isAdd:false,
				industrydata:[],
				scaledata:[],
				registerdata:[],
				area:[],
				accountdata:[],
				//输入验证
				rules: {
					name: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					link_name: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					link_phone: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					industry_id: [{
						required: true,
						message: '不能为空',
						trigger: 'change' ,
						type: 'array'
					},],
					scale_id: [{
						required: true,
						message: '不能为空',
						trigger: 'change',
						type: 'number'
					}],
					product:[{
						required: true,
						type:'string',
						message: '不能为空',
						trigger: 'blur'
					}],
					materials:[{
						required: true,
						type:'string',
						message: '不能为空',
						trigger: 'blur'
					}],
					product_technology:[{
						required: true,
						type:'string',
						message: '不能为空',
						trigger: 'blur'
					}],
					register_id: [{
						required: true,
						message: '不能为空',
						trigger: 'change',
						type: 'number'
					}],
					status: [{
						required: true,
						message: '不能为空',
						trigger: 'change',
						type: 'number'
					}],
					register_time: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					describe: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					longit: [{
						required: true,
						message: '不能为空',
						type:'string',
						trigger: 'blur'
					}],
					lati: [{
						required: true,
						type:'string',
						message: '不能为空',
						trigger: 'blur'
					}],
					attach:[{
						required:true,
						type:'array',
						message:'不能为空',
						trigger:'blur'
					}]
				},
				enterDate: {
					name: '',
					link_name:'',
					link_phone: '',
					code:'',
					address:'',
					account_id:'',
					industry_id:[],
					scale_id:'',
					register_id:'',
					status:'',
					describe:'',
					register_time:'',
					longit:'',
					lati:'',
					attach:[]
				},
				uploadmodel:false,
				isEdit:false,
				imgUrl:'',
				name:'',
				phone:'',
				type:'',
				message:"",
				columns1: [{
					title: '文件名',
					key:'name',
					align: 'center',
				},
					{
						title: '操作',
						align: 'center',
						width: 200,
						render: (h, params) => {
							return h('Row', [
										h('Col', {
										}, [h('Button', {
											on: {
												click: () => {
													//console.log(params.row.url);
													window.open(params.row.url,'_blank');
												}
											}
										}, '查看'),
											h('Button', {
												on: {
													click: () => {
														this.data1.splice(params.index,1);
													}
												}
											},'删除' )
										], ),
									]
							);
						}
					}
				],
			}
		},
		created() {
			this.enterId = localStorage.getItem('enterId')
			if(!this.enterId){
				this.enterpriseList()
			}else {
				this.getEnterDetail({id:this.enterId})
			}
		},
		mounted() {
			this.industrySelect()
			this.scaleSelect()
			this.registertypeSelect()
		},
		methods: {
			//获取账户列表
			async enterpriseList(params) {
				let res = await enterpriseList(params)
				if(res.errno ==0){
					if(res.data.data.length==0){
						this.isEdit =true
						this.isAdd =true
					}else {
						this.enterId = res.data.data[0].id
						localStorage.setItem('enterId',this.enterId)
					}
				} else {
					this.$toast(res.errmsg)
				}
			},
			//获取企业详情
			async getEnterDetail(params) {
				let res = await enterpriseDetail(params)
				if(res.errno ==0){
					this.enterDate =res.data
					this.account_name=res.data.account_name;
					let code=res.data.area;
					let pro=code.substring(0,2)+'0000';
					let city=code.substring(0,4)+'00';
					let arer=code.substring(0,6);
					this.area.push(pro);
					this.area.push(city);
					this.area.push(arer);
					this.area.push(code);
					this.data1=res.data.attach;
					this.center = [res.data.longit, res.data.lati];
					this.markers[0].position = [res.data.longit, res.data.lati];

				} else {
					this.$toast(res.errmsg)
				}

			},
			//获取行业类型
			async industrySelect(params){
				let res = await industrySelect(params)
				if(res.errno ==0){
					this.industrydata=res.data
				} else {
					this.$toast(res.errmsg)
				}
			},
			async scaleSelect(params){
				let res = await scaleSelect(params)
				if(res.errno ==0){
					this.scaledata=res.data
				} else {
					this.$toast(res.errmsg)
				}
			},
			//获取注册类型
			async registertypeSelect(params){
				let res = await registertypeSelect(params)
				if(res.errno ==0){
					this.registerdata=res.data
				} else {
					this.$toast(res.errmsg)
				}
			},
			//保存更新信息
			handleUpdate() {
				if(!this.isEdit){
					this.$toast('请先点击编辑')
					return
				}
				this.$refs.enterDate.validate((valid) => {
					if (valid) {
						let len=this.area.length;
						let code=this.area[len-1].code;
						let data = {
							id: this.enterId,
							name:this.enterDate.name,
							link_name:this.enterDate.link_name,
							link_phone:this.enterDate.link_phone,
							code:this.enterDate.code,
							area:code,
							address:this.enterDate.address,
							account_id:this.enterDate.account_id,
							industry_id:JSON.stringify(this.enterDate.industry_id),
							scale_id:this.enterDate.scale_id,
							register_id:this.enterDate.register_id,
							status:this.enterDate.status,
							describe:this.enterDate.describe,
							register_time:this.enterDate.register_time,
							attach:JSON.stringify(this.data1),
							longit:this.enterDate.longit,
							lati:this.enterDate.lati,
							product:this.enterDate.product,
							materials:this.enterDate.materials,
							product_technology:this.enterDate.product_technology
						};
						enterpriseUpdate(data).then(res => {
							if (res.errno) {
								this.$toast('保存企业信息出错')
							} else {
								this.$toast('成功保存企业信息')
								this.$router.back()
							}
							sessionStorage.setItem('has_enterprise_detail',1)
						})
					} else {
						this.$toast('请正确填写表单')
					}
				})
			},

			//新增企业信息
			handleAdd() {
				this.$refs.enterDate.validate((valid) => {
					if (valid) {
						let len=this.area.length;
						let code=this.area[len-1].code;
						let params = {
							name:this.enterDate.name,
							link_name:this.enterDate.link_name,
							link_phone:this.enterDate.link_phone,
							code:this.enterDate.code,
							area:code,
							address:this.enterDate.address,
							account_id:this.enterDate.account_id,
							industry_id:JSON.stringify(this.enterDate.industry_id),
							scale_id:this.enterDate.scale_id,
							register_id:this.enterDate.register_id,
							status:this.enterDate.status,
							describe:this.enterDate.describe,
							register_time:this.enterDate.register_time,
							attach:JSON.stringify(this.data1),
							longit:this.enterDate.longit,
							lati:this.enterDate.lati,
							product:this.enterDate.product,
							materials:this.enterDate.materials,
							product_technology:this.enterDate.product_technology
						};
						enterpriseAdd(params).then(res => {
							if (res.errno) {
								this.$toast('新增企业信息出错')
							} else {
								this.$toast('成功新增企业信息')
								localStorage.setItem('enterId',res.data.id)
								this.$router.back()
							}
						})
					} else {
						this.$toast('请正确填写表单，必填项不能为空')
					}
				})
			},
			afterRead(file) {
				this.uploadImg(file.file)
			},
			async uploadImg(params){
				let res = await uploadImg({
					imgFile:params
				})
				if(res.code === 200){
					this.imgUrl = res.data.url
				}
			},
			//更新地图坐标
			updatemap() {
				this.center = [this.enterDate.longit, this.enterDate.lati];
				this.markers[0].position = [this.enterDate.longit, this.enterDate.lati];
			},
			//打开文件上传窗口
			toAddfiles(){
				this.uploadmodel=true
			},
			//上传文件插入数据
			adddata1(){
				if(!this.files_name||!this.files_url){
					this.$toast('文件不能为空')
					return;
				}
				let data={
					"name":this.files_name,
					"url":this.files_url
				};
				if(this.isAdd){
					this.data1.push(data);
				}
				console.log(this.data1);
				this.enterDate.attach.push(data)
				this.files_name='';
				this.files_url=''
			},

			//上传文件成功
			uploadSuccess(res, file) {
				if (res.errno) {
					this.$toast('上传失败')
				} else {
					this.files_url = res.url;
					this.$toast('上传成功')
				}
			},
			//上传文件失败
			uploadError(error, file) {
				this.$toast('上传失败')
			},
			handleBeforeUpload() {
				const check = this.uploadList.length < 2;
				if (!check) {
					this.$toast('最多只能上传 1个文件')
				}
				return check;
			}

		}
	}
</script>

<style>
	.van-field__label{
		text-align: left!important;
	}
	.ivu-form .ivu-form-item-label{
		text-align: center;
	}
	.ivu-cascader-menu{
		width: 60px;
	}
</style>
<style lang="less" scoped>
	.main{
		padding-top: 150px;
		background-color: #ffffff;
		width: 100%;
		position: absolute;
		height: 100%;
		.base-info{
			display: flex;
			padding: 0 44px 50px;
			position: relative;
			border-bottom: solid 1px #E6E6E6;
			.title{
				text-align: center;
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(255,255,255,1);
				line-height:120px;
				display: flex;
				align-items: center;
				justify-content: center;
				img{
					position: absolute;
					left: 46px;
					height: 46px;
				}
			}
			.head-img{
				width:172px;
				height:172px;
				margin-right: 32px;
				border-radius: 10px;
				overflow: hidden;
			}
			.desc{
				display: flex;
				flex: 1;
				flex-direction: column;
				text-align: left;
				font-size:22px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
				.name{
					font-size:32px;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:44px;
				}
				.ID{
					font-size:24px;
					margin: 25px 0 20px;
				}
				.address{
					display: flex;
					align-items: center;
					i{
						margin-right: 10px;
					}
				}
				.edit-btn{
					position: absolute;
					right: 30px;
					top: 10px;
				}
			}
		}
		.content{
			margin-top: 50px;
			padding:0 20px;
			.van-cell{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			.btn{
				width:522px;
				height:90px;
				line-height: 90px;
				background:rgba(33,68,61,1);
				box-shadow:0px 4px 18px 0px rgba(166,172,191,0.5);
				border-radius:52px;
				color: #ffffff;
				margin: 100px auto 50px;
			}
		}
		.map-box{
			width: 680px;
			height: 600px;
			margin: 20px auto;
			span{
				display: inline-block;
			}
		}

	}
</style>