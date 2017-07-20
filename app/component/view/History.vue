<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu :active="activePage"></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <!--<h1>Dashboard</h1>-->
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
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th><label>
                                        <input type="checkbox" v-model="isCheckedAll">全选/反选
                                    </label></th>
                                    <th>访问时间</th>
                                    <th>链接</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in historyLink">
                                    <td><input type="checkbox" v-model="item.isChecked"></td>
                                    <td>{{ getTime(item.lastVisitTime) }}</td>
                                    <td class="td">
                                        <a v-bind:href="item.url">{{item.title?item.title:item.url}}</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>


                </main>
            </div>
        </div>
        <page-footer></page-footer>
    </div>

</template>

<script>
  import Hello from '../hello.vue'
  import SidebarMenu from '../SidebarMenu.vue'
  import Navbar from '../Navbar.vue'
  import config from '../../scripts/config'
  import axios from 'axios'
  import Spinner from 'vue-simple-spinner'
  import PageFooter from '../Footer.vue'


  export default {
    data () {
      return {
        activePage:'historyPage',
        historyLink:[],
        categoryId: null,
        categoryItem: null,
        isCheckedAll: false,
        loading:false
      }
    },
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
      getHistoryLink(){
        let _this = this
        chrome.history.search({
          text: '',
          startTime: new Date().getTime()-24*3600*1000,
          endTime: new Date().getTime(),
          maxResults: 20
        }, function(historyItemArray){
          console.log('historyItemArray',historyItemArray);
          _this.historyLink = historyItemArray
        });
      },
      checkedAll(){
//        this.isCheckedAll=!this.isCheckedAll
        this.historyLink.forEach(function (item) {
          item.isChecked = !item.isChecked
        });
        console.log(this.historyLink)
      },
      getTime(time){
        let newTime=new Date(time)
//        console.log(newTime)
//        return newTime.toLocaleString()
       let hours   = newTime.getHours();
       let minutes = newTime.getMinutes();
       let seconds = newTime.getSeconds();

        let clck = (hours>=12)?"下午":"上午";
        hours = (hours>12)?hours-12:hours;
//        hours = (hours<10)?"0"+hours:hours;
        minutes = (minutes<10)?"0"+minutes:minutes;
        seconds = (seconds<10)?"0"+seconds:seconds;
        return (clck+hours+'点'+minutes+'分'+seconds+'秒')

      },
      batchImportLinks(){
        this.loading=true
        console.log(this.historyLink)
        if (this.historyLink==null){
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
            link_list: this.historyLink
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
      }

    },
    created () {
      this.getCategoryItem()
      this.getHistoryLink()
    },
    watch:{
      'isCheckedAll': 'checkedAll'
    },
    components: {
      Hello, SidebarMenu, Navbar,Spinner,PageFooter
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
    .card-title{
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
