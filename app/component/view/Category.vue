<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <h1>Dashboard</h1>

                    <section class=" placeholders">
                        <div v-if="error">
                            Found an error
                        </div>
                        <div v-else>
                            <div   v-if="categoryItem" class="row">

                                <div class="col-3" v-for="(item,index) in categoryItem">
                                    <div class="card">
                                        <div class="card-block">
                                                <h5 class="card-title">{{item.name }}</h5>
                                            <p class="card-text">{{item.description?item.description:'没有描述'}}</p>
                                            <a href="#" class="card-link" @click="confirmDelete(item)">删除</a>
                                            <a href="#" class="card-link" @click="forModify(item)" >修改</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-6 col-xs-12" v-if="numFlag">
                                    <button class="btn  btn-info btn-block" @click="loadMore">更多</button>
                                </div>
                            </div>
                        </div>
                        <b-modal v-if="categoryForDelete"
                                v-model="deleteModalShow"
                                ok-title="确定"
                                close-title="取消"
                                title="deleteCategory？"
                                 @ok="deleteCategory"
                        >
                            标题：<span>{{categoryForDelete.name}}</span>
                        </b-modal>
                        <b-modal v-if="categoryForModify"
                                 v-model="modifyModalShow"
                                 ok-title="确定"
                                 close-title="取消"
                                 title="修改"
                                 @ok="modifyCategory"
                        >
                            <div class="form-group">
                                <label class="control-label">分类名:</label>
                                <input type="text" class="form-control" v-model="categoryForModify.name">
                            </div>

                            <div class="form-group">
                                <label  class="control-label">描述:</label>
                                <textarea class="form-control" rows="3" v-model="categoryForModify.description"></textarea>
                            </div>
                        </b-modal>
                    </section>
                </main>
            </div>
        </div>
    </div>

</template>

<script>
  import Hello from '../hello.vue'
  import SidebarMenu from '../SidebarMenu.vue'
  import Navbar from '../Navbar.vue'
  import config from '../../scripts/config'
  import axios from 'axios'
  export default {
    data () {
      return {
        githubUrl: config.serverURI + '/user/link',
        error: null,
        color: null,
        page: 2,
        categoryForModify: null,
        categoryForDelete: null,
        categoryItem: {},
        keyword: '',
        numFlag: false,
        deleteModalShow:false,
        modifyModalShow:false
      }
    },
    methods: {
      getCategoryItem () {
        axios({
          method: 'get',
          url: config.serverURI + '/user/category',
          params: {
            token: localStorage.token,
            size: 24
          }
        })
          .then(response => {
            console.log('GitHub Response:', response)
            if (response.status !== 200) {
              this.error = response.statusText
              return
            }
            if (response.data.data.length >= 24) {
              this.numFlag = true
            }
            if (response.data.data === 0) {
              this.$toasted.success('已经加载完所有的链接', {
                theme: 'bubble',
                position: 'top-center',
                duration: 2000
              })
            }
            this.categoryItem = response.data.data
            if (this.categoryItem.length === 0) {
              this.$toasted.success(
                '<span class="fa fa-bell"></span><span>暂时没有内容~</span>',
                {
                  theme: 'bubble',
                  position: 'top-center',
                  duration: 2000
                })
            }
          })
          .catch(error => {
            // Request failed.
            console.log('error', error.response)
            this.error = error.response.statusText
          })
      },
      loadMore: function () {
        axios({
          method: 'get',
          url: config.serverURI + '/user/category',
          params: {
            token: localStorage.token,
            size: 24,
            page: this.page
          }
        })
          .then(response => {
            console.log('GitHub Response:', response)
            if (response.status !== 200) {
              this.error = response.statusText
              return
            }
//          this.$set(this, 'response', response.data.data)
            this.categoryItem = this.categoryItem.concat(response.data.data)
            this.page = this.page + 1
            console.log(this.categoryItem)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
//          this.error = error.response.statusText
          })
      },
      confirmDelete: function (item) {
        this.categoryForDelete = item
        this.deleteModalShow = !this.deleteModalShow
        console.log(this.categoryForDelete)
      },
      forModify: function (item) {
        this.categoryForModify = item
        this.modifyModalShow = !this.modifyModalShow
      },
      deleteCategory: function () {
        axios({
          method: 'delete',
          url: config.serverURI + '/category/' + this.categoryForDelete.id,
          params: {
            token: localStorage.token
          }
        })
          .then(response => {
            let index = this.categoryItem.indexOf(this.categoryForDelete)
            this.categoryItem.splice(index, 1)
            this.$toasted.success('删除成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
            console.log(response)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
//          this.error = error.response.statusText
          })
      },
      modifyCategory: function () {
        axios({
          method: 'put',
          url: config.serverURI + '/category/' + this.categoryForModify.id,
          data: {
            token: localStorage.token,
            name: this.categoryForModify.name,
            description: this.categoryForModify.description
          }
        })
          .then(response => {
            this.$toasted.success('<span class="fa fa-bell"></span>修改成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })

            console.log(response)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('修改失败!' + error.response.data.msg, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
//          this.error = error.response.statusText
          })
      }
    },
    components: {
      Hello, SidebarMenu, Navbar
    },
    mounted () {
      this.getCategoryItem()
    }
  }
</script>

<style lang="css">
    .sidebar {
        position: fixed;
        top: 56px;
        bottom: 0;
        left: 0;
        z-index: 1000;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
        border-right: 1px solid #eee;
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

    /*
     * Dashboard
     */

    /* Placeholders */
    .placeholders {
        padding-bottom: 3rem;
    }

    .placeholder img {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    .card-title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
