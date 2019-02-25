<template>
    <div class="mui-scroll-wrapper" style="top: 10vh;bottom: 8vh;">
        <div class="mui-scroll">
            <div class="order-list">
                <div class="mui-card">
                    <div class="mui-card-content">
                        <div v-for="item in orderlist" :key="item.id" class="mui-card-content-inner">
                            <img :src="item.original_path" alt="">
                            <div class="info">
                                <h1 class="name">{{ item.name }}</h1>
                                <p>
                                    <span class="price">￥{{ item.price }}</span>
                                     <span>* {{ $store.getters.getGoodsCount[item.id] }}</span>
                                </p>
                            </div>
                        </div>
                        <p style="display: inline-block;top: 15px;left: 225px;color: red;position: relative;">￥{{ $store.getters.getSelectGoodMsg.sumprice }}</p>
                        <mt-button type="primary" style="float: right;margin: 10px;height: 32px;font-size: 15px;" @click="payMoney">付款</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import mui from "MUI/js/mui.js";
export default {
  name: "order",
  data: function() {
    return {
      orderlist: [],
      rootPath: Vue.http.options.root
    };
  },
  created() {
    this.getOrderList();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getOrderList() {
      //获取购物车中所保存的商品id
      let idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      this.$http
        .get("api/goods/getcartlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.orderlist = result.body.message;
            this.orderlist.forEach(item => {
              item.original_path = this.rootPath + item.original_path;
            });
          }
        });
    },
    payMoney() {
      mui.alert("付款成功，报手机后四位取餐");
      setTimeout(
        function() {
          this.$router.push("/cart");
        }.bind(this),
        1000
      );
    }
  }
};
</script>

<style lang="less" scoped>
.order-list {
  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
  }
  h1 {
    font-size: 14px;
  }
  .info {
    margin-left: 5vw;
    .price {
      color: red;
      font-weight: bold;
      margin-right: 20vw;
      position: relative;
      top: 1vw;
      display: inline-block;
      width: 10vw;
    }
  }
}
</style>
