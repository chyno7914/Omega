import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import ElementUi from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
const PiniaPlugin = (context: PiniaPluginContext) =>{
    const {store} = context
    store.$subscribe(()=>{
        console.log('change');
        
    })
    console.log(store);
}
const app = createApp(App)
const store = createPinia()
store.use(PiniaPlugin)
app.use(store)
app.use(router)
app.use(ElementUi)
app.mount('#app')
