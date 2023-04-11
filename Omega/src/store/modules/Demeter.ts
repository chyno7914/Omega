import {defineStore} from 'pinia'
import { Names, __piniaKey__ } from '../store-information'
export const useDemeterStore = defineStore(Names.Demeter,{
    state:()=> {
        return {
            majors : [
                    '会计学', 
                    '金融学',
                    '经济学', 
                    '法学',
                    '计算机科学与技术', 
                    '软件工程', 
                    '电子信息工程',
                    '通信工程', 
                    '自动化', 
                    '机械工程',
                    '材料工程', 
                    '土木工程', 
                    '建筑学', 
                    '城乡规划',
                    '环境科学与工程', 
                    '食品科学与工程', 
                    '生物医学工程', 
                    '药学',
                    '化学工程与工艺', 
                    '应用化学', 
                    '数学', 
                    '统计学',
                    '物理学', 
                    '光电信息科学与工程', 
                    '天文学', 
                    '地质学',
                    '地理信息科学', 
                    '地球物理学', 
                    '海洋科学', 
                    '心理学',
                    '社会工作'
            ],
            provinces : [
                    "北京市",
                    "天津市",
                    "河北省",
                    "山西省",
                    "内蒙古自治区",
                    "辽宁省",
                    "吉林省",
                    "黑龙江省",
                    "上海市",
                    "江苏省",
                    "浙江省",
                    "安徽省",
                    "福建省",
                    "江西省",
                    "山东省",
                    "河南省",
                    "湖北省",
                    "湖南省",
                    "广东省",
                    "广西壮族自治区",
                    "海南省",
                    "重庆市",
                    "四川省",
                    "贵州省",
                    "云南省",
                    "西藏自治区",
                    "陕西省",
                    "甘肃省",
                    "青海省",
                    "宁夏回族自治区",
                    "新疆维吾尔自治区",
                    "台湾省",
                    "香港特别行政区",
                    "澳门特别行政区",
            ],
            shortcuts : [
                {
                    text: "Today",
                    value: new Date(),
                },
                {
                    text: "Yesterday",
                    value: () => {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    return date;
                    },
                },
                {
                    text: "A week ago",
                    value: () => {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    return date;
                    },
                },
            ], 
            grades: Array.from({ length: 16 }, (_, i) => 2008 + i),
            classes: Array.from({ length: 12 }, (_, i) => i + 1),
            flats: <Array<String>>[],
            pageSize:[10,20,30,40,50]
        }
    },
    // state的值允许直接修改
    //getters用于修饰数据
    getters:{

    },
    persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
        key: `${__piniaKey__}-${Names.Demeter}`,
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['flats'],
    },
})