<template>
        <div class="mui-scroll-wrapper" style="top:7vh;bottom: 80px">
            <div class="mui-scroll">
                <div>
        <ul class="mui-table-view">
            <li v-for="item in iceList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/detail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url" alt="">
                    <div class="mui-media-body">
                        <h1 style="white-space:pre-wrap">{{ item.name }}</h1>
                        <p class='mui-ellipsis'>
                            <span>价格：￥{{ item.price }}</span>
                            <span>总销售量：{{ item.sale_count }}</span>
                        </p>
                    </div>
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
      iceList: []
    };
  },
  created() {
    this.getIceList();
  },
    mounted() {
        // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
        // 如果要操作元素最好在 mounted 里面，因为这里时候的DOM元素是最新的
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005
        });
    },
  methods: {
    getIceList() {
      this.$http.get("api/geticelist").then(function({ body }) {
        if (body.status === 0) {
          this.iceList = body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mui-table-view {
  li {
    height: 15vh;
    h1 {
      height: 5vh;
      line-height: 5vh;
      font-size: 14px;
    }
    img {
      height: 11vh;
      width: 11vh;
      max-width: 11vh !important;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
