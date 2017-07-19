<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu :active="activePage"></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <h1>Dashboard</h1>

                    <section class=" placeholders">
                        <div v-if="error">
                            Found an error
                        </div>
                        <div v-else>

                            <div v-if="response" class="row">
                                <div class="col-12">
                                    <b-input-group>
                                        <b-form-input v-model="keyword"></b-form-input>

                                        <!-- Attach Right button -->
                                        <b-input-group-button slot="right">
                                            <b-button class="btn-info">搜索</b-button>
                                        </b-input-group-button>

                                    </b-input-group>
                                </div>
                                <div class="col-md-12">
                                    <button v-if="categoryItem" v-for=" (item,id) in categoryItem "
                                            @click="getLinkByCategory(item.id)" class="btn"
                                            v-bind:class="'bg-'+id +' font-white category-btn'">{{item.name}}
                                    </button>
                                </div>
                                <br>
                                <div class="col-3" v-for="(item,index) in response">
                                    <div class="card">
                                        <div class="card-block">
                                            <a v-bind:href="item.url" target="_blank">
                                                <h5 class="card-title">{{item.title }}</h5>
                                            </a>
                                            <h6 v-if="item.category" class="card-subtitle mb-2 color-19">
                                                {{item.category.name}} </h6>
                                            <h6 v-else="item.category" class="card-subtitle mb-2 color-19">未分类</h6>
                                            <p class="card-text">{{item.comment }}</p>
                                            <a href="#" class="card-link pull-right" @click="confirmDelete(item)"><i class="fa fa-trash-o"></i> 删除</a>
                                            <a href="#" class="card-link pull-right" @click="forModify(item)"><i class="fa fa-pencil"></i>修改</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <spinner v-if="loading"></spinner>
                                </div>
                                <div class="col-md-12 col-sm-6 col-xs-12" v-if="numFlag">
                                    <button class="btn  btn-info btn-block" @click="loadMore">更多</button>
                                </div>
                            </div>
                        </div>
                        <b-modal v-if="linkForDelete"
                                 v-model="deleteModalShow"
                                 ok-title="确定"
                                 close-title="取消"
                                 title="确定要删除？"
                                 @ok="deleteLink"
                        >
                            标题：<span>{{linkForDelete.title}}</span>
                        </b-modal>
                        <b-modal v-if="linkForModify"
                                 v-model="modifyModalShow"
                                 ok-title="确定"
                                 close-title="取消"
                                 title="修改"
                                 @ok="modifyLink"
                        >
                            <div class="form-group">
                                <label class="control-label">标题:</label>
                                <input type="text" class="form-control" v-model="linkForModify.title">
                            </div>
                            <div class="form-group">
                                <label class="control-label">链接:</label>
                                <input type="text" class="form-control" v-model="linkForModify.url">
                            </div>
                            <div class="form-group" v-if="categoryItem">
                                <label class="control-label">分类:</label>
                                <select class="form-control" v-model="linkForModify.category_id">
                                    <option v-for="item in categoryItem" v-bind:value="item.id"
                                            v-if="item.id==linkForModify.category_id " selected="selected">{{item.name}}
                                    </option>
                                    <option v-for="item in categoryItem" v-bind:value="item.id"
                                            v-if="item.id!=linkForModify.category_id ">{{item.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label">是否公开:</label>
                                <label class="radio-inline">
                                    <input type="radio" name="openness" value="1" v-model="linkForModify.openness"> 公开
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="openness" value="2" v-model="linkForModify.openness"> 私有
                                </label>

                            </div>
                            <div class="form-group">
                                <label class="control-label">备注:</label>
                                <textarea class="form-control" rows="3" v-model="linkForModify.comment"></textarea>
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
  import Spinner from 'vue-simple-spinner'

  export default {
    data () {
      return {
        activePage: 'linkPage',
        githubUrl: config.serverURI + '/user/link',
        response: {},
        error: null,
        color: null,
        page: 2,
        linkForModify: null,
        linkForDelete: null,
        categoryItem: null,
        keyword: '',
        numFlag: false,
        newLink: {},
        deleteModalShow: false,
        modifyModalShow: false,
        categoryId: null,
        loading: false
      }
    },

    methods: {
      getLinkByCategory(category_id){
        this.categoryId = category_id
      },
      callGitHub () {
        let url = config.serverURI + '/user/link'
        console.log(this.categoryId)
        if (this.categoryId) {
          url = config.serverURI + '/user/category/' + this.categoryId + '/link'
        }
        this.loading = true
        axios({
          method: 'get',
          url: url,
          params: {
            token: localStorage.token,
            size: 24,
            category_id: this.categoryId,
            keyword: this.keyword
          }
        })
          .then(response => {
          console.log('GitHub Response:', response)
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
        this.response = response.data.data
        console.log('1', this.numFlag)
        console.log('长度', response.data.data.length)
        console.log('数据', response.data)
        if (response.data.data.length >= 24) {
          this.numFlag = true
        } else {
          this.numFlag = false
        }
        console.log('2', this.numFlag)
        this.loading = false
        if (response.data.data === 0) {
          this.$toasted.success('已经加载完所有的链接', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000
          })
        }
        if (this.response.length === 0) {
          this.$toasted.success('暂时没有内容', {
            theme: 'bubble',
            position: 'top-center',
            duration: 2000
          })
        }
        console.log('链接', this.response.length)
      })
      .
        catch(error => {
          // Request failed.
          console.log('error', error)
        this.error = error
      })
      },
      getCategoryItem () {
        axios({
          method: 'get',
          url: config.serverURI + '/user/category',
          params: {
            token: localStorage.token
          }
        })
          .then(response => {
            console.log('GitHub Response:', response)
            if (response.status !== 200) {
              this.error = response.statusText
              return
            }
            this.categoryItem = response.data.data
          })
          .catch(error => {
            // Request failed.
            console.log('error', error.response)
            this.error = error.response.statusText
          })
      },
      loadMore: function () {
        let url = config.serverURI + '/user/link'
        console.log(this.categoryId)
        this.loading = true
        if (this.categoryId) {
          url = config.serverURI + '/user/category/' + this.categoryId + '/link'
        }
        axios({
          method: 'get',
          url: url,
          params: {
            token: localStorage.token,
            size: 24,
            page: this.page,
            category_id: this.categoryId
          }
        })
          .then(response => {
          console.log('GitHub Response:', response)
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
//          this.$set(this, 'response', response.data.data)
        this.response = this.response.concat(response.data.data)
        this.page = this.page + 1
        console.log(this.response)
        this.loading = false
        if (response.data.data.length < 24) {
          this.numFlag = false
        } else {
          this.numFlag = true
        }
      })
        .
        catch(error => {
          // Request failed.
          console.log('error', error)
//          this.error = error.response.statusText
      })
      },
      confirmDelete: function (item) {
        this.linkForDelete = item
        this.deleteModalShow = !this.deleteModalShow
        console.log(this.linkForDelete)
      },
      forModify: function (item) {
        this.modifyModalShow = !this.modifyModalShow
        this.linkForModify = item
      },
      deleteLink: function () {
        axios({
          method: 'delete',
          url: config.serverURI + '/link/' + this.linkForDelete.id,
          params: {
            token: localStorage.token
          }
        })
          .then(response => {
            let index = this.response.indexOf(this.linkForDelete)
            this.response.splice(index, 1)
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
      modifyLink: function () {
        axios({
          method: 'put',
          url: config.serverURI + '/link/' + this.linkForModify.id,
          data: {
            token: localStorage.token,
            openness: 1,
            category_id: this.linkForModify.category_id,
            title: this.linkForModify.title,
            url: this.linkForModify.url,
            comment: this.linkForModify.comment
          }
        })
          .then(response => {
            this.$toasted.success('修改成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
            console.log(response)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('修改失败!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
//          this.error = error.response.statusText
          })
      },
      newLinkPost () {
        axios({
          method: 'post',
          url: config.serverURI + '/link',
          data: {
            token: localStorage.token,
            url: this.newLink.url,
            title: this.newLink.title,
            openness: this.newLink.openness,
            category_id: this.newLink.category_id,
            comment: this.newLink.comment
          }
        })
          .then(response => {
            this.$toasted.success('添加成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
            console.log(response)
            this.response.unshift(this.newLink)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('添加失败!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
//          this.error = error.response.statusText
          })
      }
    },
    mounted () {
      this.getCategoryItem()
      this.callGitHub()
    },
    watch: {
      'keyword': 'callGitHub',
      'categoryId': 'callGitHub'
    },
    components: {
      Hello, SidebarMenu, Navbar, Spinner
    }
  }
</script>

<style lang="css">
    .placeholders {
        padding-bottom: 3rem;
    }

    .placeholder img {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .card-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category-btn {
        margin: 10px;
    }
</style>
