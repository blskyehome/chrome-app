<template lang="html">
    <div class="container wrap link-fieldset">
      <!--  <div>
            <img src="/images/icon-38.png" alt="Logo" class="img-rounded center-block">
        </div>-->
        <div class="col-md-4 pb-2" v-if="!isLogin">
            请先<b-button class="btn-link" href="/pages/login.html" target="_blank">
            登录
        </b-button>或者
            <b-button class="btn-link" href="/pages/login.html" target="_blank">
                注册
            </b-button>
            后再操作



        </div>

       <div v-if="isLogin">
           <b-alert :show="dismissCountDown" dismissible v-bind:variant="variant" @dismiss-count-down="countDownChanged">
               {{message}},{{dismissCountDown}} seconds...
           </b-alert>

           <div v-if="modifyFlag" class="row">
               <div class="col-12">
                   <b-form-fieldset
                           label="标题"
                           :horizontal="true"
                   >
                       <b-form-input v-model="title"
                                     type="text"
                                     size="sm"
                                     placeholder="Enter your name"/>
                   </b-form-fieldset>
               </div>
               <div class="col-6">
                   <b-form-fieldset
                           label="分类"
                           :horizontal="true">
                       <b-form-select v-model="category_id"
                                      :options="options"
                                      class="mb-3 "
                                      size="sm"
                       ></b-form-select>

                   </b-form-fieldset>
               </div>
               <div class="col-6">
                   <b-form-fieldset
                           label="类型"
                           :horizontal="true">
                       <b-form-radio v-model="openness" :options="optionsRadio">
                       </b-form-radio>
                   </b-form-fieldset>
               </div>
               <div class=" col-3">
                   <b-button @click="modify" class="btn-outline-success  btn-sm btn-block">确定</b-button>
               </div>
               <div class="  col-3">
                   <b-button @click="deleteLink" class="btn-outline-danger btn-sm btn-block">删除</b-button>
               </div>
               <div class=" col-3">
                   <b-button class="btn-outline-info btn-sm btn-block" href="options.html" target="_blank">
                       查看所有
                   </b-button>
               </div>
               <div class=" col-3">
                   <b-button class="btn-outline-info btn-sm btn-block" href="category-new.html" target="_blank">
                       新建分类
                   </b-button>
               </div>

           </div>
       </div>
    </div>
</template>

<script>
    import Login from './Login.vue';
    import Hello from './hello.vue'
    import Common from '../scripts/common'
    import axios from 'axios'
    export default {
        data(){
            return {
                modifyFlag: true,
                dismissCountDown: null,
                loading: false,
                message: null,
                variant: 'warning',

                openness: 2,
                isLogin: false,
                title: null,
                selected: null,
                categoryItems: null,
                category_id: null,
                options: [],
                forModify: null,
                optionsRadio: [
                    {
                        text: '公开',
                        value: 1
                    },
                    {
                        text: '私有',
                        value: 2
                    }
                ]
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            showAlert(variant, messsage){
                this.variant = variant
                this.message = messsage
                this.dismissCountDown = 5;
            }
            ,
            getCategoryItems: function (_this) {
                axios({
                    method: 'get',
                    url: Common.api + '/user/category',
                    params: {
                        token: localStorage.token,
                    }
                })
                    .then(function (response) {
                        _this.categoryItems = response.data.data
                        for (let i = 0; i < _this.categoryItems.length; i++) {
                            let tmp = {};
                            tmp.text = _this.categoryItems[i].name
                            tmp.value = _this.categoryItems[i].id
                            _this.options.push(tmp)
                            _this.category_id = _this.categoryItems[i].id
                        }
                        console.log(_this.category_id);
                        _this.addLink(_this.category_id)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            /*修改*/
            modify: function () {
                let _this = this
                axios({
                    method: 'put',
                    url: Common.api + '/link/' + _this.forModify.id,
                    data: {
                        token: Common.getToken(),
                        openness: _this.openness,
                        category_id: _this.category_id,
                        title: _this.title,
                        url: _this.url,
                        comment: _this.forModify.comment
                    }
                })

                    .then(function (response) {
                        _this.loading = false
                        _this.showAlert('success', '更新成功')
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        _this.loading = false
                        _this.showAlert('danger', '更新失败')
                        _this.error = error.response.data.msg
                        console.log(error.response.data.msg);
                    });
            },
            deleteLink: function () {
                let _this = this
//                this.error = null
//                this.loading = true
                let token = Common.getToken()
                let link_id = this.forModify.id
                axios({
                    method: 'delete',
                    url: Common.api + '/link/' + link_id,
                    params: {
                        token: token,
                    }
                })
                    .then(function (response) {
                        _this.modifyFlag = false
                        _this.showAlert('success', '删除成功')

                        console.log(response.data);
                    })
                    .catch(function (error) {
                        _this.showAlert('danger', '删除失败')

                        console.log(error);
                    });
            },
            addLink: function (category_id) {
              let _this = this
              this.isLogin = Common.isLogin()
              console.log(category_id)
              if (_this.isLogin){
                chrome.tabs.getSelected(function (tabs) {
                  _this.title = tabs.title
                  _this.url = tabs.url
                  console.log(tabs)
                  axios.post(Common.api + '/link',
                    {
                      token: Common.getToken(),
                      url: tabs.url,
                      title: tabs.title,
                      openness: 1,
                      category_id: category_id ,
                      comment: '备注'
                    }
                  )
                    .then(function (response) {
//                        _this.loading = false
//                        _this.error = response.data.msg
                      _this.showAlert('success', '收藏成功')
                      _this.forModify = response.data.msg
                      console.log(_this.forModify);
                    })
                    .catch(function (error) {
//                        _this.loading = false
//
//                        _this.error = response.data.msg
                      console.log(error);

                      _this.showAlert('danger', error.response.data.msg)
                    });
                });
              }
            }
        },
        created: function () {
          this.isLogin = Common.isLogin()

          this.getCategoryItems(this)
        },
        mounted: function () {
            console.log(this.options)
        },


        components: {
            login: Login,
            hello: Hello
        }
    }
</script>

<style lang="css">
</style>
