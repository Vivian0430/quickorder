<template>
    <div  class="menu">
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div id="muiScroll" class="mui-scroll">
            <div v-for="(item,index) in cates" :key="item.id" :class="['mui-control-item',item.id==0?'mui-active':'']" @touchstart="toggle(item.id,index)">
                {{ item.title }}
            </div>
        </div>
        <div class="mui-scroll-wrapper" style="display: inline;top: 7vh;left: 25vw;bottom:63px;width: 75vw;">
        <ul id="muiTable" class="mui-table-view">
            <li v-for="(item,index) in list" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link class="mui-media-object mui-pull-left" :to="'/home/detail/'+item.id" :src="rootPath+item.original_path" alt="" tag="img"></router-link>
                    <div class="info">
                        <h1 class="name">{{ item.name }}</h1>
                        <p>
                            <span class="price">￥{{ item.price }}</span>
                            <menu-box @func="getSelecedCount" class="menubox"></menu-box>
                        </p>
                        <a class="addCart" style="font-size: 12px" @click="addToShopCar(index)">加入购物车</a>
                    </div>
            </li>
        </ul>
        </div>
  </div>
</template>
<script>
import mui from "MUI/js/mui.js";
import Vue from "vue";
import MenuBox from "@/components/common/menubox.vue";
export default {
  data: function() {
    return {
      cates: [],
      list: [],
      rootPath: Vue.http.options.root,
      selectedCount: 1,
      //控制小球是否显示
      ballFlag: false
    };
  },
  created() {
    this.getCatesData();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getCatesData() {
      this.$http.get("api/getallcategory").then(function({ body }) {
        if (body.status === 0) {
          this.cates = body.message;
          this.cates.unshift({ title: "全部", id: 0 });
          this.getFoodById(this.cates[0].id);
        }
      });
    },
    getFoodById(id) {
      this.$http.get("api/getallfood/" + id).then(function({ body }) {
        //  console.log(body);
        this.list = body.message;
      });
    },
    toggle(id, index) {
      this.getFoodById(id);
      let muiScroll = document.getElementById("muiScroll").children;
      // console.log(muiScroll);
      for (let i = 0; i < muiScroll.length; i++) {
        // console.log(muiScroll[i]);
        muiScroll[i].style.color = "black";
        muiScroll[i].style.backgroundColor = "#eaeaea";
        muiScroll[index].style.color = "#26a2ff";
        muiScroll[index].style.backgroundColor = "white";
      }
    },
    getSelecedCount(count) {
      this.selectedCount = count;
    },
    addToShopCar(index) {
      this.ballFlag = !this.ballFlag;
      const obj = {
        id: this.list[index].id,
        count: this.selectedCount,
        price: this.list[index].price,
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
    MenuBox
  }
};
</script>

<style lang="less" scoped>
.menu {
  .mui-scroll {
    height: 100%;
    display: inline-block !important;
    width: 25% !important;
    background-color: #eaeaea;
    float: left;
  }

  .mui-table-view {
    display: inline-block !important;
    width: 100% !important;

    li {
      height: 15vh;

      h1 {
        font-size: 14px;
      }

      img {
        height: 11vh;
        width: 11vh;
        max-width: 11vh !important;
      }

      .info {
        margin-left: 5vw;

        .price {
          color: red;
          font-weight: bold;
          margin-right: 15vw;
          position: relative;
          top: 1vw;
          display: inline-block;
          width: 11vw;
        }
      }

      .addCart {
        position: relative;
        bottom: 1vw;
      }
    }
  }
}

.mui-control-item {
  height: 8vh;
  line-height: 8vh;
  width: 100%;
  text-align: center;
  font-size: 15px;
}

.mui-active {
  background-color: white;
  color: #26a2ff;
}

.mui-scroll {
  position: unset !important;
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
</style>
