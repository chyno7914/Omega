import {defineStore} from 'pinia'
import { Names } from './store-name'
export const useKEYStore = defineStore(Names.KEY,{
    state:()=> {
        return {
            token:''
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
})
export const useTESTStore = defineStore(Names.TEST,{
    state:()=> {
        return {
            current:1,
            name:'小满'
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
    actions:{
        setCurrent() {
            this.current = 1000
        }
        // 其他情况下可以使用Test.$patch 对store进行修改
    }
})