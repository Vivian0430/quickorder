<template>
    <div class="shopcar-container mui-scroll-wrapper" style="top:60px;bottom:60px">
         <div class="mui-scroll" style="z-index: -1;">
        <!-- 商品列表项区域 -->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div v-for="item in goodslist" :key="item.id" class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getSelectedGood[item.id]" @change="switchChanged($store.getters.getSelectedGood[item.id],item.id)"></mt-switch>
                        <img :src="item.original_path" alt="">
                        <div class="info">
                            <h1 class="name">{{ item.name }}</h1>
                            <p>
                                <span class="price">￥{{ item.price }}</span>
                                <shop-box class="shopbox" :goodid="item.id" :initCount="$store.getters.getGoodsCount[item.id]"></shop-box>
                            </p>
                            <a class="delete" @click="deleteGood(item.id)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计{{ $store.getters.getSelectGoodMsg.sumprice }}</p>
                        <p>已勾选商品 <span class="red">{{ $store.getters.getSelectGoodMsg.sumcount }}</span> 件，总价<span class="red">￥{{ $store.getters.getSelectGoodMsg.sumprice }}</span></p>
                    </div>
                    <mt-button type="danger" @click="commitOrder" style="font-size: 17px">结算</mt-button>
                </div>
            </div>
        </div>
         </div>
    </div>
</template>

<script>
import ShopBox from "@/components/common/cartbox.vue";
import Vue from "vue";
import mui from "MUI/js/mui.js";
export default {
  data: function() {
    return {
      goodslist: [],
      rootPath: Vue.http.options.root
    };
  },
  created() {
    let car = JSON.parse(localStorage.getItem("car"));
    if (car !== null && car.length !== 0) {
      this.getGoodsList();
    }
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let uname = sessionStorage.getItem("username");
    this.name = uname;
    /*如果cookie不存在，则跳转到登录页*/
    if (uname == null) {
      this.$router.push("/login");
    }
  },
  methods: {
    getGoodsList() {
      //获取购物车中所保存的商品id
      let idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      this.$http
        .get("api/goods/getcartlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
            this.goodslist.forEach(item => {
              item.original_path = this.rootPath + item.original_path;
            });
          }
        });
    },
    commitOrder() {
      let car = JSON.parse(localStorage.getItem("car"));

      /*  this.$store.state.car.forEach(item => {*/
      if (car == null || car.length == 0) {
        mui.alert("小主，购物车是空的哦");
      } else {
        /*for (let i = 0; i < car.length; i++) {
          let data = {
            id: car[i].id,
            count: car[i].count,
            price: car[i].price,
            selected: car[i].selected
          };
          console.log(data);
          this.$http
            .post("api/goods/addcart/", data, { emulateJSON: true })
            .then(function() {});
        }*/
        this.$router.push("/order");
      }
    },
    deleteGood(id) {
      this.$store.commit("deleteCar", id);
      //手动删除goodslist数组对应的信息
      let idx = this.goodslist.findIndex(item => {
        return item.id === id;
      });
      this.goodslist.splice(idx, 1);
    },
    switchChanged(isselectd, id) {
      let obj = {
        isselectd,
        id
      };
      this.$store.commit("updateCar", obj);
    }
  },
  watch: {},
  components: {
    ShopBox
  }
};
</script>

<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
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
    .delete {
      position: relative;
      bottom: 1vw;
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
