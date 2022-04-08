export default [
  {
    path: '/',
    name: 'main',
    redirect: '/dashboard',
    component: () => import('@/templates/main/Main.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/Index.vue'),
      },
    ],
  },
];
