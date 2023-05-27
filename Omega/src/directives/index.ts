import { App } from 'vue';
import hasShow from './hasShow';
import limitElsearch from './limitElSearch'
import triangle from './triangle';
// 自定义指令
const directives = {
  hasShow,
  limitElsearch,
  triangle
}
 
export default {
  install(Vue:App) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}