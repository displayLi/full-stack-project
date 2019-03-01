<template>
  <div id="Index">
    <div class="video-bg">
      <video autoplay loop muted>
        <source src="http://api.link97.com:8082/public/img/bg-video.mp4" type="video/mp4">
      </video>
    </div>
    <div class="contents">
      <h3>LINK+ Creative Studio</h3>
      <p>创新、我们是专业的</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  }
};
</script>

<style scoped lang="stylus">
.video-bg
  position fixed
  top 0
  left 200px
  bottom 0
  width 100%
  z-index -1
  &::before
    content ' '
    position fixed
    top 0
    left 200px
    bottom 0
    width 100%
    background-color rgba(0, 0, 0, 0.5)
  video
    width 100%
    height 100%
    object-fit cover
.contents
  font-size 32px
  color #ffffff
  text-align center
  margin 200px auto
  h3
    font-weight 500
  p
    font-weight 300
    font-size 18px
    margin-top 30px
</style>