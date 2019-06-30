import Vue from 'vue'
import Router from 'vue-router'
import Product from './views/Product.vue'
import Form from '@/views/Form.vue'
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
import Cart from './views/Cart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: Form,
      children: [
        {
          path: 'login',
          component: FormLogin
        },
        {
          path: 'register',
          component: FormRegister
        }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
