import {defineStore} from 'pinia'
import { Names, __piniaKey__ } from '../store-information'
export const useTESTStore = defineStore(Names.TEST,{
    state:()=> {
        return {
            current: 1,
            clue: '1',
            path: '/',
            name: 'Index',
            redirect: '',
            method: 'guideIndex',
            alias: '[]',
            father:undefined
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
    actions:{
        setCurrent() {
            this.current+=2
        }
        // 其他情况下可以使用Test.$patch 对store进行修改
    },
    persist: {
  // 修改存储中使用的键名称，默认为当前 Store的 id
        key: `${__piniaKey__}-${Names.TEST}`,
        // 修改为 sessionStorage，默认为 localStorage
        storage: sessionStorage,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['current'],
    },
})
