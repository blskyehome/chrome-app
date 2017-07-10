<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <h1>Dashboard</h1>

                    <section class=" placeholders">
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
        historyLink:null
      }
    },
    methods: {
      getHistoryLink(){
        chrome.history.search({
          text: '',
          startTime: new Date().getTime()-24*3600*1000,
          endTime: new Date().getTime(),
          maxResults: 20
        }, function(historyItemArray){
          console.log(historyItemArray);
        });
        chrome.bookmarks.getTree(function(bookmarkArray){
          console.log(bookmarkArray);
        });
      }
    },
    mounted () {
      this.getHistoryLink()
    },
    watch:{
    },
    components: {
      Hello, SidebarMenu, Navbar
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
