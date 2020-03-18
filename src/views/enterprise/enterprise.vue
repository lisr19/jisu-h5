<template>
	<div class="main">
		<head-bar title="企业信息"></head-bar>
		<div class="base-info">
			<img class="head-img" src="@/assets/img/icon1.png" alt="">
			<!--				<van-uploader v-model="fileList"  :max-count="1" :after-read="afterRead"  />-->
			<div class="desc">
				<p class="name">企业名称</p>
				<p class="ID">营业执照：1726452WSSDF</p>
				<p class="address">
					<van-icon name="location" color="#999999" />
					广东省广州市番禺区
				</p>
				<span class="edit-btn" @click="isEdit=!isEdit">{{isEdit?'保存':'编辑'}}</span>
			</div>
		</div>
		<div class="content">
			<van-cell-group>
				<van-field v-model="name" label="联系人：" :disabled="!isEdit"/>
				<van-field v-model="phone"  label="联系电话：" :disabled="!isEdit"/>
				<van-field v-model="type"  label="行业类型：" :disabled="!isEdit"/>
				<van-field v-model="name" label="联系人：" :disabled="!isEdit"/>
				<van-field v-model="phone"  label="联系电话：" :disabled="!isEdit"/>
				<van-field
						v-model="message"
						rows="2"
						autosize
						label="企业简介："
						type="textarea"
						:disabled="!isEdit"
				/>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	import headBar from '@/components/head-bar/head-bar'
	// import {uploadImg} from '@/lib/API/comment'
	// import { Toast,Dialog } from 'vant'
	export default {
		components:{
			headBar
		},
		data() {
			return {
				isEdit:false,
				imgUrl:'',
				name:'张小平',
				phone:'19988541646',
				type:'环保',
				message:"公司成立于2018年6月18日，环保领域的开拓者先已有两年的专业环保项目…"
			}
		},
		created() {
		},
		methods: {
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

		}
	}
</script>

<style>
	.van-field__label{
		text-align: left!important;
	}
</style>
<style lang="less" scoped>
	.main{

		padding-top: 150px;
		background-color: #ffffff;
		position: fixed;
		height: 100%;
		width: 100%;
		.base-info{
			display: flex;
			padding: 0 44px;
			position: relative;
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
			border-top: solid 1px #E6E6E6;
			margin-top: 40px;

			.van-cell{
				font-size:28px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
		}
	}
</style>