import VueRouter from "vue-router";

const constRouters = [
    // 首页
    {
        path: "/",
        name: "desc",
        component: resolve => require(["./pages/introduction"], resolve),
        meta: { isMenu: true }
    },
    {
        path: "/tree",
        name: "树",
        component: resolve => require(["./pages/tree"], resolve),
        meta: { isMenu: true }
    },
    {
        path: "/xmind",
        name: "脑图",
        component: resolve => require(["./pages/xmind"], resolve),
        meta: { isMenu: true }
    }
]

const router = new VueRouter({
    routes: constRouters
});

export default router;