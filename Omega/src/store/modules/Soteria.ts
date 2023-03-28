import {defineStore} from 'pinia'
import { Names,__piniaKey__ } from '../store-information'
export const useSoteriaStore = defineStore(Names.Soteria,{
    state:()=> {
        return {
            
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
})