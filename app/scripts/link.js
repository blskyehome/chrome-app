import Vue from 'vue';
import Main from '../component/view/Link.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert, bBtn} from 'bootstrap-vue/lib/components'
import Toasted from 'vue-toasted';
Vue.use(Toasted)
Vue.use(BootstrapVue);


var app=new Vue({
  el:'#app',
  data:{
    name:'link'
  },
  render: h =>h(Main)
})
