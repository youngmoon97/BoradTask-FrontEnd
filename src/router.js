// src/router.js

import Vue from 'vue'
import VueRouter from 'vue-router'
// import PageHome from './components/PageHome'
import BoardList from './components/BoardList'
import BoardInsert from './components/BoardInsert'
import BoardDetail from './components/BoardDetail'

Vue.use(VueRouter) // vue 에서 vue router 를 사용하기 위해 알려줘야합니다.

export const router = new VueRouter({
  mode: 'history', // browser history mode 를 사용합니다.
  routes: [
    {
      path: '/',
      component: BoardList
    },
    {
      path: '/boardinsert',
      component: BoardInsert
    },
    {
      path: '/boarddetail',
      component: BoardDetail
    }
  ] // path 별 component 를 추가합니다.
})

export default router
