import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LayoutBase from '@/components/layouts/LayoutBase.vue'
import TransactionsView from '@/views/transactions/TransactionsView.vue'
import ResetPassView from '@/views/ResetPassView.vue'
import BoxesView from '@/views/boxes/BoxesView.vue'
import SettingsView from '@/views/config/SettingView.vue'
import GoalsView from '@/views/goals/GoalsView.vue'
import WalletsView from '@/views/wallets/WalletsView.vue'
import CategoryView from '@/views/category/CategoryView.vue'

function isAuthenticated() {
  const token = localStorage.getItem('token')
  return token !== null
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassView,
  },
  {
    path: '/',
    component: LayoutBase,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomeView,
        meta: {
          requiresAuth: true,
          title: 'Olá, ',
        },
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: TransactionsView,
        meta: { requiresAuth: true, title: 'Lançamentos 🚀' },
      },
      {
        path: 'boxes',
        name: 'Boxes',
        component: BoxesView,
        meta: { requiresAuth: true, title: 'Caixinhas 💰'},
      },
      {
        path: 'goals',
        name: 'Goals',
        component: GoalsView,
        meta: { requiresAuth: true , title: 'Metas 🎯'},
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsView,
        meta: { requiresAuth: true, title: 'Configurações ⚙️'},
      },
      {
        path: 'wallets',
        name: 'Wallets',
        component: WalletsView,
        meta: { requiresAuth: true, title: 'Contas 💳' },
      },
      {
        path: 'category',
        name: 'Category',
        component: CategoryView,
        meta: { requiresAuth: true, title: 'Categorias 📂' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login') // Redireciona para a página de login se não estiver autenticado
  } else {
    next() // Permite a navegação
  }
})

export default router
