<template>
    <div class="area">
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='originalpwd' type="password" v-model="originalpwd" class="mui-input-clear mui-input" placeholder="请输入原始密码">
                </div>
                <div class="mui-input-row">
                    <label>重设</label>
                    <input id='password' type="password" v-model="pwd" class="mui-input-clear mui-input" placeholder="请输入新密码">
                </div>
                <div class="mui-input-row">
                    <label>确认</label>
                    <input id='password_confirm' type="password" v-model="confirmpwd" class="mui-input-clear mui-input" placeholder="请确认密码">
                </div>
            </form>
            <div class="mui-content-padded">
                <a id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="changepwd">确认修改</a>
            </div>
        </div>
    </div>
</template>
<script>
import mui from "MUI/js/mui.js";
export default {
  data() {
    return {
      originalpwd: "",
      pwd: "",
      confirmpwd: "",
      username: ""
    };
  },
  created() {},
  mounted() {
    let uname = sessionStorage.getItem("username");
    this.username = uname;
  },
  methods: {
    changepwd() {
      if (this.originalpwd == "" || this.pwd == "" || this.confirmpwd == "") {
        mui.alert("请输入必填的注册信息");
      } else if (this.pwd.length < 6) {
        mui.alert("密码必须大于六位");
      } else if (this.confirmpwd !== this.pwd) {
        mui.alert("两次密码不一致");
      } else {
        this.$http
          .post(
            "api/login/",
            {
              username: this.username
            },
            { emulateJSON: true }
          )
          .then(result => {
            if (result.body.message[0].password !== this.originalpwd) {
              mui.alert("初始密码错误");
            } else {
              let data = { name: this.username, password: this.pwd };
              this.$http
                .post("api/changepwd/", data, { emulateJSON: true })
                .then(function() {
                  mui.alert("修改成功，请重新登录");
                  sessionStorage.removeItem("username");
                  setTimeout(
                    function() {
                      this.$router.push("/login");
                    }.bind(this),
                    1000
                  );
                });
            }
          });
      }
    }
  }
};
</script>
<style scoped>
* {
  font-size: 15px;
}
.area {
  margin: 20px auto 0 auto;
}
.mui-input-group:first-child {
  margin-top: 20px;
}
.mui-input-group label {
  width: 22%;
}
.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}
.mui-btn {
  padding: 10px;
}
.mui-btn-block {
  font-size: 15px !important;
}
.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}
.mui-content-padded {
  margin-top: 25px;
}
</style>
