export const RouterConfig = [
  {
    exact: true,
    path: '/', component: '@/pages/index',
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    }
  },
  {
    exact: true,
    path: '/music', component: '@/pages/Music/index',
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    }
  },
  {
    exact: true,
    path: '/music/:id?', component: '@/pages/Playing/index',
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    }
  },
  {
    exact: true,
    path: '/about', component: '@/pages/about/index',
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    }
  }
]
