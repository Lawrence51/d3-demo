import VueRouter from "vue-router";

const constRouters = [
    // 首页
    {
        path: "/",
        name: "desc",
        component: resolve => require(["./pages/desc"], resolve),
        meta: { isMenu: true }
    },
    {
        path: "/tree",
        name: "树",
        component: resolve => require(["./pages/tree"], resolve),
        meta: { isMenu: true }
    }
]

const router = new VueRouter({
    routes: constRouters
});

export default router;