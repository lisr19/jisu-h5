<template>
	<div class="main">
		<head-bar title="第三方公司信息"></head-bar>
		<div class="content">
			<Form ref="form" :model="form" :rules="rules" :label-width="100">
				<i-col>
					<FormItem label="企业名称" prop="name" >
						<i-input  type="text" placeholder="企业名称" v-model="form.name" ></i-input>
					</FormItem>

					<FormItem label="营业执照号码" prop="code" >
						<i-input  type="text" placeholder="社会统一信用代码" v-model="form.code"></i-input>
					</FormItem>
					<FormItem label="营业范围" prop="business_range" class="my-form-item">
						<i-input type="textarea" :rows="8" placeholder="营业范围" v-model="form.business_range"></i-input>
					</FormItem>
					

					<FormItem label="联系人" prop="link_name" >
						<i-input  type="text" placeholder="联系人" v-model="form.link_name"></i-input>
					</FormItem>

					<FormItem label="联系电话" prop="link_phone" >
						<i-input  type="text" placeholder="联系电话" v-model="form.link_phone"></i-input>
					</FormItem>

				</i-col>
				<FormItem prop="attach" label="上传文件">
					<p style="text-align: left" >
						<Button type="primary" style="margin-right: 20px"  @click="toAddfiles" >添加文件</Button>
						<Button type="primary"  @click="addImgs" >多图合并上传</Button><br>
						<span style="color:red">上传营业执照及相关资质文件（CMA证书及检测项目清单等文件扫描件）</span>
					</p>
				</FormItem>
				<Table border highlight-row size="small" :columns="columns1" :data="data1"></Table>
				<div v-if="isAdd" class="btn" @click="handleAdd" >新增</div>
				<div v-else class="btn" @click="handleUpdate">保存</div>
			</Form>
		</div>
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
	import {
		thirdEnterpriseDetail,
		thirdEnterpriseAdd,
		thirdEnterpriseUpdate,
		thirdEnterpriseDelete,
		accountSelect,
		uploadImg
	} from '@/lib/API/third_enterprise';
	import {Notify, Toast,Dialog} from "vant";
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
			let self = this;
			return {
				dd:{
					content:[],
				},
				fileList2: [],
				showImg:false,
				isAdd:true,
				deleteModal: false,
				inputError: false,
				files_name:'',
				files_url:'',
				headers: {},
				data1:[],
				accountdata:[],
				columns1: [{
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
														this.data1.splice(params.index,1);
													}
												}
											}, )
										], ),
									]
							);
						}
					}
				],
				form: {
					name: '',
					link_name:'',
					link_phone: '',
					code:'',
					business_range:'',
					account_id:''
				},
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
			//上传验证
			this.headers.Authorization = sessionStorage.token;
			this.enterId = localStorage.getItem('enterId')
			this.form.account_id=sessionStorage.getItem('account_id');
		},
		//页面初始化
		mounted() {
			if (this.$route.query.id) {
				this.isAdd =false
				this.handleGetInfo({id:this.$route.query.id})
			}
			if(sessionStorage.getItem('account_type')!=1){
				this.handleGetaccount()
			}else{
				this.form.account_id=sessionStorage.getItem('account_id');
			}
		},
		methods: {
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
			},
			handleGetaccount(){
				accountSelect().then(res => {
					if (res.errno) {
						this.$Notice.error({
							title: '获取账户选择列表出错',
							desc: res.errmsg,
							duration: this.$parent.getInfoFailTime
						});
					} else {
						this.accountdata=res.data
					}
				})
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
				};
				let data={
					"name":this.files_name,
					"url":this.files_url
				};
				this.data1.push(data);
				this.files_name='';
				this.files_url=''
			},
			//获取信息
			handleGetInfo(data) {
				thirdEnterpriseDetail(data).then(res => {
					if (res.errno) {
						this.$toast('获取第三方公司信息出错')
					} else {
						this.form = res.data;
						this.data1=res.data.attach
					}
				})
			},
			//新增信息
			handleAdd() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let data = {
							name:this.form.name,
							link_name:this.form.link_name,
							link_phone:this.form.link_phone,
							code:this.form.code,
							account_id:this.form.account_id,
							business_range:this.form.business_range,
							attach:JSON.stringify(this.data1)
						};
						thirdEnterpriseAdd(data).then(res => {
							if (res.errno) {
								this.$toast('新增第三方公司信息出错')
							} else {
								this.$toast('成功新增第三方公司信息')
								this.$router.back()
							}
						})
					} else {
					}
				})
			},
			//保存信息
			handleUpdate() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						let data = {
							id: parseInt(this.$route.query.id),
							name:this.form.name,
							link_name:this.form.link_name,
							link_phone:this.form.link_phone,
							code:this.form.code,
							account_id:this.form.account_id,
							business_range:this.form.business_range,
							attach:JSON.stringify(this.data1)
						};
						thirdEnterpriseUpdate(data).then(res => {
							if (res.errno) {
								this.$toast('保存第三方公司信息出错')
							} else {
								this.$toast('成功保存第三方公司信息')
								this.$router.back()
							}
							// this.$parent.reload();
						})
						this.inputError = false;
					} else {
						this.inputError = true;
					}
				})
			},
			//删除信息
			handleDelete() {
				let data = {};
				data.id = this.$route.params.id;
				thirdEnterpriseDelete(data).then(res => {
					if (res.errno) {
						this.$Notice.error({
							title: '删除第三方公司信息出错',
							duration: this.$parent.saveFailTime
						});
					} else {
						this.$Notice.success({
							title: '删除第三方公司信息成功',
							duration: this.$parent.successTime
						});
						this.$router.push({
							path: '/pe_report/third_enterprise_manager'
						});
					}
				})
			},
			//跳转新增
			toAdd() {
				this.form = {};
				this.data1=[];
				this.$router.replace({
					path: '/pe_report/third_enterprise_detail/0'
				});
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
					this.files_url = res.url;
					this.$Notice.success({
						title: '上传成功',
						desc: file.name,
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
			pdfImg(){
				const pdfDocGenerator = pdfMake.createPdf(this.dd);
				pdfDocGenerator.getDataUrl((dataUrl) => {
					let filename =Math.ceil(Math.random()*10)+'.pdf'
					this.dataURLtoFile(dataUrl,filename)
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
			},

			async uploadImg(params){
				if(!this.files_name||this.fileList2.length==0){
					Notify({ type: 'warning', message: '文件不能为空' });
					return;
				}
				Toast.loading({
					message: '合并中...',
					forbidClick: true,
					loadingType: 'spinner',
					duration: 0
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
		},
	}
</script>
<style scoped>
	.main>>>.ivu-input-wrapper{
		width: 100%;
	}
</style>
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
	.posting-uploader-item{
		position: relative;
		margin:0 40px 20px 0;
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