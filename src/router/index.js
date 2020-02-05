import Vue from 'vue';
import VueRouter from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
// Admin
import Dashboard from '@/components/admin/Dashboard';
import Products from '@/components/admin/pages/Products';
import Coupons from '@/components/admin/pages/Coupons';
import Orders from '@/components/admin/pages/Orders';
// Shopping
import Base from '@/components/Base';
import Index from '@/components/pages/Index';
import Category from '@/components/pages/Category';
import Detail from '@/components/pages/Detail';
import AboutMS from '@/components/pages/AboutMS';
import CustomerOrder from '@/components/pages/CustomerOrder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Login from '@/components/pages/Login';

Vue.use(VueRouter);

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [{
      path: '*',
      redirect: '/index',
    },
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
      redirect: '/index',
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
          name: 'Detail', // 個別商品介紹
          path: 'detail/:id', // 動態路由
          component: Detail,
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
      ],
    },
    {
      name: 'Login', // 登入
      path: '/login',
      component: Login,
    },
  ]
});
