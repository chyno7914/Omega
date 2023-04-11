import { markRaw,shallowReactive } from 'vue'
// 引入全部图标
// import * as Icons from "@element-plus/icons"

// 按需引入图标
import {
    CloseBold,
    Close,
    Plus,
    Star,
    UserFilled,
    Loading,
    Connection,
    Edit,
    FolderOpened,
    Setting,    
    User,
    School,
    Download,
    Search
} from '@element-plus/icons-vue'

const dictIcon = shallowReactive({
    'CloseBold': CloseBold,
    'Close': Close,
    'Plus': Plus,
    'Star': Star,
    'UserFilled': UserFilled,
    'Loading': Loading,
    'Connection': Connection,
    'Edit': Edit,
    'FolderOpened': FolderOpened,
    'Setting': Setting,
    'User': User,
    'School': School,
    'Download': Download,
    'Search':Search
})
const installIcon = (app:any) => {
    // 便于模板获取
    app.config.globalProperties.$icon = dictIcon
    // 使用全部图标
    // app.config.globalProperties.$icon = Icons
}
export default installIcon