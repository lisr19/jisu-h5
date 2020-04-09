<template>
	<div class="main">
		<head-bar title="企业信息"></head-bar>
		<div class="base-info">
			<img class="head-img" src="@/assets/img/ent-img.png" alt="">
			<div class="desc">
				<p class="name">{{enterDate.name}}</p>
				<p class="ID">营业执照：{{enterDate.code}}</p>
				<p class="address" @click="showMap=!showMap">
					定位：<img class="" src="@/assets/img/location.png" alt="">
					{{enterDate.address}}
				</p>
				<span v-if="isEdit" class="edit-btn" @click="handleUpdate">保存</span>
				<span v-else  class="edit-btn" @click="isEdit=true">编辑</span>
			</div>
		</div>
		<div class="map-box" v-if="showMap">
			<div class="auto-tip" @click="getLocation">
				<img class="" src="@/assets/img/location.png" alt="">
				重新自动定位
			</div>
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
<!--						<input type="text" @click="showIndus=true" v-model="enterDate.industry_id"  placeholder="请选择行业类型" style="display: none">-->
<!--						<input type="text" @click="showIndus=true" v-model="enterDate.industry_Name"  placeholder="请选择行业类型" >-->
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
				<FormItem label="上传附件" prop="attach">
					<div style="text-align: left">
						<Button type="primary" :disabled="!isEdit" @click="toAddfiles" style="margin-right: 10px">添加文件</Button>
						<Button type="primary"  @click="addImgs" >多图合并上传</Button>
						<p @click="showlist=true" style="color:red;margin-top: 10px"><Icon type="ios-help" size="18"></Icon>查看需上传附件内容</p>
					</div>
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

		<Modal v-model="showImg" title="多图合并上传" >
			<Input style="margin-bottom: 15px"  type="text" placeholder="请输入文件名" v-model="files_name"></Input>
			<div style="display: flex;flex-wrap: wrap">
				<div  class="posting-uploader-item" v-for="(item, index) in fileList2" :key="index">
					<p class="num">{{index+1}}</p>
					<img :src="item.content" alt="图片" class="img" style="width: 80px;height: 80px"/>
					<van-icon name="close" @click="delImg(index)" class="del-icon" size="18"/>
				</div>
				<van-uploader multiple :after-read="afterRead2" style="margin-top: 24px"/>
			</div>

			<div slot="footer">
				<Button type="text" size="large" @click="showImg=false">取消</Button>
				<Button  type="primary" size="large" @click="pdfImg">合并上传</Button>
			</div>
		</Modal>

		<Modal v-model="uploadmodel" title="上传文件"  @on-ok="adddata1">
			<Input  type="text" placeholder="请输入文件名" v-model="files_name"></Input>
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
		<van-popup v-model="showIndus" closeable position="bottom" :style="{ height: '40%' }">
			<div style="font-size: 16px;padding: 10px 20px">当前选择：{{currName}}</div>
			<van-picker show-toolbar title="行业类型" :columns="indusList" @change="onChangeIndus"
						@confirm="confirmIndus"  @cancel="showIndus = false"
			/>
		</van-popup>


	</div>
</template>

