<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <h1>Dashboard</h1>

                    <section class=" placeholders">
                        <item
                                class="item"
                                :model="treeData">
                        </item>
                    </section>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th><input type="checkbox" v-model="isCheckedAll" ></th>
                                <th>标题</th>
                                <th>链接</th>
                                <th>选择分类</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in erweiBookMarkData">
                                <td><input type="checkbox" v-model="item.isChecked"></td>
                                <td class="td">{{item.title}}</td>
                                <td class="td">{{item.url}}</td>
                                <td>
                                    <div class="form-group" v-if="categoryItem">
                                        <label class="control-label">分类:</label>
                                        <select class="form-control" v-model="item.category_id">
                                            <!--    <option v-for="item in categoryItem" v-bind:value="item.id"
                                                        v-if="item.id==linkForModify.category_id " selected="selected">{{item.name}}
                                                </option>-->
                                            <option v-for="item in categoryItem" v-bind:value="item.id">{{item.name}}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td>sit</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="form-group" v-if="categoryItem">
                        <label class="control-label">分类:</label>
                        <select class="form-control" v-model="categoryId">
                        <!--    <option v-for="item in categoryItem" v-bind:value="item.id"
                                    v-if="item.id==linkForModify.category_id " selected="selected">{{item.name}}
                            </option>-->
                            <option v-for="item in categoryItem" v-bind:value="item.id">{{item.name}}
                            </option>
                        </select>
                    </div>
                    <button @click="batchImportLinks">批量导入</button>
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
  import Item from '../Item.vue'
  export default {
    data () {
      return {
        treeData:   {
          title: 'My Tree',
          children: [
            { title: 'hello' },
            { title: 'wat' },
            {
              title: 'child folder',
              children: [
                {
                  title: 'child folder',
                  children: [
                    { title: 'hello' },
                    { title: 'wat' }
                  ]
                },
                { title: 'hello' },
                { title: 'wat' },
                {
                  title: 'child folder',
                  children: [
                    { title: 'hello' },
                    { title: 'wat' }
                  ]
                }
              ]
            }
          ]
        },//树状结构 书签
        erweiBookMarkData:[],//二维数组 书签
        categoryId:null,
        categoryItem:null,
        isCheckedAll:false
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
          })
          .catch(error => {
            // Request failed.
            console.log('error', error.response)
            this.error = error.response.statusText
          })
      },
      getChromeBookmark(){
        let _this=this
        chrome.bookmarks.getTree(function (bookmarkArray) {
          console.log('Book Mark',bookmarkArray);
          _this.treeData=bookmarkArray[0]
          _this.traverse(_this.treeData,_this.process); //将树状 转换成 二维
          console.log('二维',_this.erweiBookMarkData)
        });
      },
      process(key,value) {
        if (typeof(value) == "object"){
          if (value.url!=undefined){
            this.erweiBookMarkData.push(value)
          }
        }
      },
      traverse(o,func) {
        for (var i in o) {
          func.apply(this,[i,o[i]]);
          if (o[i] !== null && typeof(o[i])=="object") {
            //going one step down in the object tree!!
           this.traverse(o[i],func);
          }
        }
      },
      batchImportLinks(){
        console.log(this.erweiBookMarkData)
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
            console.log('Response:', response)
            this.$toasted.success('导入成功', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
          .catch(error => {
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
        this.erweiBookMarkData.forEach(function(item) {
          item.isChecked=!item.isChecked
        });
        console.log(this.erweiBookMarkData)
      }
    }
    ,
    created(){
      this.getChromeBookmark()
      this.getCategoryItem()
    },
    mounted()
    {
    }
    ,
    watch: {
      'isCheckedAll':'checkedAll'
    }
    ,
    components: {
      Hello, SidebarMenu, Navbar, Item
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

    .card-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .td{
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
