import Vue from 'vue';
import Options from '../component/options.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert, bBtn} from 'bootstrap-vue/lib/components'
Vue.use(BootstrapVue);

var app=new Vue({
  el:'#app',
  data:{
    name:'vue-chrome-extension'
  },
  render: h =>h(Options)
})
