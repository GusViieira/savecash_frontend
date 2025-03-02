import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LayoutBase from '@/components/layouts/LayoutBase.vue'
import TransactionsView from '@/views/TransactionsView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    component: LayoutBase, // Envolvendo as páginas protegidas
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: TransactionsView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
