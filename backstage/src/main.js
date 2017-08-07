import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './users/users.vue'

// import store from "./store.js"

Vue.use(ElementUI)

new Vue({
	el: "#app",
	// store,
	template: `<App />`,
	components: { App }
})




