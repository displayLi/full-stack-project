<template>
  <div id="Headers" class="head-nav clearfix">
    <!-- 左侧title -->
    <div class="fl">
      <div class="logo-container">
        <router-link to="/">
          <span class="title">LINK+ Creative Studio</span>
        </router-link>
      </div>
    </div>
    <!-- 右侧用户部分 -->
    <nav class="nav-bar fr">
      <div class="avator">
        <img :src="user.avatar" alt>
      </div>
      <div class="userName inline-block">
        <p>欢迎：</p>
        <p class="user">{{user.name}}</p>
      </div>
      <span>
        <el-dropdown trigger="click" @command="ctrlEvent">
          <span class="el-dropdown-link">
            <i class="icons el-icon--right el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user_info">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "headers",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    ctrlEvent(domItem) {
      switch (domItem) {
        case "user_info":
          this.showUserInfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showUserInfo() {
      this.$router.push("/about");
    },
    logout() {
      sessionStorage.removeItem("token");
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang='stylus'>
#Headers
  height 60px
  width 100%
  font-weight 400
  background-color #282828
  .logo-container
    margin 0 0 0 40px
  .title
    font-size 20px
    color #fff
    line-height 60px
  .nav-bar
    padding 7px 90px 7px 0
    .avator
      width 45px
      height 45px
      border-radius 50%
      overflow hidden
      display inline-block
      vertical-align middle
      img
        width 100%
        height 100%
    .userName
      color white
      font-size 16px
      display inline-block
      vertical-align middle
      padding-left 15px
    span
      .el-dropdown-link
        cursor pointer !important
        outline none !important
      .icons
        margin-left 20px
        color white
        vertical-align middle
        outline none
        cursor pointer
</style>