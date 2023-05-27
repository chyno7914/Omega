import {useZeusStore } from "@/store"
import type { Directive,DirectiveBinding } from "vue"
const hasShow: Directive<HTMLElement, string> = (el, binding) => {
    const Zeus = useZeusStore()
    if (!Zeus.permission.includes(Zeus.uid + ":" + binding.value)) {
        el.style.display = "none"
    }
    
}
export default hasShow