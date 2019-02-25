<template>
    <div class="mui-scroll-wrapper" style="top:7vh;bottom: 7vh">
        <div class="mui-scroll">
            <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboList" :key="item.img">
                <img :src="item.img" :alt="item.url">
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/pizzaList">
                    <img src="../assets/images/menu1.png" alt="">
                    <div class="mui-media-body">Pizza</div>
                </router-link>
            </li>m
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/fastList">
                    <img src="../assets/images/menu2.png" alt="">
                    <div class="mui-media-body">汉堡薯条</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/hanList">
                    <img src="../assets/images/menu3.png" alt="">
                    <div class="mui-media-body">韩式料理</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/iceList">
                    <img src="../assets/images/menu4.png" alt="">
                    <div class="mui-media-body">冰激凌</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/mainList">
                    <img src="../assets/images/menu5.png" alt="">
                    <div class="mui-media-body">主食专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/drinkList">
                    <img src="../assets/images/menu6.png" alt="">
                    <div class="mui-media-body">热卖饮品</div>
                </router-link>
            </li>
        </ul>
            </div>
        </div>
    </div>
</template>

<script>
import mui from "MUI/js/mui.js";
export default {
  data: function() {
    return {
      lunboList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
    });
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getlunbo").then(function(data) {
        // console.log(data);
        if (data.body.status === 0) {
          this.lunboList = data.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 75%;
    height: 75%;
  }

  .mui-media-body {
    font-size: 13px;
  }
}
</style>
