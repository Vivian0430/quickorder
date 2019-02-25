<template>
    <div>
        <form id='login-form' class="mui-input-group">
            <div class="mui-input-row">
                <label>账号</label>
                <input id='account' v-model="username" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
            </div>
            <div class="mui-input-row">
                <label>密码</label>
                <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
            </div>
        </form>
        <form class="mui-input-group">
            <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell">
                    自动登录
                    <div id="autoLogin" class="mui-switch mui-switch-mini">
                        <div class="mui-switch-handle"></div>
                    </div>
                </li>
            </ul>
        </form>
        <div class="mui-content-padded">
            <button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="commitForm()">登录</button>
            <div class="link-area">
                <span><router-link id='reg' to="register">注册账号</router-link></span>
                <span><router-link to="" id='forgetPassword'>忘记密码</router-link></span>
            </div>
        </div>
        <div class="mui-content-padded oauth-area"></div>

    </div>
</template>
<script>
import mui from "MUI/js/mui.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      userinfo: []
    };
  },
  created() {},
  mounted() {
    mui(".mui-input-row input").input();
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (sessionStorage.getItem("username")) {
      this.$router.push("/mine");
    }
    /*mui("#autoLogin")
      .switch()
      .toggle();*/
    mui(".mui-switch")["switch"]();
  },
  methods: {
    commitForm() {
      if (this.username == "" || this.password == "") {
        mui.alert("请输入用户名或密码");
      } else {
        this.$http
          .post("api/login/", {
              username: this.username
          },{ emulateJSON:true })
          .then(result => {
            if (result.body.status === 0) {
              if (result.body.message.length == 0) {
                mui.alert("用户不存在");
              } else if (
                result.body.message[0].password !== this.password ||
                result.body.message[0].user_name !== this.username
              ) {
                mui.alert("用户名或密码错误");
              } else {
                this.userinfo = result.body.message;
                //setCookie(username,this.userinfo.user_name);
                sessionStorage.setItem("username", this.username);
                setTimeout(
                  function() {
                    this.$router.push("/mine");
                  }.bind(this),
                  1000
                );
              }
            }
          });
      }
    }
  },
  directives: {
    tap: {}
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

.mui-input-group {
  margin-top: 10px;
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

.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}

.mui-content-padded {
  margin-top: 25px;
}

.mui-btn {
  padding: 10px;
}
.mui-btn-block {
  font-size: 15px !important;
}
.link-area {
  display: block;
  width: 100vw;
  position: relative;
  margin-top: 10px;
}
.link-area span:first-of-type {
  position: absolute;
  left: 0;
}
.link-area span:last-of-type {
  position: absolute;
  right: 0;
  margin-right: 6vw;
}
.oauth-area {
  position: absolute;
  bottom: 20px;
  left: 0;
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0;
}

.oauth-area .oauth-btn {
  display: inline-block;
  width: 50px;
  height: 50px;
  background-size: 30px 30px;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 20px;
  /*-webkit-filter: grayscale(100%); */
  border: solid 1px #ddd;
  border-radius: 25px;
}

.oauth-area .oauth-btn:active {
  border: solid 1px #aaa;
}

.oauth-area .oauth-btn.disabled {
  background-color: #ddd;
}
</style>
