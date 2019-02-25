<template>
    <div>
        <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <div v-for="item in cates" :key="item.id" :class="['mui-control-item',item.id==0?'mui-active':'']" @touchstart="toggle(item.id)">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
        <div class="mui-scroll-wrapper" style="top:90px;bottom: 75px">
            <div class="mui-scroll">
                <ul class="photo-list" ref="ulref">
                    <router-link v-for="item in list" :key="item.id" :to="'/home/detail/'+item.id" tag="li" ref="myli">
                        <img v-lazy="rootPath+item.img_url">
                        <div class="info">
                            <h1 class="info-title">{{ item.name }}</h1>
                            <div class="info-body">{{ item.description }}</div>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import mui from "MUI/js/mui.js";
import Vue from "vue";
export default {
  data: function() {
    return {
      cates: [],
      list: [],
      rootPath: Vue.http.options.root
    };
  },
  created() {
    this.getCatesData();
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCatesData() {
      this.$http.get("api/getcategory").then(function({ body }) {
        if (body.status === 0) {
          this.cates = body.message;
          this.cates.unshift({ title: "全部", id: 0 });
          this.getFoodById(this.cates[0].id);
        }
      });
    },
    getFoodById(id) {
      this.$http.get("api/getfood/" + id).then(function({ body }) {
        console.log(body);
        this.list = body.message;
      });
    },
    toggle(id) {
      this.getFoodById(id);
    }
  },
  components: {},
  updated() {
    this.$refs.ulref.style.height = 210 * this.list.length + "px";
  }
};
</script>

<style lang="less" scoped>
#slider {
  background-color: #efeff4;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;

    img {
      width: 100%;
      vertical-align: middle;
    }

    /*懒加载的样式*/

    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      width: 100%;

      .info-title {
        font-size: 14px;
      }

      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
