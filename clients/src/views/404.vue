<template>
  <div id="is404" @click="gotoHomePage"></div>
</template>

<script>
export default {
  name: "is404",
  data() {
    return {};
  },
  methods: {
    gotoHomePage() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style scoped lang="stylus">
#is404
  position absolute
  top 0
  left 0
  bottom 0
  width 100%
  background url('../assets/404.png') no-repeat center center #f8f8f8
  background-size contain
  cursor pointer
</style>