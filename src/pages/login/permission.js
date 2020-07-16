import router from "@/router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false }); // NProgress configuration

const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (sessionStorage.getItem("userInfo")) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // window.location.href = 'login.html' // ?redirect=${to.path}
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(to => {
  // setTitle(to)
  NProgress.done(); // 结束Progress
});
