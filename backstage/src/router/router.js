import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import setup from "../setup/setup.vue"

Vue.use(Router)

export default new Router({
    //路由配置
    routes: [{
        path: "/",
        name: "setup",
        component: setup
    }]
})
