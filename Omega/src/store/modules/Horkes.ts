import {defineStore} from 'pinia'
import { Names,__piniaKey__ } from '../store-information'
export const useHorkesStore = defineStore(Names.Horkes,{
    state:()=> {
        return {
            token: '',
            hasTokenFlag: false,
            uid:-1
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
    persist: {
  // 修改存储中使用的键名称，默认为当前 Store的 id
        key: `${__piniaKey__}-${Names.Horkes}`,
        // 修改为 sessionStorage，默认为 localStorage
    },
})