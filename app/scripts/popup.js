import Vue from 'vue';
import App from '../component/app.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert, bBtn,bFormInput,bFormSelect,bFormRadio} from 'bootstrap-vue/lib/components'
Vue.use(BootstrapVue);

var app=new Vue({
  el:'#app',
  data:{
    name:'vue-chrome-extension'
  },
  render: h =>h(App)
})
