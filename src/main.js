import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import echarts from 'echarts'

import 'vant/lib/index.css';
import './plugins/axios'
import './common/less/reset.less'
import './flexible.js'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(echarts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default router
