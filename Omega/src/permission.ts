import router from './router'
import { permissionConfirm } from "@/api/permission"
import {searchTname} from '@/api/table'
import { createVNode, render } from 'vue'
import { useZeusStore, useTESTStore,useAstraeaStore,useDemeterStore ,useHermesStore} from "@/store";
import loadingBar from './components/generalComponent/loadingBar.vue'
const loadingBarVnode = createVNode(loadingBar)
render(loadingBarVnode, document.body)
router.beforeEach((to, from, next) => {
    loadingBarVnode.component?.exposed?.startLoading()
    const Test = useTESTStore()
    const Zeus = useZeusStore()
    const Astraea = useAstraeaStore()
    if (to.path == '/sign') {
        Zeus.token = ''
        Astraea.$reset()
    }
    if (Astraea.privilege.includes(to.path)) next()
    else {
        permissionConfirm().then((res) => {
            Zeus.hasTokenFlag = !res.data.status
            Zeus.username = res.data.username
            Astraea.route = res.data.route
            Astraea.menu = res.data.menu
            if (Zeus.hasTokenFlag) {
                if (Astraea.stayRoute(to.path)) { 
                    if (!router.hasRoute(Astraea.selfName(to.path))) {
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
    const Hermes = useHermesStore()
    const Astraea = useAstraeaStore()
    const Demeter = useDemeterStore()
    const section = to.path.split('/')
    Hermes.librakey = section[section.length - 1]
    
})