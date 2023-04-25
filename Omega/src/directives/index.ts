import { App } from 'vue';
import hasShow from './hasShow';
import limitSearch from './limitSearch'
import triangle from './triangle';
// 自定义指令
const directives = {
  hasShow,
  limitSearch,
  triangle
}
 
export default {
  install(Vue:App) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}