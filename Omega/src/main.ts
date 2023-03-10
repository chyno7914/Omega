import { createApp ,toRaw} from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import ElementUi from 'element-plus'
import router from './router'
import 'element-plus/dist/index.css'
type Options = {
    key?:string
}
const __piniaKey__:string ="Chyno"
const setStorage = (key: string, value: any)=>{
    localStorage.setItem(key,JSON.stringify(value))
}
const getStorage = (key: string) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}
const PiniaPlugin = (options:Options|undefined) =>{
    return (context: PiniaPluginContext) => {
        const { store } = context
        const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
        store.$subscribe(()=>{
                // console.log('change');
                setStorage(`${options?.key??__piniaKey__}-${store.$id}`,toRaw(store.$state) )
        })
        
        
        return {
            ...data
        }
    }
}
const app = createApp(App)
const store = createPinia()
store.use(PiniaPlugin({
    key:'Omega'
}))
app.use(store)
app.use(router)
app.use(ElementUi)
app.mount('#app')
