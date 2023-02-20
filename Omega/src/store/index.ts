import {defineStore} from 'pinia'
import {Names} from './store-name'
export const useTESTStore = defineStore(Names.TEST,{
    state:()=> {
        return {
            current:1,
            name:'小满'
        }
    },
    getters:{

    },
    actions:{
        
    }
})