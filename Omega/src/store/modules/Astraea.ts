import {defineStore} from 'pinia'
import internal from 'stream'
import { Names, __piniaKey__ } from '../store-information'
import { getCurrentInstance } from 'vue';
const stars = await import("@/utils/routeGuide")
interface Club extends MenuList{
    path: string,
    name: string,
    alias: string,
    redirect: string,
    component: string,
    method: string,
    title: string,
    father: string,
    level: number,
    role: number,
}
interface MenuList {
    mid: number,
    sign: string,
    icon:string
}
export const useAstraeaStore = defineStore(Names.Astraea,{
    state:()=> {
        return {
            route: <Array<Club>>[],
            hasAccretionFlag: false,
            newAccretionCounter: 0,
            ...stars,
            privilege: ['/sign', '/404'],
            menu: <Array<MenuList>>[],
            instance: getCurrentInstance(),
              // asyncRoute:this.route.map((item:any)=>{item.path})
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{
        asyncRoute():any{
            return this.route.map((item:any)=>item.path)
        },

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
        },
        retrieleaves(index:number):any{
            return this.route.filter(item => item.mid==index)
        },
        arbiDirction(path: string, factor: string) {
              const splitPath = path.split('/');
                const splitFactor = factor.split('/');
                // 删除 factor 中元素为空字符串的项
                const factorWithoutEmpty = splitFactor.filter(item => item !== '');
                // 查找 factor 在 path 中的位置
                const index = splitPath.findIndex((item, index) => {
                    if (index + factorWithoutEmpty.length > splitPath.length) {
                    return false; // 路径长度不足，无法匹配 factor
                    }
                    for (let i = 0; i < factorWithoutEmpty.length; i++) {
                    if (splitPath[index + i] !== factorWithoutEmpty[i]) {
                        return false; // 有不匹配的元素
                    }
                    }
                    return true; // 匹配成功
                });

                if (index >= 0) {
                    // 如果找到了匹配的部分，则组装最终结果
                    const result = splitPath.slice(0, index).join('/');
                    return result === '' ? '/' : result;
                } else {
                    // 没有找到匹配的部分，返回原始路径
                    return path;
                }
        }
        // 其他情况下可以使用Test.$patch 对store进行修改
    },
})