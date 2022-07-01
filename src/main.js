import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.less';
import 'amfe-flexible'
import '@/styles/icon.less'
import '@/styles/reset.less'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
Vue.use(Vant);

// 一次性把filters/index.js中所有的按需导出全部导出来作为obj的属性
import * as obj from '@/fliters'
Object.keys(obj).forEach(key=>{
  Vue.filter(key,obj[key])
})

Vue.config.productionTip = false
Vue.component('MyIcon',MyIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
