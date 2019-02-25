<template>
    <div class="area">
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>用户名：</label>
                    <input type="text" v-model="username" class="mui-input-clear mui-input">
                </div>
                <div class="mui-input-row">
                    <label>性别：</label>
                    <input type="text" v-model="sex" class="mui-input-clear mui-input">
                </div>
                <div class="mui-input-row">
                    <label>生日：</label>
                    <input type="text" v-model="birthday" class="mui-input-clear mui-input">
                </div>
                <div class="mui-input-row">
                    <label>联系方式：</label>
                    <input type="text" v-model="mobile" class="mui-input-clear mui-input">
                </div>
                <div class="mui-input-row">
                    <label>偏好：</label>
                    <input type="text" v-model="hobby" class="mui-input-clear mui-input">
                </div>
            </form>
            <div class="mui-content-padded">
                <a id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="edituserinfo">确认修改</a>
            </div>
        </div>
    </div>
</template>
<script>
import mui from "MUI/js/mui.js";
export default {
  data: function() {
    return {
      userinfo: [],
      username: "",
      sex: "",
      birthday: "",
      mobile: "",
      hobby: ""
    };
  },
  created() {},
  methods: {
    edituserinfo() {
      if (
        this.username == "" ||
        this.sex == "" ||
        this.birthday == "" ||
        this.mobile == "" ||
        this.hobby == ""
      ) {
        mui.alert("请将信息填写完整");
      } else if (this.mobile.length !== 11) {
        mui.alert("手机号格式不正确");
      } else {
        this.$http
          .post("api/login/", {
              username: this.account
            },
            { emulateJSON: true }
          )
          .then(result => {
            if (result.body.status === 0) {
              if (result.body.message.length == 0) {
                let uname = sessionStorage.getItem("username");
                let data = {
                  username: this.username,
                  sex: this.sex,
                  birthday: this.birthday,
                  mobile: this.mobile,
                  hobby: this.hobby
                };
                this.$http
                  .post("api/edituserinfo/" + uname, data, {
                    emulateJSON: true
                  })
                  .then(function() {
                    mui.alert("信息修改成功，下次登录生效");
                    setTimeout(
                      function() {
                        this.$router.push("/mine");
                      }.bind(this),
                      1000
                    );
                  });
              } else {
                mui.alert("用户名已被占用");
              }
            }
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
* {
  font-size: 15px;
}
.area {
  margin: 20px auto 0 auto;
}
.mui-input-group:first-child {
  margin-top: 20px;
}
.mui-input-row {
  line-height: 12.5vw;
}
.mui-input-row label {
  width: 25vw;
  display: inline-block;
  padding: 0;
  height: 12.5vw;
  line-height: 12.5vw;
  margin-left: 5vw;
}
.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 70%;
  padding: 0;
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
