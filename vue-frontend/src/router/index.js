// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'authors',
    component: () => import('@/views/Authors/AuthorList.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  // {
  //   path: '/authors',
  //   name: 'authors',
  //   component: () => import('@/views/Authors/AuthorList.vue')
  // },
  {
    path: '/add-author',
    name: 'add-author',
    component: () => import('@/views/Authors/AddNewAuthor.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/Books/BookList.vue')
  },
  {
    path: '/add-book',
    name: 'add-book',
    component: () => import('@/views/Books/AddNewBook.vue')
  },
  {
    path: '/edit-book/:bookId',
    name: 'edit-book',
    component: () => import('@/views/Books/AddNewBook.vue'),
    props: true, // Pass route params as component props
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;