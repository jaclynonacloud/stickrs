import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainComponent from './views/Main'
import CollectionComponent from './views/Collection'
import StickrComponent from './views/Stickr'
import PackComponent from './views/Pack'
import ProfileComponent from './views/Profile'
import ModifyCollectionComponent from './views/modify/ModifyCollection'
import ModifyStickrComponent from './views/modify/ModifyStickr'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainComponent
    },
    //profile
    {
      path: '/profile/:slug',
      name: 'profile',
      component: ProfileComponent
    },
    //collection
    {
      path: '/collection/:slug',
      name: 'collection',
      component: CollectionComponent
    },
    {
      path: '/collection/new',
      name: 'collection-new',
      component: ModifyCollectionComponent
    },
    {
      path: '/collection/edit/:slug',
      name: 'collection-edit',
      component: ModifyCollectionComponent
    },
    //pack
    {
      path: '/pack/:slug',
      name: 'pack',
      component: PackComponent
    },
    //stickr
    {
      path: '/stickr/:coll/:slug',
      name: 'stickr',
      component: StickrComponent
    },
    {
      path: '/stickr/:coll/new',
      name: 'stickr-add',
      component: ModifyStickrComponent
    },
    {
      path: '/stickr/:coll/:slug/edit',
      name: 'stickr-edit',
      component: ModifyStickrComponent
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
