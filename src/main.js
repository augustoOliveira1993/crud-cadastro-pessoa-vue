import VueMask from 'v-mask';
import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false
Vue.use(VueMask);
new Vue({
  render: h => h(App),
}).$mount('#app')
