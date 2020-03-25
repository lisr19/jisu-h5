<template>
	<div class="page">
		<div class="login">
			<div class="logo">
<!--				<img src="@/assets/img/logo.png" alt="">-->
				<p>环保</p>
			</div>
			<div class="inputs" >
				<input  v-model="username"  placeholder='账号' @keyup="changColor" oninput="if(value.length>11)value=value.slice(0,11)">
				<input  v-model="password"  type="password" placeholder='密码'  @keyup="changColor" name="" oninput="if(value.length>16)value=value.slice(0,16)">
			</div>

			<div class="btn" ref="loginBtn"  @click="userLogin">登录</div>

		</div>
	</div>
</template>
<script>
	import {mapActions} from 'vuex'
	import {userLogin} from '@/lib/API/comment'
	export default {

		data(){
			return{
				username:null,
				password:null,
			}
		},
		created(){

		},
		mounted(){
		},
		methods:{
			...mapActions([
				'setUserInfo'
			]),
			// 用户登录
			async userLogin(){
				if(!this.username){
					this.$toast('请输入用户名')
					return
				}
				if(!this.password){
					this.$toast('请输入密码')
					return
				}
				let params = {
					username:this.username,
					password :this.password,
				}
				let res = await userLogin(params)
				if(res.errno ==0){
					this.$toast('登录成功')
					localStorage.setItem('token',res.data.token)
					sessionStorage.setItem('token',res.data.token)
					localStorage.setItem('userId',res.data.id)
					this.$store.dispatch('setUserInfo',res.data)
					this.$router.push({name:'首页'})
				} else {
					this.$toast(res.errmsg)
				}
			},
			changColor(){
				if(!this.username|!this.password){
					this.$refs.loginBtn.style.background='#999'
				}else {
					this.$refs.loginBtn.style.background='#0075FF'
				}
			},
		}
	}
</script>
<style lang="less" scoped>
	.page{
		position: absolute;
		height: 100%;
		width: 100%;
		/*background: url("../../assets/img/login-bg.png") no-repeat;*/
		background-size:100% 100%;
		.logo{
			text-align: center;
			margin-top: 130px;
			img{
				width:130px;
				height:130px;
				display: block;
				margin: 0 auto;
			}
			p{
				font-size:32px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:44px;
				margin: 22px 0 80px;
			}
		}
		.inputs{
			border:2px solid rgba(46,79,206,0.4);
			width:612px;
			margin: 0 auto;
			border-radius:8px;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.send-box{
				width: 100%;
				position: relative;
				input{
					width: 100%;
				}
				span{
					position: absolute;
					right: 10px;
					top: 15px;
					padding: 0 10px;
					width: auto;
					min-width: 100px;
					height: 58px;
					line-height: 58px;
					font-size:24px;
					border-radius: 10px;
					color: rgba(150,150,150,1);
					border: 2px solid rgba(150,150,150,1);
				}
			}
		}
		input{
			height:88px;
			background:rgba(255,255,255,1);
			border: none;
			padding-left: 40px;
			font-size:30px;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(27,49,135,1);
			border-bottom: solid 2px rgba(46, 79, 206, 0.4);
		}
		.btn{
			width:612px;
			height:88px;
			line-height: 88px;
			background:#999;
			box-shadow:0px 4px 8px 0px rgba(5,59,123,1);
			border-radius:8px;
			font-size:30px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:#fff;
			margin: 40px auto;
		}
		.login{

		}
		.tip{
			text-align: right;
			font-size:28px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:40px;
			padding-right: 74px;
		}
	}
</style>
