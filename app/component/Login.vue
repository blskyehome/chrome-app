<template lang="html">
    <div class="container">
       <div>
           <img src="/images/icon-128.png" alt="Logo" class="img-rounded center-block">
       </div>
        <b-form-fieldset
                :feedback="feedback"
                description="您可以输入用户名或者邮箱"
                label="User Name"
                :state="state"
                :label-size="1"
        >

            <b-form-input v-model="user_name"></b-form-input>

        </b-form-fieldset>
        <b-form-fieldset
                label="Password"
                :state="state"
                :label-size="1"
        >


            <b-form-input v-model="password" type="password"></b-form-input>

        </b-form-fieldset>
        <div v-if="error">{{error}}</div>
        <b-btn @click="login" variant="info" class="m-1">Login</b-btn>
    </div>
</template>

<script>
    import axios from 'axios';
    import common from '../scripts/common.js'
    const api = 'http://api.blskye.dev/v1';
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
                return this.user_name.length ? 'success' : 'warning';
            },
        },
        methods: {
            login:function () {
                let _this=this;
                axios.post(api + '/token/user',
                    {user_name: this.user_name, password: this.password}
                )
                    .then(function (response) {
                        console.log(response.data.token);
                        localStorage.token = response.data.token;

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
