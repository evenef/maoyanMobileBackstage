import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import App from './FilmMent/setMovie.vue'

import App from './App.vue'

import router from './router/router.js'
// import store from "./store.js"

Vue.use(ElementUI)

new Vue({
	el: "#app",
	router,
	// store,
	template: `<App />`,
	components: { App }
})




