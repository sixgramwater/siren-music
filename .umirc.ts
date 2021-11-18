import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/', component: '@/pages/index'
        },
        {
          exact: true,
          path: '/music', component: '@/pages/Music/index'
        },
        {
          exact: true,
          path: '/music/:id?', component: '@/pages/Playing/index'
        },
        {
          exact: true,
          path: '/playing', component: '@/pages/Playing/index'
        }
      ],
    }
  ],
  fastRefresh: {},
  dva: {},
  proxy: {
    // '/static': {
    //   target: 'http://localhost:3002',
    //   pathRewrite: {'^/static': ''},
    //   changeOrigin: true,
    // }
    '/api': {
      target: 'https://monster-siren.hypergryph.com',
      changeOrigin: true,
    },
  },
});
