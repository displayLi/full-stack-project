<template>
  <nav id="LeftMenu">
    <el-col>
      <el-menu
        style="border:0;"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#282828"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 首页 -->
        <router-link to="/">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
        </router-link>
        <!-- 资金管理和信息管理 -->
        <el-submenu :index="item.indexs" v-for="(item,index) in navList" :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="(val,key) in item.children" :key="key">
            <router-link :to="val.path">
              <el-menu-item :index="val.indexs">{{val.name}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </nav>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {
      navList: [
        {
          name: "资金管理",
          icon: "el-icon-news",
          indexs: "2",
          children: [{ name: "资金流水", path: "/account", indexs: "2-1" }]
        },
        {
          name: "信息管理",
          indexs: "3",
          icon: "el-icon-edit-outline",
          children: [{ name: "个人信息", path: "/about", indexs: "3-1" }]
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>