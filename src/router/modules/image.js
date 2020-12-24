import Layout from '@/components/layout'

export default {
  path: '/image',
  component: Layout,
  redirect: '/image',
  meta: {
    title: '图片处理',
    icon: 'picture'
  },
  children: [
    {
      path: 'downAndUp',
      component: () => import('@mainView/image/downAndUp'),
      name: 'downAndUp',
      meta: {
        title: '上传下载',
        icon: 'upload',
        noCache: true,
        module: 'downAndUp',
        request: {
          list: 'list'
        }
      }
    },
    {
      path: 'home2',
      component: () => import('@mainView/test'),
      name: 'home2',
      meta: {
        title: '头像更换',
        icon: 'star',
        noCache: true,
        module: 'home2',
        request: {}
      }
    }
  ]
}
