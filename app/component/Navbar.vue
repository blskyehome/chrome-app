<template>
    <b-navbar toggleable type="inverse" variant="info" fixed="top">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-link class="navbar-brand" to="#">
            <span>Blskye</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">

            <b-nav is-nav-bar>
                <b-nav-item href="http://www.blskye.com" target="_blank">官网</b-nav-item>
                <b-nav-item>工具</b-nav-item>
            </b-nav>

            <b-nav is-nav-bar class="ml-auto">
                        <img class="avatar" v-bind:src="user.avatar_image.url" alt="">
                <b-nav-item-dropdown right>

                    <!-- Using text slot -->
                    <template slot="text">
                        <span style="font-weight: bold;">{{user.user_name}}</span>
                    </template>

                    <b-dropdown-item to="#" @click="signOut">退出登录</b-dropdown-item>
                </b-nav-item-dropdown>

            </b-nav>
        </b-collapse>
    </b-navbar>
</template>
<script>
  import config from '../scripts/config'
  import axios from 'axios'
  export default{
    name: 'Navbar',
    data: function () {
      return {
        error: '',
        user: {
          avatar_image: {
            url: ''
          },
          email: 'user@blskye.com',
          user_name: 'User Name'
        }
      }
    },
    methods:{
      getUserInfo () {
        axios({
          method: 'get',
          url: config.serverURI + '/user',
          params: {
            token: localStorage.token
          }
        })
          .then(response => {
            console.log('Response:', response)
            this.user = response.data.user
            console.log(this.user.avatar_image)
            if (this.user.avatar_image === null) {
              this.user.avatar_image = {url: config.baseURI + '/avatar/f72af3a670d5d56ead98684b409b941f.jpeg'}
            }
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.error = error.response.statusText
          })
      },
      signOut () {
        axios({
          method: 'delete',
          url: config.serverURI + '/token/user',
          params: {
            token: localStorage.token
          }
        })
          .then(response => {
            console.log(response)
            localStorage.removeItem('token')
            location.href='login.html'
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created(){
      console.log('created')
      console.log(localStorage.token)
      if (localStorage.token===null||localStorage.token===undefined){
        location.href='login.html'
      }
    },
    mounted () {
      this.getUserInfo()
    }
  }
</script>
<style>
    .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>