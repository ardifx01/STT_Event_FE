import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Index from '../views/index.vue'
import PrizeDrawEntries from '../views/PrizeDrawEntries.vue'
import StaffScanQR from '../views/StaffScanQR.vue'
import BoothVisit from '../views/ScannBoothVisit.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/spinwheel',
    name: 'PrizeDrawEntries',
    component: PrizeDrawEntries
  },
  {
    path:'/staff/register',
    name:'StaffScanQR',
    component:StaffScanQR
  },
  {
    path:'/staff/booth_visit',
    name:'BoothVisit',
    component:BoothVisit
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
