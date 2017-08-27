// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import esLocale from 'vee-validate/dist/locale/es';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './App';
import router from './router';


const veeValidateConfig = {
  locale: 'es',
};

Validator.addLocale(esLocale);

Vue.use(VeeValidate, veeValidateConfig);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
