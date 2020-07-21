import Vue from 'vue'
import VueRouter from "vue-router";
import Home from "views/Home";
import Admin from "views/Admin";
import About from "views/About";
import Login from "views/Login";
import { getCookie } from 'util/cookie'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        component: Home,
        // redirect: '/login'
    },
    {
        path: '/admin', 
        component: Admin,
    },
    {
        path: '/about', 
        component: About,
    },
    {
        path: '/login', 
        component: Login,
    },
]


const router =  new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path === '/') {
        const hasToken = getCookie('token')
        !hasToken && next('/login') //check
    }
    from
    next()
})

export default router
