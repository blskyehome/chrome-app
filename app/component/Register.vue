<template lang="html">
    <div class="container wrapper">
       <div>
           <img src="/images/icon-128.png" alt="Logo" class="img-rounded center-block">
       </div>
        <div class="form-group">
            <input class="form-control typeahead-only" type="text" v-model="email" placeholder="邮箱"/>
            <span class="form-control-feedback   fa-envelope"></span>
        </div>
        <div class="mgb20 input-group">
            <span class="input-group-addon" @click="getCaptcha">获取验证码</span>
            <input type="text" class="form-control" v-model="captcha" placeholder="验证码">
        </div>
        <div class="form-group">
            <input class="form-control typeahead-only" type="text" v-model="user_name" placeholder="昵称"/>
            <span class="form-control-feedback  fui-user"></span>
        </div>
        <div class="form-group">
            <input class="form-control typeahead-only" type="password"  v-model="password" placeholder="密码"/>
            <span class="form-control-feedback  fui-lock"></span>
        </div>

        <div v-if="error">{{error}}</div>
        <button  type="button" class="btn btn-primary btn-block" @click="userRegister">注册</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import common from '../scripts/common.js'
    import config from '../scripts/config'

    const api = 'http://api.blskye.dev/v1';
    export default {
        data(){
            return {
                isLogin:false,
                error:null,
              section: 'Login',
              loading: '',
              user_name: '',
              password: '',
              email: '',
              captcha: '',
              response: ''
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
          getCaptcha () {
            axios({
              method: 'post',
              url: config.serverURI + '/user/captcha',
              data: {
                email: this.email
              }
            })
              .then(response => {
              console.log('Response:', response)
              this.$toasted.success('邮件已发送至' + this.email, {
                theme: 'bubble',
                position: 'top-center',
                duration: 5000
              })
            })
          .catch(error => {
              // Request failed.
              console.log('error', error)
              this.$toasted.error('邮件发送失败!' + error.response.statusText, {
                theme: 'bubble',
                position: 'top-center',
                duration: 5000
              })
            })
          },
          userRegister () {
            axios.post(config.serverURI + '/user?XDEBUG_SESSION_START=17000',
              {
                email: this.email,
                user_name: this.user_name,
                password: this.password,
                captcha: this.captcha
              }
            )
              .then(response => {
              console.log('Response:', response)
              this.$toasted.success('用户注册成功' + this.email, {
                theme: 'bubble',
                position: 'top-center',
                duration: 5000
              })
              var token = response.data.msg[1]
              if (window.localStorage) {
                window.localStorage.setItem('token', token)
              }
              location.href='link.html'
            })
          .catch(error => {
              // Request failed.
              console.log('error', error)
              this.$toasted.error('用户注册失败!' + error.response.data.msg, {
                theme: 'bubble',
                position: 'top-center',
                duration: 5000
              })
            })
          }
        },
        components: {}
    }
</script>

<style lang="css">
    .mgb20{
        margin-bottom: 20px;
    }
</style>
