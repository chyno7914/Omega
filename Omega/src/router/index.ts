import { createRouter, createWebHistory } from 'vue-router'
import { useAstraeaStore } from "@/store"
import pinia from "@/store/pinia"
const Astraea = useAstraeaStore(pinia)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/sign',
            component: () => import('@/views/Login.vue'),
            alias:['/login','/Login'],
        },
        // {
        //     path: '/',
        //     name:'Index',
        //     component: () => import('@/views/Index.vue'),
            // redirect: 'welcome',
            // alias: [
            //     '/index',
            //     "/Index"
            // ],
            // children: [
            //     {
            //         path: 'try',
            //         component:()=>Astraea.iTry()
            //     },
            //     {
            //         path: 'welcome',
            //         component:()=>Astraea.iWelcome()
            //     }
            // ]
        // },
        {
            path: '/404',
            name:'404',
            component:()=>Astraea.error404()
        },
        // {
        //     path: '/:catchAll(.*)',
        //     redirect:"/404"
        // }
    ]
})
// const router = new VueRouter({
//   routes: [
//     {
//       path: '/',
//       redirect: '/login',
//     },
//     {
//       path: '/login',
//       component: Login,
//     },
//     {
//       path: '/home',
//       component: Home,
//       redirect: '/welcome',
//       children: [
//         { path: '/welcome', component: Welcome },
//         { path: '/users', component: Users },
//       ],
//     },
//   ],
// })
export default router