// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Failedimage from '../views/Failedimage.vue'
import Sandbox from '../views/Sandbox.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
        {
          path: '/Failedimage/:vehId/:imgName',
          name: 'Failedimage',
          component: Failedimage,
          props: true
      },
      {
        path: '/Sandbox',
        name: 'Sandbox',
        component: Sandbox,
    },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
