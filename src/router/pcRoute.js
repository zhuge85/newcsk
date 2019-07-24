const pcRoute = [
  {
    path: '/index',
    component: resolve => require(['@v/pc/Index'], resolve),
    children: []
  },
  {
    path: '/home',
    component: resolve => require(['@v/pc/Home'], resolve)
  },
  {
    path: '/getdate',
    component: resolve => require(['@v/pc/GetDate'], resolve)
  },
  {
    path: '/vuex',
    component: resolve => require(['@v/pc/Vuex'], resolve)
  },
  {
    path: '/plugin',
    component: resolve => require(['@v/pc/Plugin'], resolve)
  },
  {
    path: '/getvalue',
    component: resolve => require(['@v/pc/Getvalue'], resolve)
  },
  {
    path: '/directives',
    component: resolve => require(['@v/pc/Directives'], resolve)
  },
  {
    path: '/mixins',
    component: resolve => require(['@v/pc/Mixins'], resolve)
  },
  {
    path: '/router',
    component: resolve => require(['@v/pc/Router'], resolve),
    children: [
      {
        path: '/',
        redirect: '/router/params'
      },
      {
        path: '/router/params',
        component: resolve => require(['@c/pc/RouterParams'], resolve)
      },
      {
        path: '/router/params/:id',
        component: resolve => require(['@c/pc/RouterParams'], resolve)
      }
    ]
  },
  {
    path: '/slot',
    component: resolve => require(['@v/pc/Slot'], resolve)
  },
  {
    path: '/nextTick',
    component: resolve => require(['@v/pc/NextTick'], resolve)
  }
]

export default pcRoute
