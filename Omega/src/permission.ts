import router from './router'
import { permissionConfirm } from "./api/permission"
import { createVNode, render } from 'vue'
import { useHorkesStore, useTESTStore,useAstraeaStore } from "./store";
import loadingBar from './components/generalComponent/loadingBar.vue'
const loadingBarVnode = createVNode(loadingBar)
render(loadingBarVnode, document.body)
router.beforeEach((to, from, next) => {
    const Test = useTESTStore()
    const Horkes = useHorkesStore()
    const Astraea = useAstraeaStore()
    loadingBarVnode.component?.exposed?.startLoading()
    if (to.path == '/sign') {
        Horkes.token = ''
        Astraea.$reset()
    }
    if (Astraea.privilege.includes(to.path)) next()
    else {
        permissionConfirm().then((res) => {
            Horkes.hasTokenFlag = !res.data.status
            if (Horkes.hasTokenFlag) {
                if (Astraea.stayRoute(to.path)) { 
                    if (!router.hasRoute(Astraea.selfName(to.fullPath))) {
                        Astraea.route.forEach((track: any) => {
                            router.addRoute(track.father ?? '', {
                                path: track.path,
                                name: track.name,
                                alias: eval(track.alias),
                                redirect: track.redirect,
                                component: () => Astraea[track.method](),
                                children: []
                            })
                        })
                        console.log(1);
                        
                    Astraea.hasAccretionFlag = true
                    }
                    Astraea.hasAccretionFlag ? next(to.fullPath) : next()
                    Astraea.hasAccretionFlag = false
                }else next('/404')
                
            } else next('/sign')
        })
    }
})

router.afterEach((to, from) => {
    loadingBarVnode.component?.exposed?.endLoading()
    console.log(router.getRoutes());
    
})