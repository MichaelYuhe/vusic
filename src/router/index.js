import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () => import('@/views/Recommend'/* webpackChunkName: "recommend" */)
const Singer = () => import('@/views/Singer'/* webpackChunkName: "singer" */)
const Search = () => import('@/views/Search'/* webpackChunkName: "search" */)
const TopList = () => import('@/views/TopList'/* webpackChunkName: "topList" */)
const SingerDetail = () => import('@/views/SingerDetail'/* webpackChunkName: "singerDetail" */)
const TopDetail = () => import('@/views/TopDetail'/* webpackChunkName: "topDetail" */)
const Album = () => import('@/views/Album'/* webpackChunkName: "album" */)
const MyList = () => import('@/views/MyList'/* webpackChunkName: "myList" */)

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
  },
  {
    path: '/mylist',
    component: MyList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
