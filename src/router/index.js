import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/Recommend'
import Singer from '@/views/Singer'
import Search from '@/views/Search'
import TopList from '@/views/TopList'
import SingerDetail from '@/views/SingerDetail'
import Album from '@/views/Album'
import TopDetail from '@/views/TopDetail'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/toplist',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
