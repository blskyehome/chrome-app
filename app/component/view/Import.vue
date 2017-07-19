<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu :active="activePage"></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <h1>Dashboard</h1>

                    <!--<section class=" placeholders">
                        <item
                                class="item"
                                :model="treeData">
                        </item>
                    </section>-->
                    <section class="placeholders">
                      <div class="row">
                          <div class="col-12">
                              <spinner v-if="loading"></spinner>
                          </div>
                      </div>
                        <form class="form-inline">
                            <div class="form-group">
                                <label for="category" class="sr-only"></label>
                                <p class="form-control-static">分类：</p>
                            </div>
                            <div class="form-group">
                                <label for="category" class="sr-only"></label>
                                <select id="category" class="form-control" v-model="categoryId">
                                    <option v-for="item in categoryItem" v-bind:value="item.id">{{item.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button type="button" @click="batchImportLinks" class="btn btn-info">批量导入</button>
                            </div>
                        </form>
                    </section>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th><label>
                                    <input type="checkbox" v-model="isCheckedAll">全选/反选
                                </label></th>
                                <th>标题</th>
                                <th>链接</th>
                                <th>分类</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in erweiBookMarkData">
                                <td><input type="checkbox" v-model="item.isChecked"></td>
                                <td class="td">{{item.title}}</td>
                                <td class="td"><a v-bind:href="item.url" target="_blank">{{item.url}}</a></td>
                                <td>
                                    <div class="form-group" v-if="categoryItem">
                                        <select class="form-control" v-model="item.category_id">
                                            <!--    <option v-for="item in categoryItem" v-bind:value="item.id"
                                                        v-if="item.id==linkForModify.category_id " selected="selected">{{item.name}}
                                                </option>-->
                                            <option v-for="item in categoryItem" v-bind:value="item.id">{{item.name}}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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

  //  import Item from '../Item.vue'
  export default {
    data () {
      return {
        activePage:'importPage',
        treeData: {
        },//树状结构 书签
        erweiBookMarkData: [],//二维数组 书签
        categoryId: null,
        categoryItem: null,
        isCheckedAll: false,
        loading:false
      }
    }
    ,
    methods: {
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
            this.categoryId = this.categoryItem[0].id
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.error = error.response.statusText
          })
      },
      getChromeBookmark(){
        let _this = this
        chrome.bookmarks.getTree(function (bookmarkArray) {
          console.log('Book Mark', bookmarkArray);
          _this.treeData = bookmarkArray[0]
          _this.traverse(_this.treeData, _this.process); //将树状 转换成 二维
          console.log('二维', _this.erweiBookMarkData)
        });
      },
      process(key, value) {
        if (typeof(value) == "object") {
          if (value.url != undefined) {
//            value.category_id =  this.categoryId
            this.erweiBookMarkData.push(value)
          }
        }
      },
      traverse(o, func) {
        for (var i in o) {
          func.apply(this, [i, o[i]]);
          if (o[i] !== null && typeof(o[i]) == "object") {
            //going one step down in the object tree!!
            this.traverse(o[i], func);
          }
        }
      },
      batchImportLinks(){
        this.loading=true
        console.log(this.erweiBookMarkData)
        if (this.erweiBookMarkData==null){
          this.$toasted.error('请先勾选您要导入的链接!', {
            theme: 'bubble',
            position: 'top-center',
            duration: 5000
          })
          return
        }
        axios({
          method: 'post',
          url: config.serverURI + '/links',
          data: {
            token: localStorage.token,
            category_id: this.categoryId,
            link_list: this.erweiBookMarkData
          }
        })
          .then(response => {
            this.loading=false
            console.log('Response:', response)
            this.$toasted.success('导入成功', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
          .catch(error => {
            this.loading=false

            // Request failed.
            console.log('error', error)
            this.$toasted.error('导入失败请重试!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
      },
      checkedAll(){
//        this.isCheckedAll=!this.isCheckedAll
        this.erweiBookMarkData.forEach(function (item) {
          item.isChecked = !item.isChecked
        });
        console.log(this.erweiBookMarkData)
      }
    }
    ,

    created(){
      this.getCategoryItem()
      this.getChromeBookmark()
    },
  mounted()
  {
    }
    ,
    watch: {
      'isCheckedAll': 'checkedAll'
    }
    ,
    components: {
      Hello, SidebarMenu, Navbar,Spinner
      //Item
    }
  }
</script>

<style lang="css">


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

    .card-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .td {
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
