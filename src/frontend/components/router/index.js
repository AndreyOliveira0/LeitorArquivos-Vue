import { createRouter, createWebHistory } from 'vue-router'

import Home from './home.vue'
import List from './list.vue'
import Process from './process.vue'

const routes = [
	{ path: '/', component: Home, meta: { title: 'Sistema Bonsae - Página Inicial' } },
	{ path: '/list', component: List, meta: { title: 'Sistema Bonsae - Controle de Importações' } },
	{ path: '/process/:id', component: Process, meta: { title: 'Sistema Bonsae - Editando Processo' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Sistema Bonsae'
  next()
})

export default router