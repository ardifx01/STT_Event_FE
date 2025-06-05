import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Index from '../views/index.vue'
import PrizwDrawEntries from '../views/PrizeDrawEntries.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/admin/spinwheel',
    name: 'PrizeDrawEntries',
    component: PrizwDrawEntries
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
