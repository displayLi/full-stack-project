<template>
  <div id="About">
    <div class="abouts-container">
      <div class="user-avator">
        <div class="avator">
          <img :src="user.avatar" alt="头像">
        </div>
      </div>
      <div class="user-info">
        <ul class="info-content">
          <li>
            <i>
              <svg
                t="1543913464344"
                class="icon"
                style
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1108"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M501.041414 62.931285c125.654838 0 227.51269 100.19498 227.51269 223.775576 0 123.605156-101.856829 223.805252-227.51269 223.805252-125.650745 0-227.506551-100.199073-227.506551-223.805252C273.53384 163.097612 375.424438 62.931285 501.041414 62.931285L501.041414 62.931285 501.041414 62.931285zM501.041414 62.931285c125.654838 0 227.51269 100.19498 227.51269 223.775576 0 123.605156-101.856829 223.805252-227.51269 223.805252-125.650745 0-227.506551-100.199073-227.506551-223.805252C273.53384 163.097612 375.424438 62.931285 501.041414 62.931285L501.041414 62.931285 501.041414 62.931285zM415.730423 585.125461l189.629895 0c162.314783 0 293.880237 129.387859 293.880237 289.057395l0 18.622126c0 62.922075-131.593084 65.313541-293.880237 65.313541L415.730423 958.118524c-162.319899 0-293.880237-0.092098-293.880237-65.313541l0-18.622126C121.852232 714.51332 253.411547 585.125461 415.730423 585.125461L415.730423 585.125461 415.730423 585.125461z"
                  p-id="1109"
                ></path>
              </svg>
            </i>
            <span>{{user.name}}</span>
          </li>
          <li>
            <i>
              <svg
                t="1543913747036"
                class="icon"
                style
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2361"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <path
                  d="M787.2 595.2h12.8V185.6c0-57.6-44.8-102.4-102.4-102.4H601.6C601.6 44.8 569.6 6.4 524.8 6.4H371.2c-38.4 0-76.8 32-76.8 76.8H198.4c-57.6 6.4-102.4 51.2-102.4 102.4v601.6c0 57.6 44.8 102.4 102.4 102.4h326.4v-25.6c0-147.2 115.2-268.8 262.4-268.8zM371.2 64h153.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6H371.2c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6zM300.8 345.6h300.8c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6H300.8c-12.8 0-25.6-12.8-25.6-25.6 0-19.2 6.4-25.6 25.6-25.6z m198.4 288H300.8c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h198.4c12.8 0 25.6 12.8 25.6 25.6 0 19.2-12.8 25.6-25.6 25.6zM300.8 512c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h300.8c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6H300.8z"
                  fill="#333333"
                  p-id="2362"
                ></path>
                <path
                  d="M774.4 761.6m-89.6 0a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0Z"
                  fill="#333333"
                  p-id="2363"
                ></path>
                <path
                  d="M780.8 857.6c-96 0-166.4 76.8-172.8 166.4h345.6c0-102.4-76.8-166.4-172.8-166.4z"
                  fill="#333333"
                  p-id="2364"
                ></path>
              </svg>
            </i>
            <span>{{user.management}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "about",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped lang="stylus">
#About
  width 100%
  position absolute
  bottom 0
  top 60px
  left 0
  z-index -1
  .abouts-container
    display flex
    height 100%
    .user-avator
      margin-left 200px
      flex 0 0 500px
      background-color white
      position relative
      .avator
        position absolute
        top 50%
        left 50%
        width 150px
        height 150px
        margin (- @height / 2) 0 0 (- @width / 2)
        border-radius 50%
        overflow hidden
        img
          width 100%
          height 100%
    .user-info
      flex 1
      background-color #eee
      position relative
      .info-content
        position absolute
        top 50%
        left 200px
        width 300px
        height 150px
        margin-top (- @height / 2)
        li
          i
            width 32px
            height 32px
            padding 15px 0
            vertical-align middle
            svg
              width 100%
              height 100%
          span
            padding-left 10px
            font-size 20px
            vertical-align middle
</style>