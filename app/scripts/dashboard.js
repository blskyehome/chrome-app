import Vue from 'vue';
import Main from '../component/view/Dashboard.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert, bBtn} from 'bootstrap-vue/lib/components'
import Popover from 'vue-js-popover'

import Toasted from 'vue-toasted';
Vue.use(Toasted)
Vue.use(BootstrapVue);

Vue.use(Popover)

var app=new Vue({
  el:'#app',
  data:{
    name:'link'
  },
  render: h =>h(Main)
})
