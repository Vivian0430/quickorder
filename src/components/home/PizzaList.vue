<template>
    <div>
        <ul class="mui-table-view">
            <li v-for="item in pizzaList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/detail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
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
</template>

<script>
export default {
  data: function() {
    return {
      pizzaList: []
    };
  },
  created() {
    this.getPizzaList();
  },
  methods: {
    getPizzaList() {
      this.$http.get("api/getpizzalist").then(function({ body }) {
        if (body.status === 0) {
          this.pizzaList = body.message;
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
