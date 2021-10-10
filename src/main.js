import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/Base/Loading/directive'
import noResultDirective from './components/Base/NoResult/directive'


// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).use(lazyPlugin, {
    loading: require('@/assets/images/loading.jpg')
}).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
