import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate'; // VeeValidate
import zhTW from 'vee-validate/dist/locale/zh_TW'; // 中文
import VueI18n from 'vue-i18n'; // vue-i18n

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.use(VueAxios, axios);
// vue-i18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW,
  }
})

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter); // 全域啟用

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

new Vue({
  i18n, // 把 i18n 載入
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('from', from);
  console.log('next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    });
  } else {
    next();
  }
})
