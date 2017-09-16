<template lang="html">
    <div>
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <sidebar-menu :active="activePage"></sidebar-menu>
                <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" role="main">
                    <!--<h1>链接</h1>-->

                    <section class=" placeholders">
                        <div v-if="error">
                            Found an error
                        </div>
                        <div v-else>
                            <b-card no-block>
                                <b-tabs small card ref="tabs" v-model="tabIndex">
                                    <b-tab title="头像">
                                        <div class="content">
                                            <div class="show-info">
                                                <div class="test">
                                                    <vueCropper
                                                            ref="cropper2"
                                                            :img="example2.img"
                                                            :outputSize="example2.size"
                                                            :outputType="example2.outputType"
                                                            :info="example2.info"
                                                            :canScale="example2.canScale"
                                                            :autoCrop="example2.autoCrop"
                                                            :autoCropWidth="example2.width"
                                                            :autoCropHeight="example2.height"
                                                            :fixed="example2.fixed"
                                                            :fixedNumber="example2.fixedNumber"
                                                    ></vueCropper>
                                                </div>
                                                <div class="input-group pt-3">
                                                    <label class="btn btn-info" for="upload2">选择图片</label>
                                                    <input type="file" id="upload2"
                                                           style="position:absolute; clip:rect(0 0 0 0);"
                                                           accept="image/png, image/jpeg, image/gif, image/jpg"
                                                           @change="uploadImg($event, 2)">
                                                </div>
                                                <div class="input-group">
                                                    <button @click="finish2('base64')" class="btn btn-info">上传</button>

                                                </div>
                                            </div>
                                        </div>
                                    </b-tab>
                                    <b-tab title="个人信息">
                                        <div class="row">

                                            <div class="col-12">
                                                <!-- Success/Error heads up input -->
                                                <h4>昵称</h4>
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                      <i class="fa fa-fw fa-user-circle"></i>
                                                    </span>
                                                    <input class="form-control" v-model="user.user_name" type="text">
                                                    <span class="input-group-addon">
                                                         <button class=" btn btn-info" @click="updateUsername">确定</button>
                                                    </span>
                                                </div>
                                                <br>
                                                <h4>邮箱</h4>
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                      <i class="fa fa-fw fa-envelope"></i>
                                                    </span>
                                                    <input class="form-control" v-model="user.email"
                                                           placeholder="请输入您要更换的邮箱" type="text">
                                                    <span class="input-group-addon">
                                                         <button class=" btn btn-default">验证</button>
                                                    </span>
                                                </div>
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                      <i class="fa fa-fw fa-bullhorn"></i>
                                                    </span>
                                                    <input class="form-control" placeholder="验证码" type="text">
                                                    <span class="input-group-addon">
                                                         <button class=" btn btn-info">确定</button>
                                                    </span>
                                                </div>
                                                <br>

                                                <h4>密码</h4>
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                      <i class="fa fa-fw fa-bullhorn"></i>
                                                    </span>
                                                    <input class="form-control" v-model="captcha" type="text"
                                                           placeholder="输入验证码">
                                                    <span class="input-group-addon">
                                                        <button class=" btn btn-info" @click="getCaptcha">获取</button>
                                                    </span>
                                                </div>
                                                <div class="input-group">
                                                    <span class="input-group-addon">
                                                      <i class="fa fa-fw fa-lock"></i>
                                                    </span>
                                                    <input class="form-control" type="password" v-model="password"
                                                           placeholder="输入要设置的密码">
                                                    <span class="input-group-addon">
                                                        <button class=" btn btn-info" @click="updatePassword">确定</button>
                                                    </span>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    </b-tab>
                                    <!--<b-tab title="标签">
                                        <v-select v-model="tagsSelected" :options="tags"></v-select>
                                    </b-tab>-->
                                </b-tabs>
                            </b-card>
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
  import PageFooter from '../Footer.vue'

  import Navbar from '../Navbar.vue'
  import config from '../../scripts/config'
  import axios from 'axios'
  import Spinner from 'vue-simple-spinner'
  import vueCropper from 'vue-cropper'
  import vSelect from 'vue-select'


  export default {
    data () {
      return {
        activePage: 'userPage',
        error: null,
        color: null,
        loading: false,
        crap: false,
        previews: {},
        lists: [
          {
            img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
          },
          {
            img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/bg2.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
          },
          {
            img: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
          }
        ],
        option: {
          img: '',
          size: 0.8,
          outputType: 'png'
        },
        example2: {
          img: '../images/avatar/xiaohuangren.jpg',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          width: 300,
          height: 300,
          fixed: true,
          fixedNumber: [4, 4]
        },
        downImg: '#',
        user: {
          avatar_image: {
            url: ''
          },
          email: 'user@blskye.com',
          user_name: 'UserName'
        },
        captcha: null,
        password: null,
        tags:['foo','bar','baz'],
        tagsSelected:null,
        tabIndex: null,
        tabs: null,
        tabCounter: 0
      }
    },

    methods: {

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
      updateUsername () {
        axios({
          method: 'put',
          url: config.serverURI + '/user/profile',
          data: {
            token: localStorage.token,
            user_name: this.user.user_name
          }
        })
          .then(response => {
            console.log('Response:', response)
            this.$toasted.success('用户名更新成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('修改失败!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
      },
      getCaptcha () {
        axios({
          method: 'post',
          url: config.serverURI + '/user/captcha/base',
          data: {
            email: this.user.email
          }
        })
          .then(response => {
            console.log('Response:', response)
            this.$toasted.success('邮件已发送至' + this.user.email, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('邮件发送失败!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
      },
      updatePassword () {
        axios({
          method: 'put',
          url: config.serverURI + '/user/password',
          data: {
            email: this.user.email,
            captcha: this.captcha,
            password: this.password
          }
        })
          .then(response => {
            console.log('Response:', response)
            this.$toasted.success('密码更新成功!', {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
          .catch(error => {
            // Request failed.
            console.log('error', error)
            this.$toasted.error('修改失败!' + error.response.statusText, {
              theme: 'bubble',
              position: 'top-center',
              duration: 5000
            })
          })
      },
      startCrop () {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop () {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop () {
        // clear
        this.$refs.cropper.clearCrop()
      },
      finish (type) {
        // 输出
        var test = window.open('about:blank')
        test.document.body.innerHTML = '图片生成中..'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var test = window.open('')
            test.location.href = data
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            test.location.href = data
          })
        }
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      finish2 (type) {
//        var test = window.open('about:blank')
//        test.document.body.innerHTML = '图片生成中..'
        this.$refs.cropper2.getCropData((data) => {
          axios({
            method: 'post',
            url: config.serverURI + '/avatar',
            data: {
              token: localStorage.token,
              file: data
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
//          test.location.href = data
        })
      },
      down (type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },
      uploadImg (e, num) {
        // 上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          if (num === 1) {
            this.option.img = e.target.result
          } else if (num === 2) {
            this.example2.img = e.target.result
          }
        }
        reader.readAsDataURL(file)
      },
      /*getTagsAll() {
        axios({
          method: 'get',
          url: config.serverURI + '/tags'
        })
          .then(response=> {
          console.log('Response:', response)
          this.tags = response.data
        })
      .catch(error=> {
          // Request failed.
          console.log('error', error)
          this.error = error.response.statusText
        })
      },*/
    },

    mounted () {
      this.getUserInfo()
      this.getTagsAll()
    },
    watch: {},
    components: {
      Hello, SidebarMenu, Navbar, Spinner, PageFooter, vueCropper ,vSelect
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

    .content {
        margin: auto;
        max-width: 640px;
        margin-bottom: 100px;
    }

    .test-button {
        display: flex;
        flex-wrap: wrap;
    }

    .des {
        line-height: 30px;
    }

    code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
    }

    .show-info {
        margin-bottom: 50px;
    }

    .show-info h2 {
        line-height: 50px;
    }

    /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
    }*/
    .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 20px 0px;
        background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
    }

    .test {
        height: 500px;
    }

    @keyframes slide {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    .user-profile {
        max-width: 650px;
        margin: 0 auto;
    }
</style>
