import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';

import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';

import Base from '@/components/Base';
import Index from '@/components/pages/Index';
import Category from '@/components/pages/category';
import AboutMS from '@/components/pages/AboutMS';
import Login from '@/components/pages/Login';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';


Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [{
      path: '*',
      redirect: '/index',
    },
    // {
    //   name: 'Login',
    //   path: '/login',
    //   component: Login,
    // },
    {
      name: 'Dashboard',
      path: '/admin',
      component: Dashboard,
      children: [{
          name: 'Products',
          path: 'products',
          component: Products,
          meta: {
            requiresAuth: true
          },
        },
        {
          name: 'Coupons',
          path: 'coupons',
          component: Coupons,
          meta: {
            requiresAuth: true
          },
        },
        {
          name: 'Orders',
          path: 'orders',
          component: Orders,
          meta: {
            requiresAuth: true
          },
        },
      ],
    },
    {
      name: 'Base',
      path: '/',
      component: Base,
      children: [
        {
          name: 'Index', // 首頁
          path: '/index',
          component: Index,
        },
        {
          name: 'Category', // 所有商品
          path: 'category',
          component: Category,
        },
        {
          name: 'AboutMS', // 關於楓之谷
          path: 'aboutMS',
          component: AboutMS,
        },
        {
          name: 'CustomerOrder', // 購物車
          path: 'customerOrder',
          component: CustomerOrder,
        },
        {
          name: 'CustomerCheckout',
          path: 'customerCheckout/:orderId',
          component: CustomerCheckout,
        },
        {
          name: 'Login', // 登入
          path: 'login',
          component: Login,
        },
      ],
    },
  ]
});
