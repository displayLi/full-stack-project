<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
import Home from "./views/Home";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    if (sessionStorage.token) {
      let tokenData = jwt_decode(sessionStorage.token);
      this.$store.dispatch("setAuthorization", true);
      this.$store.dispatch("setUser", tokenData);
    }
  }
};
</script>

<style lang="stylus">
@import url('../static/reset.css')
// Element ui
body.el-loading-parent--relative
  position static !important
.el-popper[x-placement^=bottom]
  margin-top 22px !important
</style>
