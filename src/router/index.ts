// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Failedimage from '../views/Failedimage.vue'
import Sandbox from '../views/Sandbox.vue'
import Editor from '../views/Editor.vue'
import Reviewer from '../views/Reviewer.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Admin from '../views/Admin.vue'

function isEditor(to: any, from: any, next:any) {
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next()
    return
  }
 else if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next({ path: '/Reviewer' })
  }
  else if (userRole == 'pbr_DAQ6hgd_hgy-vkj') {
    next({ path: '/Admin' })
  }
  else{
    next({ path: '/' })
  }

}

function isReviewer(to: any, from: any, next:any) {
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next()
    return
  }
  else if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next({ path: '/Editor' })
  } 
  else if (userRole == 'pbr_DAQ6hgd_hgy-vkj') {
    next({ path: '/Admin' })
  }
  else{
    next({ path: '/' })
  }

}

function isAdmin(to: any, from: any, next:any) {
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'pbr_DAQ6hgd_hgy-vkj') {
    next()
    return
  }
  else if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next({ path: '/Editor' })
  } else if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next({ path: '/Reviewer' })
  }
  else{
    next({ path: '/' })
  }

}

function isLoggedin(to: any, from: any, next:any){
  let userRole = sessionStorage.getItem('role')
  if (userRole == 'hqc2xfn_buv3yuj5MEC') {
    next({ path: '/Reviewer' })
  } else if (userRole == 'hzc*EUW_vay4zue4gdb') {
    next({ path: '/Editor' })
}   else if (userRole == 'pbr_DAQ6hgd_hgy-vkj') {
  next({ path: '/Admin' })
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
          path: '/failedimage/:vehId/:imgName',
          name: 'Failedimage',
          component: Failedimage,
          props: true,
          beforeEnter: isEditor,
      },
      {
        path: '/sandbox',
        name: 'Sandbox',
        component: Sandbox,
        beforeEnter: isEditor,
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      beforeEnter: isEditor,
  },
  {
    path: '/reviewer',
    name: 'Reviewer',
    component: Reviewer,
    beforeEnter: isReviewer,
},
{
  path: '/admin',
  name: 'Admin',
  component: Admin,
  beforeEnter: isAdmin,
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
