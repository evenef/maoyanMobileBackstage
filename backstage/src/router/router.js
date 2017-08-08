import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import setup from "../setup/setup.vue"
import users from "../users/users.vue"
import film from "../FilmMent/movieMent.vue"
import cinema from "../FilmMent/cinema.vue"
Vue.use(Router)

export default new Router({
    //路由配置
    routes: [{
        path: "/1",
        name: "setup",
        component: setup
    }, {
        path: "/users",
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
    }]
})
