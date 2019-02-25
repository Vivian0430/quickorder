<template>
    <div>
        <div class="userinfo">欢迎 {{name}}</div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"><router-link to="/userinfo">个人信息</router-link></li>
            <li class="mui-table-view-cell">我的订单</li>
            <li class="mui-table-view-cell"><router-link to="/changepwd">修改密码</router-link></li>
            <li class="mui-table-view-cell"><a class="quit" href="#" @click="quit">注销登录</a></li>
        </ul>
    </div>
</template>

<script>
/*引入公共方法*/

export default {
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    let uname = sessionStorage.getItem("username");
    this.name = uname;
    if (uname == null) {
      this.$router.push("/login");
    }
  },
  methods: {
    quit() {
      sessionStorage.removeItem("username");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  background-color: #eaeaea;
  width: 100%;
  height: 20vh;
  text-align: center;
  line-height: 20vh;
}
.quit {
  color: red !important;
}
.mui-table-view {
  color: rgb(50, 50, 50);
  font-size: 15px;
}
</style>
