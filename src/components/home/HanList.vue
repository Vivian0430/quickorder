<template>
    <div class="mui-scroll-wrapper" style="top: 9vh;bottom: 8vh;">
    <div class="goods-list">
        <router-link :to="'/home/detail/'+item.id" v-for="item in goodslist" :key="item.id" class="goods-item">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.name }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="small" style="outline: none;border: #efeff4;position: relative;left: 35vw;background-color: #efeff4;color: #000" @click="getMore">加载更多...</mt-button>
    </div>
    </div>
</template>

<script>
import Vue from "vue";
import mui from "MUI/js/mui.js";
export default {
  data: function() {
    return {
      pageindex: 1, // 分页的页数
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getGoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message);
            console.log(this.goodslist);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;

    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;

      p {
        margin: 0;
        padding: 5px;
      }

      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }

        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
