import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vueresource from "vue-resource";

//注册vue-resource
Vue.use(Vueresource);
Vue.http.options.emulateJSON = true;
Vue.http.options.root = "http://www.youngonest.com:4000";
/*import axios from "./http";*/
import "./assets/css/my-mint.css";
//引入mintui并注册组件
import Mint from "mint-ui";
Vue.use(Mint);

import vueTap from "v-tap";
Vue.use(vueTap);

//引入mintui的样式
import "mint-ui/lib/style.css";

//引入MUI的样式
import "MUI/css/mui.css";
import "MUI/css/icons-extra.css";

//日期格式化插件
import moment from "moment";

//引入缩略图插件
import vuepreview from "vue-preview";
Vue.use(vuepreview);

/*import 'lib-flexible'*/

//定义一个全局时间过滤器
Vue.filter("dataFormatter", function(msg) {
  return moment(msg).format("YYYY-MM-DD HH:mm:ss");
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  /*axios,*/
  render: h => h(App)
}).$mount("#app");
