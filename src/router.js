import Vue from "vue";
import Router from "vue-router";
const PizzaList = () => import("@/components/home/PizzaList.vue");
const IceList = () => import("@/components/home/IceList.vue");
const Detail = () => import("@/components/home/Detail.vue");
const FastList = () => import("@/components/home/FastList.vue");
const MainList = () => import("@/components/home/MainList.vue");
const HanList = () => import("@/components/home/HanList.vue");
const DrinkList = () => import("@/components/home/DrinkList.vue");
const Login = () => import("@/components/common/login.vue");
const Register = () => import("@/components/common/register.vue");
const Changepwd = () => import("@/components/common/changepwd.vue");
const Order = () => import("@/components/common/order.vue");
const UserInfo = () => import("@/components/common/userinfo.vue");
const EditInfo = () => import("@/components/common/editinfo.vue");
/*import store from "./store/store";
import router from "./router";*/
//路由懒加载
const HomeContainer = () => import("@/views/HomeContainer.vue");
const MenuContainer = () => import("@/views/MenuContainer.vue");
const CartContainer = () => import("@/views/CartContainer.vue");
const MineContainer = () => import("@/views/MineContainer.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: HomeContainer,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/menu",
      component: MenuContainer,
      meta: {
        title: "菜单"
      }
    },
    {
      path: "/cart",
      component: CartContainer,
      meta: {
        title: "购物车"
        /*requireAuth: true*/
      }
    },
    {
      path: "/mine",
      component: MineContainer,
      meta: {
        title: "个人中心"
        /*requireAuth: true*/
      }
    },
    {
      path: "/home/pizzaList",
      component: PizzaList,
      meta: {
        title: "Pizza"
      }
    },
    {
      path: "/home/iceList",
      component: IceList,
      meta: {
        title: "IceCream"
      }
    },
    {
      path: "/home/detail/:id",
      component: Detail,
      meta: {
        title: "美食详情"
      }
    },
    {
      path: "/home/fastList",
      component: FastList,
      meta: {
        title: "FastFood"
      }
    },
    {
      path: "/home/mainList",
      component: MainList,
      meta: {
        title: "主食专区"
      }
    },
    {
      path: "/home/hanList",
      component: HanList,
      meta: {
        title: "限量秒杀"
      }
    },
    {
      path: "/home/drinkList",
      component: DrinkList,
      meta: {
        title: "限量秒杀"
      }
    },
    {
      path: "/login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        title: "注册"
      }
    },
    {
      path: "/changepwd",
      component: Changepwd,
      meta: {
        title: "修改密码"
      }
    },
    {
      path: "/order",
      component: Order,
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/userinfo",
      component: UserInfo,
      meta: {
        title: "个人信息"
      }
    },
    {
      path: "/editinfo",
      component: EditInfo,
      meta: {
        title: " "
      }
    }
  ],
  linkActiveClass: "mui-active"
});

/*router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.state.token) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});*/
