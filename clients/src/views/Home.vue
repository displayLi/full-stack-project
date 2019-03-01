<template>
  <div id="Home">
    <el-container>
      <el-header style="padding:0">
        <!-- 头部导航 -->
        <Header/>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <!-- 左侧导航 -->
          <LeftMenu/>
        </el-aside>
        <el-main>
          <!-- 二级路由展示(内容展示) -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Header,
    LeftMenu
  }
};
</script>
<style lang="stylus" scoped>
.aside
  position absolute
  top 60px
  left 0
  bottom 0
  background-color #282828
.el-main
  margin-left 200px
</style>

