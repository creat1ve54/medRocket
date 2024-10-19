import popup from './popup'
import tooltip from './tooltip'

export default {
  install (Vue) {
    Vue.directive('tooltip', tooltip)
    Vue.directive('popup', popup)
  }
}