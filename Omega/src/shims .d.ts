declare module "*.vue" {
    import type { DefineComponent, queuePostFlushCb } from "vue";
   
    const vueComponent: DefineComponent<{}, {}, any>;
   
    export default vueComponent;
}
 
declare module 'qs'