import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: '首页',
		meta: { keepAlive: true },
		component: () => import('@/views/home/index.vue')
	},
	{
		path: '/login',
		name: '登录',
		component: () => import('@/views/login/login.vue')
	},

	{
		path: '/msg',
		name: '留言',
		component: () => import('@/views/my/message.vue')
	},
	{
		path: '/train',
		name: '预约培训',
		component: () => import('@/views/my/train.vue')
	},
	{
		path: '/alarm',
		name: '告警',
		component: () => import('@/views/alarm/alarm.vue')
	},
	{
		path: '/enterprise',
		name: '企业信息',
		component: () => import('@/views/enterprise/enterprise.vue')
	},
	{
		path: '/eia',
		name: '环评',
		component: () => import('@/views/eia/eia.vue')
	},
	{
		path: '/eia-detail',
		name: '环评基本信息详情',
		component: () => import('@/views/eia/eia-detail.vue')
	},
	{
		path: '/other-eia',
		name: '其他环保手续',
		component: () => import('@/views/eia/other-eia.vue')
	},
	{
		path: '/third-ent',
		name: '第三方公司',
		component: () => import('@/views/third-ent/third-ent.vue')
	},
	{
		path: '/third-detail',
		name: '第三方公司详情',
		component: () => import('@/views/third-ent/third-detail.vue')
	},
	{
		path: '/develop',
		name: '建设',
		component: () => import('@/views/my/develop.vue')
	},
]

const router = new VueRouter({
	routes
})
// router.beforeEach((to, from, next) => {
// 	if(to.name==='登录'){
// 		if(sessionStorage.getItem('token')){
// 			return
// 		}
// 	}
// 	next();
// })
export default router
