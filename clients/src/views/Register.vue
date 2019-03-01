<template>
  <div id="Register">
    <div class="bgimg"></div>
    <div class="register-center">
      <div class="register-title">注册</div>
      <div class="register-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="ruleForm.password2" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 选择身份 -->
          <el-form-item label="选择身份" prop="management">
            <el-select style="height:100%" v-model="ruleForm.management" placeholder="请选择身份">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="员工" value="员工"></el-option>
            </el-select>
          </el-form-item>
          <!-- 注册 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">注册</el-button>
            <el-button @click="gotoLogin()">去登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        management: "",
        email: "",
        password: "",
        password2: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
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
        ],
        password2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 4,
            max: 16,
            message: "长度在 4 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ],
        management: [
          { required: true, message: "请选择身份", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/user/register", this.ruleForm).then(res => {
            if (res.data.flag == 1) {
              this.$message({
                showClose: true,
                type: "success",
                message: "注册成功!"
              });
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 800);
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: `${res.data.msg}`
              });
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
    gotoLogin() {
      this.$router.push("/login");
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
  background url('../assets/background-img.jpg') no-repeat center center
  background-size cover
  filter grayscale(1)
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
  height 460px
  border-radius 8px
  background-color #fff
  position absolute
  left 50%
  top 50%
  positionMargin((-(@height + 150)), (- @width))
  .register-form
    box-sizing border-box
    padding 20px 40px
    padding-left 10px
    text-align center
  .register-title
    text-align center
    font-size 20px
    padding-top 20px
</style>