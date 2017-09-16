<template>
    <nav class="col-sm-3 col-md-2 d-none d-sm-block  sidebar">
        <div class="profile">
            <div class="avatar-content"><a href="user.html"><img v-bind:src="user.avatar_image.url" v-bind:alt="user.user_name"></a></div>
            <div class="user-name">
                {{user.user_name}}
            </div>
            <div class="user-email">{{user.email}}</div>
        </div>
        <ul class="nav nav-pills flex-column sidebar-ul">
            <li class="nav-item">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                <a class="nav-link"  v-bind:class="active=='linkPage'?'active-page':''" href="link.html">
                    <i class="fa fa-link"></i>
                    链接</a>
            </li>
            <li class="nav-item">
                <a class="nav-link "  v-bind:class="active=='categoryPage'?'active-page':''" href="category.html">
                    <i class="fa fa-folder-o"></i>
                    分类</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  v-bind:class="active=='categoryNewPage'?'active-page':''"  href="category-new.html">
                    <i class="fa fa-plus-square"></i>
                    新建分类</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="active=='importPage'?'active-page':''" href="import.html">
                    <i class="fa fa-bookmark"></i>
                    书签导入</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="active=='historyPage'?'active-page':''" href="history.html">
                    <i class="fa fa-history"></i>
                    历史导入</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" v-bind:class="active=='userPage'?'active-page':''" href="user.html">
                    <i class="fa fa-user"></i>
                    个人信息</a>
            </li>
        </ul>
    </nav>
</template>
<script>
  import config from '../scripts/config'
  import axios from 'axios'
  export default{
    name: 'SidebarMenu',
    data(){
      return{
        isActive:'import',
        user: {
          avatar_image: {
            url: '/images/avatar/blank.png'
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
            this.user.avatar_image = {url: '/images/avatar/xiaohuangren.jpg'}
          }
        })
      .catch(error => {
          // Request failed.
          console.log('error', error)
          this.error = error.response.statusText
        })
      }

    },
    mounted () {
      this.getUserInfo()
    },
    props: {
      active: {
        type: String,
        default:'options'
      }
    }
  }
</script>
<style>
    .sidebar {
        position: fixed;
        top: 56px;
        bottom: 0;
        left: 0;
        z-index: 1000;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    /* Sidebar navigation */
    .sidebar {
        padding-left: 0;
        padding-right: 0;
    }

    .sidebar .nav {
        margin-bottom: 20px;
    }

    .sidebar .nav-item {
        width: 100%;
    }

    .sidebar .nav-item + .nav-item {
        margin-left: 0;
    }

    .sidebar .nav-link {
        border-radius: 0;
    }
    .avatar-content img{
        width: 33%;
        display: block;
        margin: 0 auto;
        border: solid 2px #F1C40F;
        border-radius: 50%;
       cursor: pointer;
    }
    .user-name{
        text-align: center;
        color: #F1C40F;
        font-size: 16px;
        font-weight: bold;
        margin: 10px;
    }
     .active-page {
        color: #fff;
        cursor: default;
        background-color: #1ABC9C;
    }
    .sidebar-ul{
        margin: 0 30px;
        background: #ffffff;
    }
    .user-email{
        text-align: center;
        color: #99979c;
        font-size: 13px;
        margin: 8px;
    }
</style>