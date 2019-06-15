const pcRoute = [
  {
    path: '/index',
    component: resolve => require(['../views/pc/Home'], resolve),
    children: []
  }
]

export default pcRoute
