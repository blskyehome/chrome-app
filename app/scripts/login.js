import Vue from 'vue';
import Login from '../component/Login.vue';
import BootstrapVue from 'bootstrap-vue';
import {bAlert,bFormFieldset,bFormInput, bBtn} from 'bootstrap-vue/lib/components'
Vue.use(BootstrapVue);

var app=new Vue({
    el:'#app',
    data:{
        name:'vue-chrome-extension'
    },
    render: h =>h(Login)
})
