import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  // -ให้สร้างหน้าแสดงสินค้าพร้อมรายละเอียดสินค้า(แบบ shopee lazada หรือเว็บขายของ) พร้อมกับเลือกสินค้าเข้าตระกร้าได้
  // -หน้าตระกร้าแสดงสินค้าพร้อมราคา เพิ่มลบได้
  // -หน้าจัดการสินค้าและ Order
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/MeView.vue'),
  },
  {
    path: '/grade',
    name: 'grade',
    component: () => import('../views/GradeView.vue'),
  },
  {
    path: '',
    name: 'toolbar',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/ToolbarView.vue'),
    children: [
      {
        path: '/test',
        name: 'test',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/TestView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/HomeProductsView.vue'),
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/OrdersView.vue'),
      },
      {
        path: '/my-products',
        name: 'my-products',
        component: () => import('../views/OwnerProducts.View.vue'),
      },
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
