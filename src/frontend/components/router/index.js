import { createRouter, createWebHistory } from 'vue-router'

import Home from './home.vue'
import List from './list.vue'
import Process from './process.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/list', component: List },
	{ path: '/process/:id', component: Process }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router