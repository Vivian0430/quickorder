<template>
    <div>
        <div class="edit">
            <router-link to="/editinfo">
                <span class="mui-icon mui-icon-compose" style="color: rgb(50,50,50);"></span>
                <span style="color: rgb(50,50,50);">编辑</span>
            </router-link>
        </div>
        <ul class="mui-table-view" v-for="item in userinfo" :key="item.user_name">
            <li class="mui-table-view-cell">用户名： {{ item.user_name }}</li>
            <li class="mui-table-view-cell">性别： {{ item.sex }}</li>
            <li class="mui-table-view-cell">生日： {{ item.birthday }}</li>
            <li class="mui-table-view-cell">联系方式： {{ item.mobile }}</li>
            <li class="mui-table-view-cell">偏好： {{ item.hobby }}</li>
        </ul>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      userinfo: []
    };
  },
  created() {
    this.getuserdetail();
  },
  methods: {
    getuserdetail() {
      let uname = sessionStorage.getItem("username");
      //console.log(uname);
      this.$http.get("api/getuserdetail/" + uname).then(result => {
        //console.log(result);
        if (result.body.status === 0) {
          this.userinfo = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.edit {
  color: rgb(50, 50, 50);
  font-size: 15px;
  text-align: right;
  padding: 0 5vw;
  margin: 2vh 0;
}
.mui-table-view {
  color: rgb(50, 50, 50);
  font-size: 15px;
}
</style>
