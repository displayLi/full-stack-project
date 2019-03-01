<template>
  <div id="Login">
    <div class="bgimg"></div>
    <div class="register-center">
      <div class="register-title">登录</div>
      <div class="register-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 注册 -->
          <el-form-item>
            <el-button type="primary" @click="isLogin('ruleForm')">登录</el-button>
            <el-button type="info" @click="gotoRegister()">去注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    isLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/user/login", this.ruleForm).then(res => {
            if (res.data.flag == 1) {
              // 解构token
              let { token } = res.data.data;

              // 把token存到 sessionStorage 里
              sessionStorage.token = token;

              // 解密token
              const tokenData = jwt_decode(token);

              // vuex 异步操作将token存到store里面
              this.$store.dispatch("setAuthorization", true); // 登录状态
              this.$store.dispatch("setUser", tokenData); // 用户信息

              // 延时跳转
              this.timeOut(true, "success", "登录成功!");
              // 路由跳转
              setTimeout(() => {
                this.$router.push("/");
              }, 800);
            } else {
              this.timeOut(true, "error", `${res.data.msg}`);
            }
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "还有表单未填写哦!"
          });
          return false;
        }
      });
    },
    gotoRegister() {
      this.$router.push("/register");
    },
    timeOut(close, type, message) {
      setTimeout(() => {
        this.$message({
          showClose: close,
          type,
          message
        });
      }, 800);
    }
  }
};
</script>

<style scoped lang="stylus">
positionMargin(height, width)
  margin (height / 2) 0 0 (width / 2)
.bgimg
  position absolute
  top 0
  left 0
  bottom 0
  width 100%
  background url('../assets/loading-bgimg.jpg') no-repeat center center
  background-size cover
  &::before
    content '.'
    position absolute
    top 0
    left 0
    bottom 0
    width 100%
    background-color black
    opacity 0.4
.register-center
  width 340px
  height 260px
  border-radius 8px
  background-color #fff
  position absolute
  left 50%
  top 50%
  positionMargin((-(@height + 150)), (- @width))
  .register-form
    box-sizing border-box
    padding 20px 40px
    padding-left 0px
    text-align right
  .register-title
    text-align center
    font-size 20px
    padding-top 20px
</style>