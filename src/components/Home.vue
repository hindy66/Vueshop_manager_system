<template>
  <div class="home-container">
    <el-button type="info" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      //  退出功能实现的原理
      //    1.清空浏览器sessionStorage中的token值
      window.sessionStorage.clear()
      //    2.通过vue-router转跳回登录页面
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
