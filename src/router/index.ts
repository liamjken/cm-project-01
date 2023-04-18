// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Failedimage from '../views/Failedimage.vue'
import Sandbox from '../views/Sandbox.vue'
import Editor from '../views/Editor.vue'
import Reviewer from '../views/Reviewer.vue'
import PageNotFound from '../views/PageNotFound.vue'

function isEditor(to: any, from: any, next:any) {
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next()
    return
  }
  if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next({ path: '/Reviewer' })
  } else{
    next({ path: '/' })
  }

}

function isReviewer(to: any, from: any, next:any) {
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next()
    return
  }
  if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next({ path: '/Editor' })
  } else{
    next({ path: '/' })
  }

}

function isLoggedin(to: any, from: any, next:any){
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next({ path: '/Reviewer' })
  } else if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next({ path: '/Editor' })
} else {
  next()
  return
}}

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        beforeEnter: isLoggedin
      },
        {
          path: '/Failedimage/:vehId/:imgName',
          name: 'Failedimage',
          component: Failedimage,
          props: true,
          beforeEnter: isEditor,
      },
      {
        path: '/Sandbox',
        name: 'Sandbox',
        component: Sandbox,
        beforeEnter: isEditor,
    },
    {
      path: '/Editor',
      name: 'Editor',
      component: Editor,
      beforeEnter: isEditor,
  },
  {
    path: '/Reviewer',
    name: 'Reviewer',
    component: Reviewer,
    beforeEnter: isReviewer,
},
{
  path: '/:pathMatch(.*)*',
  name: 'PageNotFound',
  component: PageNotFound
},
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
