// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import Notify from 'vue2-notify';
import esLocale from 'vee-validate/dist/locale/es';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import router from './router';


const veeValidateConfig = {
  locale: 'es',
};

const notificationTypes = {
  info: { itemClass: 'is-info', iconClass: 'fa fa-lg fa-exclamation-circle' },
  error: { itemClass: 'is-danger', iconClass: 'fa fa-lg fa-exclamation' },
  warning: { itemClass: 'is-warning', iconClass: 'fa fa-lg fa-exclamation-triangle' },
  success: { itemClass: 'is-success', iconClass: 'fa fa-lg fa-check-circle' },
};

Validator.addLocale(esLocale);

Vue.use(VeeValidate, veeValidateConfig);
Vue.use(Notify, {
  itemClass: 'notification',
  position: 'bottom-right',
});

Vue.$notify.setTypes(notificationTypes);

Vue.config.keyCodes = {
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  g: 71,
  p: 80,
  t: 84,
  u: 85,
  w: 87,
};
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
