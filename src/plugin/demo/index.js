import DemoComponent from './Demo'

const Demo = {
  install: function(Vue) {
    Vue.component('Demo', DemoComponent)
  }
}

export default Demo
