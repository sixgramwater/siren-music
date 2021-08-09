import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  dva: {

  },
  proxy: {
    // '/static': {
    //   target: 'http://localhost:3002',
    //   pathRewrite: {'^/static': ''},
    //   changeOrigin: true,
    // }
  }
});
