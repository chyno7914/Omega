import {defineStore} from 'pinia'
import { Names, __piniaKey__ } from '../store-information'
const stars = await import("@/utils/routeGuide")
interface Club {
    path: string,
    name: string,
    alias: string,
    redirect: string,
    component: string,
    method: string,
    title: string,
    father: string,
    level: number,
    role:number
}
export const useAstraeaStore = defineStore(Names.Astraea,{
    state:()=> {
        return {
            route: <Array<Club>>[],
            hasAccretionFlag: false,
            newAccretionCounter: 0,
            ...stars,
            privilege:['/sign','/404']
              // asyncRoute:this.route.map((item:any)=>{item.path})
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{
        asyncRoute():any{
            return this.route.map((item:any)=>item.path)
        }
    },
    actions:{
        stayRoute(path:string ):boolean {
            for (let i in this.asyncRoute) {
                if (path == this.asyncRoute[i]) {
                    return true
                }
            }
            return false
        },
        selfName(path:string):string {0
            let tray = this.route.filter((item) => {
                return item.path === path 
            })
            return tray[0]?.name??'/sign'
        },
        egoReality(path: string) {
            return this.route.filter((item) => {
                return item.path === path
            })
        },
        verdict(route: Club){
            return {
                path: route.path,
                name: route.name,
                alias: eval(route.alias),
                redirect: route.redirect,
                component: () => this[route.method](),
            }
        }
        // 其他情况下可以使用Test.$patch 对store进行修改
    },
    persist: {
//   修改存储中使用的键名称，默认为当前 Store的 id
        key: `${__piniaKey__}-${Names.Astraea}`,
        // 修改为 sessionStorage，默认为 localStorage
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['route'],
    },
})