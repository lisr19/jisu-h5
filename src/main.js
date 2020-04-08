import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import "./exit";//监听返回
// import echarts from 'echarts'
import VCharts from 'v-charts';
import iView from 'iview'
//vue高德地图
import VueAMap from 'vue-amap';
import 'iview/dist/styles/iview.css'
import 'vant/lib/index.css';
import './plugins/axios'
import './common/less/reset.less'
import './flexible.js'
import './common/js/pdfmake.min.js'
import './common/js/vfs_fonts.js'

//地区分级
import iviewArea from 'iview-area';
Vue.use(iviewArea);
// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(iView)
Vue.use(VCharts)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '5a0f5e90497c439340f86b81748bf1ca',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'MarkerClusterer']
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default router
