import {defineStore} from 'pinia'
import { Names,__piniaKey__ } from '../store-information'
export const useHermesStore = defineStore(Names.Hermes,{
    state:()=> {
        return {
            librakey: '',
            maxFloorWidth: 6,
            limitApplyStatus: [],
            limitApplyType:[]
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
    actions:{
        padNumber(num:string|number, length:number = 6,placeholder:any=' ') {
            // 将数字转为字符串
            let str = typeof num ==='string'?num:num.toString();
            // 判断字符串长度是否小于 8
            if (str.length < length) {
                // 计算需要补充的占位符数量
                let count = length - str.length;
                // 使用 for 循环添加占位符
                for (let i = 0; i < count; i++) {
                str += placeholder;
                }
            }

            return str;
        },
        formatTimestamp(timestamp: number): string {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            return formattedDate;
        }

        // 其他情况下可以使用Test.$patch 对store进行修改
    },
    persist: {
  // 修改存储中使用的键名称，默认为当前 Store的 id
        key: `${__piniaKey__}-${Names.Hermes}`,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['limitApplyStatus','limitApplyType'],
    },
})