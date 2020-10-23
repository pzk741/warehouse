
let dynamicRoutes = [
    {
        path: "/",
        component: () => import(/* webpackChunkName: "index" */ "../../pages/index"),
        children: []
    },
    {
        path: "*",
        component: () => import(/* webpackChunkName: "page404" */ "../../pages/page404")
    }
]
export default dynamicRoutes