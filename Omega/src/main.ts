import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia,PiniaPluginContext} from 'pinia'
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
app.mount('#app')
