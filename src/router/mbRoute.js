const mbRoute = [
  {
    path: '/m',
    component: resolve => require(['../views/pc/Home'], resolve),
    children: []
  }
]

export default mbRoute
