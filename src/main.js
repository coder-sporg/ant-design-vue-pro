import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// // 全局引入组件
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// Vue.use(Antd);

// // 按需引入组件
// import Button from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";
// Vue.use(Button);

// 全局注册函数-局部引用AntD
import { globalRegister } from './global'
Vue.use(globalRegister)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