<script>
	import headBar from '@/components/head-bar/head-bar'
	import {enterpriseUpdate,enterpriseList,enterpriseDetail,industrySelect,scaleSelect,registertypeSelect,enterpriseAdd,uploadImg} from '@/lib/API/enterprise'
	import { Toast,Dialog,Notify} from 'vant'
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
				currName:'',
				showIndus:false,
				indusList:[], //行业类型列表
				dd:{
					content:[],
				},
				fileList2: [],
				showImg:false,
				showAllimg:false,
				hasAddr:false,
				city: '定位中...',
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
					industry_Name:'',
					scale_id:'',
					register_id:'',
					status:'',
					describe:'',
					register_time:'',
					longit:113.264417,
					lati:23.130067,
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
										},),
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
														this.data1.splice(params.index,1);
													}
												}
											},)
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
				this.getLocation()
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

			// 获取当前位置
			getLocation () {
				Toast.loading({
					mask: true,
					message: '定位中...'
				});
				const self = this;
				AMap.plugin('AMap.Geolocation', function () {
					var geolocation = new AMap.Geolocation({
						// 是否使用高精度定位，默认：true
						enableHighAccuracy: true,
						// 设置定位超时时间，默认：无穷大
						timeout: 5000
					});

					geolocation.getCurrentPosition();
					AMap.event.addListener(geolocation, 'complete', onComplete);
					AMap.event.addListener(geolocation, 'error', onError);

					function onComplete (data) {
						Toast.clear();
						console.log(data);
						self.enterDate.address = data.formattedAddress
						self.enterDate.lati = data.position.lat
						self.enterDate.longit = data.position.lng
						self.markers[0].position=[data.position.lng, data.position.lat]
						self.center= [data.position.lng, data.position.lat]
						self.$toast('定位成功')
						// data是具体的定位信息
						// console.log('定位成功信息：', data.addressComponent.city);
						// self.city = data.addressComponent.city;
					}
					function onError (data) {
						Toast.clear();
						// 定位出错
						console.log('定位失败错误：', data);
						// 调用IP定位
						self.getLngLatLocation();
					}
				});
			},
			// 通过IP获取当前位置
			getLngLatLocation () {
				Toast.loading({
					mask: true,
					message: 'IP定位中...'
				});
				var that = this
				AMap.plugin('AMap.CitySearch', function () {
					var citySearch = new AMap.CitySearch();
					citySearch.getLocalCity(function (status, result) {
						if (status === 'complete' && result.info === 'OK') {
							// 查询成功，result即为当前所在城市信息
							// console.log('通过ip获取当前城市：', result);
							// 逆向地理编码
							AMap.plugin('AMap.Geocoder', function () {
								var geocoder = new AMap.Geocoder({
									// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
									city: result.adcode
								});

								var lnglat = result.rectangle.split(';')[0].split(',');
								geocoder.getAddress(lnglat, function (status, data) {
									if (status === 'complete' && data.info === 'OK') {
										// result为对应的地理位置详细信息
										// console.log(data.regeocode);
										that.enterDate.address = data.regeocode.formattedAddress
										let location = data.regeocode.addressComponent.businessAreas[0].location
										console.log(data.regeocode.addressComponent.businessAreas[0].location);
										that.enterDate.longit = location.lng
										that.enterDate.lati = location.lat
										that.markers[0].position=[location.lng, location.lat];
										that.center= [location.lng, location.lat]
										Toast.clear();
									}
								});
							});
						}
					});
				});
			},
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
					if(res.data.address){
						this.hasAddr =true
					}else {
						this.hasAddr =false
					}
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
					this.indusList=res.data
					this.indusList.forEach((item,index)=>{
						this.$set(item,'text',item.label);
						item.children.forEach((item2,index2)=>{
							this.$set(item2,'text',item2.label);
							item2.children.forEach((item3,index3)=>{
								this.$set(item3,'text',item3.label);
							})
						})
					})
					// console.log(this.indusList);
				} else {
					this.$toast(res.errmsg)
				}
			},
			onChangeIndus(picker, values) {
				this.currName = values
			},

			confirmIndus(values,index){
				index= Array.from(index, x => x + 1)
				this.enterDate.industry_id= index
				this.enterDate.industry_Name= values
				this.showIndus=false
				// console.log(this.enterDate.industry_id);
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

			async uploadImg(params){
				// this.showImg = false
				if(!this.files_name||this.fileList2.length==0){
					Notify({ type: 'warning', message: '文件不能为空' });
					// this.$toast('文件不能为空')
					return;
				}
				Toast.loading({
					message: '合并中...',
					forbidClick: true,
					loadingType: 'spinner'
				})
				let res = await uploadImg({
					file:params
				})
				if(res){
					this.files_url = res.url
					this.$toast('上传成功')
					this.showImg =false
					this.adddata1()
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
				console.log(file);
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

			pdfImg(){
				const pdfDocGenerator = pdfMake.createPdf(this.dd);
				pdfDocGenerator.getDataUrl((dataUrl) => {
					let filename =Math.ceil(Math.random()*10)+'.pdf'
					this.dataURLtoFile(dataUrl,filename)
					// this.showImg =false
					// this.showAllimg = true
					// this.files_name = ''
					// pdfMake.createPdf(this.dd).open();
				});
			},
			dataURLtoFile(dataurl, filename) {
				//将base64转换为文件
				var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				let file = new File([u8arr], filename, {type:mime});
				this.uploadImg(file)
				// return new File([u8arr], filename, {type:mime});
			},
			addImgs(){
				this.showImg =true
				this.fileList2 = []
				this.dd.content =[]
			},
			afterRead2(file) {
				this.fileList2.push(file)
				this.dd.content.push({image:file.content,width:300})
				// console.log(this.dd.content);
			},
			delImg(index){
				this.fileList2.splice(index,1);
				this.dd.content.splice(index,1)
				// console.log(this.fileList2);
			},
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
					img{
						width: 30px;
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
			height: 680px;
			margin: 20px auto;
			.auto-tip{
				height: 80px;
				display: flex;
				align-items: center;
				font-size: 30px;
				img{
					width: 30px;
					margin-right: 20px;
				}
			}
			span{
				display: inline-block;
			}
		}

	}
	.posting-uploader-item{
		position: relative;
		margin:0 20px 20px 0;
		.num{
			font-size: 32px;
			font-weight: 500;
			text-align: center;
		}
		.img{
			border-radius: 10px;
		}
		.del-icon{
			position: absolute;
			top: 20px;
			left: -15px;
			z-index: 99;
		}
	}
</style>