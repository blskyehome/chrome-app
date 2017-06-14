/**
 * Created by wang on 2017/6/12.
 */
const api = 'http://api.blskye.dev/v1'
import axios from 'axios';
export default {
        api:'http://api.blskye.dev/v1',
    saveToken: function (token) {
        return localStorage.token = token;
    },
    getToken: function () {
        console.log(localStorage.token)
        return localStorage.token;
    },
    getCaptcha: function (email) {
        axios.post(api + '/user/captcha',
            {email: email}
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    },
    isLogin: function () {
        if (localStorage.token==null){
            return false;
        }else {
            return true;
        }
    },

    getCategoryItems: function (_this) {
        axios({
            method: 'get',
            url: api + '/user/category',
            params: {
                token: localStorage.token,
            }
        })

            .then(function (response) {
                // _this.loading = false
                console.log(response.data);
                _this.categoryItems = response.data.data
                console.log(_this.categoryItems)
            })
            .catch(function (error) {
                // _this.loading = false
                // _this.error = error.response.data.msg
                console.log(error);
            });
    }
}