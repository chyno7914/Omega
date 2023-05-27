import { hasClass } from "element-plus/es/utils";
import type { Directive } from "vue"
import {useZeusStore } from "@/store"
const limitElSearch: Directive<HTMLElement, string> = (el, binding) => {
    const Zeus = useZeusStore()
    if (Zeus.permission.includes(Zeus.uid + ":" + binding.value)) {
        const bankBorder = el.firstElementChild as null|HTMLElement
        const selectInput = el.querySelector('input') ;
        const selectIcon = el.querySelector('i');
        if(bankBorder)if(bankBorder.style)bankBorder.style.background = "#f4f4f5"
        if(selectInput)selectInput.setAttribute('disabled', '');
        if(selectIcon)selectIcon.style.display = "none"
        const mouseEvents = [ 'click', 'mouseenter'];
        mouseEvents.forEach(eventType => {
            el.addEventListener(eventType, (event) => {
            event.preventDefault();
            event.stopPropagation();
            }, true);
        });
    }
};
export default limitElSearch