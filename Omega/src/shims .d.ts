
declare module "*.vue" {
    import type { DefineComponent, queuePostFlushCb } from "vue";

    const vueComponent: DefineComponent<{}, {}, any>;
   
    export default vueComponent;
}
 
declare module 'qs'
declare module 'vue-cropper';
export {}
declare module 'vue' {
  interface ComponentCustomProperties {
    $icon: any
  }
}
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
