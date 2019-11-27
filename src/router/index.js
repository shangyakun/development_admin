import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import detail from '@/components/detail'
import config from '@/components/config'
import model from '@/components/model'
import link from '@/components/link'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/config',
      name: 'config',
      component: config
    },
    {
      path: '/model',
      name: 'model',
      component: model
    },
    {
      path: '/link',
      name: 'link',
      component: link
    },               
  ]
})
