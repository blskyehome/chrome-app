<template lang="html">
  <div>
  <b-alert show>
    Default Alert
  </b-alert>

  <b-alert variant="success" show>
    Success Alert
  </b-alert>

  <b-alert variant="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
    Dismissible Alert!
  </b-alert>

  <b-alert :show="dismissCountDown" dismissible variant="warning" @dismiss-count-down="countDownChanged">
    This alert will dismiss after {{dismissCountDown}} seconds...
  </b-alert>

  <b-btn @click="showAlert" variant="info" class="m-1">Show alert with count-down timer</b-btn>
  <b-btn @click="showDismissibleAlert=true" variant="info" class="m-1">
    Show dismissible alert ({{showDismissibleAlert?'visible':'hidden'}})
  </b-btn>
  </div>
</template>

<script>
import Hello from './hello.vue';
export default {
  data(){
    return {
      name:'我还想尝试一下',
        dismissCountDown: null,
        showDismissibleAlert: false
    }
  },

    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = 5;
        }
    },
  components:{
    hello:Hello
  }
}
</script>

<style lang="css">
</style>
