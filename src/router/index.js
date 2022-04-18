import Vue from 'vue'
import VueRouter from 'vue-router'
import Forbidden from '../views/403.vue'
import NotFound from '../views/404'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 权限校验
import findLast from 'lodash/findLast'
import { check } from '@/utils/auth'
import { isLogin } from '../utils/auth'

import { notification } from 'ant-design-vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/user',
    hideInMenu: true,
    // component: { render: (h) => h('router-view') },
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/user/Register.vue')
      }
    ]
  },
  {
    path: '/',
    meta: {
      authority: ['user', 'admin']
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout'),
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          icon: 'dashboard',
          title: '仪表盘'
        },
        redirect: '/dashboard/workplace',
        component: { render: (h) => h('router-view') },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            meta: {
              title: '工作台'
            },
            component: () => import('@/views/dashboard/Workplace')
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: {
              title: '监控页',
              target: '_blank'
            }
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            meta: {
              title: '分析页'
            },
            component: () => import('@/views/dashboard/Analysis')
          }
        ]
      },
      // forms
      {
        path: '/form',
        name: 'form',
        meta: {
          icon: 'form',
          title: '表单页',
          authority: ['admin']
        },
        redirect: '/form/base-form',
        component: { render: (h) => h('router-view') },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            meta: {
              title: '基础表单'
            },
            component: () => import('@/views/form/BasicForm')
          },
          {
            path: '/form/step-form',
            hideChildrenInMenu: true,
            name: 'StepForm',
            meta: {
              title: '分步表单'
            },
            component: () => import('@/views/form/stepForm/StepForm'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info'
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () => import('@/views/form/stepForm/StepOne')
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () => import('@/views/form/stepForm/StepOne')
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () => import('@/views/form/stepForm/StepOne')
              }
            ]
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            meta: {
              title: '高级表单'
            },
            component: () => import('@/views/form/advancedForm/AdvancedForm')
          }
        ]
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }

  const record = findLast(to.matched, (record) => record.meta.authority)

  if (record && !check(record.meta.authority)) {
    if (!isLogin && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '您没有权限，请联系管理员！'
      })
      next({
        path: '/403'
      })
    }

    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
