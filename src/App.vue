<template>
  <div id="app-container">

    <mt-header fixed :title="$route.meta.title" style="height: 7vh;line-height: 7vh;z-index: 2;" class="common-header">
      <a v-show="flag" slot="left" @click="goBack">
        <mt-button icon="back" style="height: 7vh;line-height: 7vh;">返回</mt-button>
      </a>
    </mt-header>

    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab" style="height: 4vh;line-height: 4vh;">
      <router-link class="mui-tab-itemllb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-itemllb" to="/menu">
        <span class="mui-icon mui-icon-bars"></span>
        <span class="mui-tab-label">菜单</span>
      </router-link>
      <router-link class="mui-tab-itemllb" to="/cart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span id="badge" class="mui-badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-itemllb" to="/mine">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      //flag只是用来表示返回按钮是否需要显示
      flag: this.$route.path !== "/home",
      //isBack用来标识当前的操作是前进还是后退
      isBack: false,
      transitionName: "slide-right"
    };
  },
  methods: {
    goBack() {
      this.isBack = true;
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (this.isBack) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
      this.isBack = false;

      if (newVal !== "/home") {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>

<style lang="less">
#app-container {
  padding-top: 7vh;
  padding-bottom: 4vh;
  /*避免PC端网页在页面切换的时候出现的水平滚动条*/
  overflow: hidden;
  height: 89vh;
}
body {
  touch-action: none;
}
.mui-icon-bars {
  font-size: 20px !important;
}
.mui-bar-tab .mui-tab-itemllb {
  display: table-cell;
  overflow: hidden;

  width: 1%;
  height: 50px;

  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: #929292;
}
.mui-bar-tab .mui-tab-itemllb.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-itemllb .mui-icon {
  top: 3px;

  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-itemllb .mui-icon ~ .mui-tab-label {
  font-size: 11px;

  display: block;
  overflow: hidden;

  text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-itemllb .mui-icon:active {
  background: none;
}

/*左边进入*/
.slide-left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
/*左边离开*/
.slide-left-leave-to {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
  position: absolute;
}

/*右边进入*/
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
/*右边离开*/
.slide-right-leave-to {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  position: absolute;
}

/*进入退出动画*/
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}

/*左边进入*/
.slide-left-enter {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
/*左边离开*/
.slide-left-leave-to {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
  position: absolute;
}

/*右边进入*/
.slide-right-enter {
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
/*右边离开*/
.slide-right-leave-to {
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  position: absolute;
}

/*进入退出动画*/
.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
</style>
