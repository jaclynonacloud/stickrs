import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainComponent from './views/Main'
import CollectionComponent from './views/Collection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainComponent
    },
    {
      path: '/user/:id',
      name: 'user',
      component: CollectionComponent
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: CollectionComponent
    },
    {
      path: '/collection/edit/:id',
      name: 'collection-edit',
      component: CollectionComponent
    },
    {
      path: '/stickr/:coll/:id',
      name: 'stickr',
      component: CollectionComponent
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
