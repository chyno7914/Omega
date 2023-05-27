// import { createApp ,toRaw,onBeforeMount} from 'vue'
// import './style.css'
// import App from './App.vue'
// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// import ElementPlus from 'element-plus'
// import router from './router'
// import installIcon from 'assets/icon'
// import 'element-plus/dist/index.css'
// import directivesPlugin from './directives';
// import './permission'
// const app = createApp(App)
// const store = createPinia()
// store.use(piniaPluginPersistedstate)
// app.use(store)
// app.use(router)
// app.use(ElementPlus)
// app.use(directivesPlugin)
// app.use(installIcon)
// app.mount('#app')
import { createApp, toRaw, onBeforeMount } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import VueSocketIO from 'vue-socket.io'
import ElementUi from 'element-plus'
import router from './router'
import installIcon from 'assets/icon'
import Directives from '@/directives'
import 'element-plus/dist/index.css'
import vue3SeamlessScroll from "vue3-seamless-scroll";

import '@/api/user'
import './permission'
const app = createApp(App)
const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(store)
app.use(vue3SeamlessScroll,{name:"vue3SeamlessScroll"})
app.use(router)
app.use(ElementUi)
app.use(Directives)
// app.use(new VueSocketIO({

//     debug: true,

//     connection: 'http://metinseylan.com:1992',  //

// }))
app.use(installIcon)
app.mount('#app')
// const __piniaKey__:string ="Chyno"
// const setStorage = (key: string, value: any)=>{
//     localStorage.setItem(key,JSON.stringify(value))
// }
// const getStorage = (key: string) => {
//     return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
// }
// const PiniaPlugin = (options:Options|undefined) =>{
//     return (context: PiniaPluginContext) => {
//         const { store } = context
//         const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
//         store.$subscribe(()=>{
//                 // console.log('change');
//                 setStorage(`${options?.key??__piniaKey__}-${store.$id}`,toRaw(store.$state) )
//         })
//         return {
//             ...data
//         }
//     }
// }
// store.use(PiniaPlugin({
//     key:'Omega'
// }))
// pinia.use(PiniaPlugin({
//     key:'Omega'
// }))