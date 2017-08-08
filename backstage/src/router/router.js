import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import users from "../users/users.vue"
import setup from "../setup/setup.vue"
import setupAdd from "../setup/setup-add.vue"

Vue.use(Router)

export default new Router({
    //路由配置
    routes: [{
        path: "/users",//用户
        name: "users",
        component: users
    }, {
        path: "/setup",//排片
        name: "setup",
        component: setup
    }, {
        path: "/setupAdd",//新增排片
        name: "setup-add",
        component: setupAdd
    }]
})
