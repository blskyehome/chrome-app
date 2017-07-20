<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu :active="activePage"></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <!--<h1>Dashboard</h1>-->

                    <section class=" placeholders">
                        <div v-if="error">
                            Found an error
                        </div>
                        <div v-else>
                            <div class="col-md-12">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="inputEmail3" class="col-sm-2 control-label">分类名</label>
                                        <div class="col-sm-10">
                                            <input type="email" class="form-control" id="inputEmail3" v-model="name" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label">描述</label>
                                        <div class="col-sm-10">
                                            <textarea class="form-control" rows="3" v-model="description"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button type="button" @click="newCategory" class="btn btn-info">保存</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

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
  import PageFooter from '../Footer.vue'

  export default {
    data () {
      return {
        activePage:'categoryNewPage',
        githubUrl: config.serverURI + '/user/link',
        response: {},
        error: null,
        color: null,
        page: 2,
        name: null,
        description: null
      }
    },
    methods: {
      newCategory: function () {
        axios({
          method: 'post',
          url: config.serverURI + '/category',
          data: {
            token: localStorage.token,
            name: this.name,
            description: this.description
          }
        })
          .then(response => {
            this.$toasted.success('保存成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
            console.log(response)
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('保存失败!' + error.response.data.msg, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
//          this.error = error.response.statusText
          })
      }
    },
    components: {
      Hello, SidebarMenu, Navbar,PageFooter
    },
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
</style>
