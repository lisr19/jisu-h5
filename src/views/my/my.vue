<template>
	<div class="main">
		<div class="head-bar">
			<div class="title">
<!--				<img src="@/assets/img/icon1.png" alt="">-->
				我的
			</div>
			<div class="head-img">
				<img  src="@/assets/img/ent-img.png" alt="">
<!--				<van-uploader v-model="fileList"  :max-count="1" :after-read="afterRead"  />-->
				<div class="desc">
					<p class="role">{{userDate.name}}</p>
					<p class="role">{{userDate.role_name}}</p>
					<p class="ID">ID：{{enterprise_id}}</p>
					<van-icon name="arrow" size="20"/>
				</div>
			</div>
		</div>
		<div class="about">
			<div class="item" v-for="item in tipList" @click="openDetail(item)">
				<div style="display: flex;align-items: center">
					<img :src="item.imgurl" alt="">
					{{item.title}}
				</div>
				<van-icon name="arrow"  size="20"/>
			</div>
		</div>
		<div class="btn" @click="quitUser">退出登录</div>
	</div>
</template>

<script>
	// import headBar from '@/components/head-bar/head-bar'
	import {uploadImg,getUserDate} from '@/lib/API/comment'
	import { Toast,Dialog } from 'vant'
	export default {
		components:{
			Dialog
		},
		data() {
			return {
				page:1,
				imgUrl:'',
				fileList:[],
				tipList: [
					{
						title: '企业信息',
						imgurl:require('@/assets/img/icon4.png'),
					},
					{
						title: '预约培训',
						imgurl:require('@/assets/img/icon5.png'),
					},
					{
						title: '留言中心',
						imgurl:require('@/assets/img/icon6.png'),
					},
				],
				userDate:{},
			}
		},
		created() {
			this.enterprise_id = sessionStorage.getItem('enterprise_id')
			this.getUserDate()
		},
		methods: {
			//获取账户列表
			async getUserDate(params) {
				let res = await getUserDate(params)
				if(res.errno ==0){
					this.userDate = res.data.data[0]
					console.log(this.userDate);
				} else {
					this.$toast(res.errmsg)
				}
			},
			afterRead(file) {
				this.uploadImg(file.file)
			},
			openDetail(item){
				if(item.title==='留言中心'){
					this.$router.push({name:'留言'})
				}else if(item.title==='企业信息'){
					this.$router.push({name:'企业信息'})
				}else if(item.title==='预约培训'){
					this.$router.push({name:'预约培训'})
				}
			},
			async uploadImg(params){
				let res = await uploadImg({
					imgFile:params
				})
				if(res.code === 200){
					this.imgUrl = res.data.url
				}
			},
			quitUser(){
				Dialog.confirm({
					message: '您确定要退出吗？'
				}).then(() => {
					localStorage.clear()
					sessionStorage.clear()
					this.$toast('退出成功')
					location.reload()
				}).catch(() => {
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.main{
		.head-bar{
			width: 100%;
			height:308px;
			background:linear-gradient(315deg,rgba(24,148,88,1) 0%,rgba(39,166,101,1) 100%);
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
				height:150px;
				border-radius:10px;
				padding-left: 46px;
				margin-top: 5px;
				display: flex;
				img{
					width:150px;
					height:150px;
					border-radius:10px;
					overflow: hidden;
				}
				.desc{
					flex: 3;
					font-size:26px;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(255,255,255,1);
					text-align: left;
					display: flex;
					justify-content: center;
					flex-direction: column;
					padding-left: 30px;
					p:first-child{
						font-size:32px;
						font-weight:500;
						color:rgba(255,255,255,1);
						margin-bottom: 8px;
					}
					.van-icon{
						position: absolute;
						right: 36px;
					}
				}
			}
		}
		.about {
			width: 100%;
			background:rgba(255,255,255,1);
			display: flex;
			flex-direction: column;
			justify-content: center;
			.item {
				height: 92px;
				line-height: 92px;
				font-size:32px;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(102,102,102,1);
				text-align: left;
				padding: 0 32px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 0.5px solid #E8E8E8;
				img{
					width: 40px;
					margin-right: 30px;
				}
			}
			.item:last-child{
				border:none;
			}
		}
		.btn{
			height:90px;
			line-height: 90px;
			background:rgba(255,255,255,1);
			border: none;
			font-weight:400;
			color:#47BDC3;
			margin: 418px auto 0;
			text-align: center;
			font-size:32px;
			color:rgba(153,153,153,1);
			width:648px;
			border-radius:10px;
		}
	}
</style>