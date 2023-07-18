// src/router.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardList from './components/BoardList'
import BoardInsert from './components/BoardInsert'
import BoardDetail from './components/BoardDetail'
import BoardUpdate from './components/BoardUpdate'

Vue.use(VueRouter) // vue 에서 vue router 를 사용하기 위해 알려줘야합니다.

export const router = new VueRouter({
  mode: 'history', // browser history mode 를 사용합니다.
  routes: [
    {
      path: '/',
      component: BoardList,
      name: 'BoardList'
    },
    {
      path: '/boardupdate',
      component: BoardUpdate,
      name: 'BoardUpdate'
    },
    {
      path: '/boardinsert',
      component: BoardInsert,
      name: 'BoardInsert'
    },
    {
      path: '/boarddetail',
      component: BoardDetail,
      name: 'BoardDetail'
    }
  ] // path 별 component 를 추가합니다.
})

export default router
