<template>
	<div class="page">
		<head-bar title="建设中……"></head-bar>
		<div>
			<img src="@/assets/img/null2.png" alt="">
			建设中…
		</div>
	</div>
</template>

<script>
	import headBar from '@/components/head-bar/head-bar'
	export default {
		components:{
			headBar,
		},
		data() {
			return {

			}
		},
		created() {

		},
		mounted(){

		},
		methods: {

		},
	}
</script>


<style lang="less" scoped>
	.page{
		padding-top: 350px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 45px;
		img{
			width: 100%;
			margin-bottom: 50px;
		}
	}
</style>
