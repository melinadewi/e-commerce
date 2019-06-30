import Vue from 'vue'
import Router from 'vue-router'
import Product from './views/Product.vue'
import FormAddProduct from '@/components/FormAddProduct.vue'
import FormEditProduct from '@/components/FormEditProduct.vue'
import ListProduct from '@/components/ListProduct.vue'

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
      path: '/product',
      name: 'product',
      component: Product,
      children: [
        {
          path: 'list',
          component: ListProduct
        },
        {
          path: 'add',
          component: FormAddProduct
        },
        {
          path: 'edit',
          component: FormEditProduct
        }
      ]
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
