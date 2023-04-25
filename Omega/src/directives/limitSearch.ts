import { hasClass } from "element-plus/es/utils";
import type { Directive } from "vue"
import {useZeusStore } from "@/store"
const limitSearch: Directive<HTMLElement, string> = (el, binding) => {
    const Zeus = useZeusStore()
    if (Zeus.permission.includes(Zeus.uid + ":" + binding.value)) {
        const bankBorder =   el.firstElementChild as HTMLElement
        const selectInput = el.querySelector('input') as HTMLInputElement;
        const selectIcon = el.querySelector('i') as HTMLElement;
        bankBorder.style.background = "#f4f4f5"
        selectInput.setAttribute('disabled', '');
        selectIcon.style.display = "none"
        const mouseEvents = [ 'click', 'mouseenter'];
        mouseEvents.forEach(eventType => {
            el.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();
            }, true);
        });
    }
};
export default limitSearch