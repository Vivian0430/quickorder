<template>
    <div class="mui-scroll-wrapper" style="top: 10vh;bottom: 8vh;">
        <div class="mui-scroll">
    <div class="detail-container">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <img :src="detail.img_url">
        <div class="mui-card">
            <div class="mui-card-header">{{ detail.name }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>购买数量：<number-box @func="getSelecedCount" :max="detail.stock_quantity"></number-box></p>
                    <p>
                        <mt-button type="primary" size="small" style="margin-right: 3vw">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <p>价格：￥{{ detail.price }}</p>
        <p>总销售量：{{ detail.sale_count }}</p>
        <p>简介：{{ detail.description }}</p>
        <div style="height: 5vh"></div>
        <!--使用子组件-->
        <Comment :id="id"></Comment>
    </div>
    </div>
    </div>
</template>

<script>
import mui from "MUI/js/mui.js";
import Comment from "@/components/common/comment.vue";
import NumberBox from "@/components/common/numberbox.vue";
export default {
  data: function() {
    return {
      id: this.$route.params.id,
      detail: {},
      selectedCount: 1,
      //控制小球是否显示
      ballFlag: false
    };
  },
  beforeCreate() {},
  created() {
    this.getDetail();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getDetail() {
      this.$http.get("api/getdetail/" + this.id).then(function({ body }) {
        if (body.status === 0 && body.message.length > 0)
          this.detail = body.message[0];
      });
    },
    getSelecedCount(count) {
      this.selectedCount = count;
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      const obj = {
        id: this.id,
        count: this.selectedCount,
        price: this.detail.price,
        selected: true
      };
      this.$store.commit("addToCar", obj);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 1.5s ease";
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      el.style.transition = null;
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    Comment,
    NumberBox
  }
};
</script>

<style lang="less" scoped>
.detail-container {
  padding: 0 4px;
  img {
    width: 80%;
    height: 80%;
    position: relative;
    left: 50%;
    top: 2vh;
    transform: translateX(-50%);
  }
  .mui-card {
    padding: 0 10px;
    margin-top: 6vh;
    .mui-card-header {
      padding: 0 !important;
    }
    .mui-card-content {
      padding: 0 !important;
      .mui-card-content-inner {
        padding: 0 !important;
        p {
          padding: 0 !important;
        }
      }
    }
  }
  p {
    color: #000;
    margin: 15px 0;
    padding: 0 10px;
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>
