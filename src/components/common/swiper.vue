<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.src" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  created() {},
  props: ["lunbotuList", "isfull"],
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    /*让图片居中*/
    text-align: center;

    img {
      /*高度100%*/
      height: 100%;
    }
  }
}

/*是否启用宽度100%*/
.full {
  width: 100%;
}
</style>
