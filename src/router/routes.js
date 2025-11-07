const routes = [
  // Mostrar la página de registro en la raíz '/'
  {
    path: '/',
    component: () => import('src/components/auth/RegisterForm.vue'),
  },

  // Mantener la aplicación principal en /home (antes en '/')
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'nuevoregistro', component: () => import('src/components/auth/RegisterForm.vue') },
    ],
  },

  {
    path: '/login',
    component: () => import('src/components/auth/LoginForm.vue'),
  },
  {
    path: '/register',
    component: () => import('src/components/auth/RegisterForm.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.)',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
