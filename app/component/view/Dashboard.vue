<template lang="html">
    <div class="site-wrapper">
        <div class="site-wrapper-inner">
            <div class="cover-container">

                <div class="masthead clearfix">
                    <div class="inner">
                        <h3 class="masthead-brand">Cover</h3>
                        <nav class="nav nav-masthead">
                            <a class="nav-link active" href="#" v-popover:myname><i class="fa fa-link"></i> 链接</a>
                            <popover name="myname">
                                <div class="pop-content">
                                    <h3>程序员</h3>
                                    <ul>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> npm</a> </li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> Vue</a> </li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> Laravel</a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> PHP</a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> Github</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>购物</h3>
                                    <ul>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 京东</a><span class="pull-right">✕</span></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 天猫</a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 淘宝</a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 折800</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3>设计</h3>
                                    <ul>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 爱设计 </a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 昵图网</a></li>
                                        <li><a href="http://www.github.com"><i class="fa fa-github"></i> 千图网</a></li>
                                    </ul>
                                </div>
                            </popover>
                            <a class="nav-link" href="#">Features</a>
                            <a class="nav-link" href="#">Contact</a>
                        </nav>
                    </div>
                </div>

                <div class="inner cover">
                    <h1 class="cover-heading">{{h}}:{{m}}:{{s}}</h1>
                   <!-- <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download,
                        edit the text, and add your own fullscreen background photo to make it your own.</p>-->
                    <div class="lead">
                        <div class="row">
                            <div class="col-2">1</div>
                            <div class="col-2">1</div>
                            <div class="col-2">1</div>
                            <div class="col-2">1</div>
                            <div class="col-2">1</div>
                        </div>
                    </div>
                    <!--<p class="lead">
                        <a href="#" class="btn btn-lg btn-secondary">Learn more</a>
                    </p>-->
                </div>

               <!-- <div class="mastfoot">
                    <div class="inner">
                        <p>Cover template for <a href="https://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                    </div>
                </div>-->

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
  import PageFooter from '../Footer.vue'


  export default {
    data () {
      return {
        h:'',
        s:'',
        m:''
      }
    },
    methods: {
      updateClock: function () {
        let now = new Date();
        this.h = this.leftPad(''+now.getHours());
        this.m = this.leftPad(''+now.getMinutes());
        this.s = this.leftPad(''+now.getSeconds());
      },
      leftPad: function(str) {
        const leftPad = '00';
        return leftPad.substring(0, leftPad.length - str.length) + str;
      }
  },
    created () {
      setInterval(this.updateClock, 100);
    },
    watch: {
    },
    components: {
    }
  }
</script>

<style lang="css">
</style>
