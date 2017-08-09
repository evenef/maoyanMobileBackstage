import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import users from "../users/users.vue"
import setup from "../setup/setup.vue"
import setupAdd from "../setup/setup-add.vue"
import shangying from '../shangying/shangying.vue'
import film from "../FilmMent/movieMent.vue"
import cinema from "../FilmMent/cinema.vue"
Vue.use(Router)

export default new Router({
    //路由配置
    routes: [{
        path: "/users",//用户
        name: "users",
        component: users
    },{
        path: "/film",
        name: "film",
        component:film
    },{
        path: "/cinema",
        name: "cinema",
        component: cinema
    }, {
        path: "/setup",//排片
        name: "setup",
        component: setup
    }, {
        path: "/setupAdd",//新增排片
        name: "setup-add",
        component: setupAdd
    }, {
        path:"/Shangying",
        name:"Shangying",
        component: shangying
    }]
})
