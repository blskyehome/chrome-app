<template lang="html">
    <div class="container wrapper">
        <div class="logo-content">
           <img src="/images/icon-128.png" alt="Logo" class="img-rounded center-block">
       </div>
        <div class="form-group">
            <input class="form-control typeahead-only" type="text" v-model="user_name" placeholder="用户名/邮箱"/>
            <span class="form-control-feedback  fui-user"></span>
        </div>
        <div class="form-group">
            <input class="form-control typeahead-only" type="password"  v-model="password" placeholder="密码"/>
            <span class="form-control-feedback  fui-lock"></span>
        </div>
        <div v-if="error">{{error}}</div>
        <button @click="login" type="button" class="btn btn-primary btn-block">登录</button>
        <a href="register.html"  class="btn btn-link btn-block">注册</a>
    </div>
</template>

<script>
    import axios from 'axios';
    import config from '../scripts/config'

    import common from '../scripts/common.js'
    export default {
        data(){
            return {
                isLogin:false,
                error:null,
                user_name: '',
                password: '',
            }
        },
        computed: {
            feedback() {
                return this.user_name.length ? '' : 'Please enter something';
            },
            state() {
                return this.user_name.length ? 'success' : 'primary';
            },
        },
        methods: {
            login:function () {
                let _this=this;
                axios.post(config.serverURI + '/token/user',
                    {user_name: this.user_name, password: this.password}
                )
                    .then(function (response) {
                        console.log(response.data.token);
                        localStorage.token = response.data.token;
                        location.href='link.html'

                    })
                    .catch(function (error) {

                        console.log(error);
                        _this.error=error.response.data.msg;
                    });
            }
        },
        components: {}
    }
</script>

<style lang="css">
</style>
