import Vue from 'vue';
import Login from '../component/Register.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert,bFormFieldset,bFormInput, bBtn} from 'bootstrap-vue/lib/components'
import Toasted from 'vue-toasted';
Vue.use(Toasted)
Vue.use(BootstrapVue);

var app=new Vue({
    el:'#app',
    data:{
        name:'vue-chrome-extension'
    },
    render: h =>h(Login)
})
