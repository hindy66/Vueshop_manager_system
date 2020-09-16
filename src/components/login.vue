<template>
  <div class="login-container">
   <div class="login-box">
     <!-- 图标区域 -->
     <div class="avator-box">
       <img src="../assets/logo.png" alt="">
     </div>
     <!-- 登录表单区域 -->
     <el-form ref='loginFormRef' :model="loginForm" :rules="loginFormRules" label-width="0px" class="form-area">
       <!-- 输入框区域 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid"
           placeholder="请输入账号"
            v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          type="password"
          v-model="loginForm.password">
          </el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btn-box">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
     </el-form>
   </div>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      //  保存表单数据
      loginForm: {
        username: '',
        password: ''
      },
      //  校验规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      //  调用elementui表单组件的方法进行表单预验证
      this.$refs.loginFormRef.validate(async vaild => {
        if (!vaild) {
          return
        }
        //  截取请求结果返回的data部分
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) {
          this.resetForm()
          //  调用elementui消息提示组件
          return this.$message.error('登录失败，请核对用户名和密码')
        }
        this.$message.success('登录成功!')
        // 1.  将登录成功之后的token,保存到客户端的sessionStorage中
        //   1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应用在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2.  通过编程式导航转跳到后台主页，路由地址是  /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
    height: 100%;
    background-color: #2b4f6b;
    position: relative;
  }
  .login-box{
    width: 450px;
    height: 300px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .login-box .avator-box{
    height: 130px;
    width: 130px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    padding:10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }
  .avator-box img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #eee;
  }
  .form-area{
    padding: 0 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }
   .form-area .btn-box{
     display: flex;
     justify-content: flex-end;
   }
</style>
