import type { Directive,DirectiveBinding } from "vue"
const triangle: Directive<HTMLElement, string|null> = (el, binding) => {
    const color = binding.value;
    el.style.position = 'relative';
    const triangle = document.createElement('div');
    triangle.style.width = '0px';
    triangle.style.height = '0px';
    triangle.style.borderTop = `25px solid pink`;
    triangle.style.borderRight = '25px solid transparent';
    triangle.style.position = 'absolute';
    triangle.style.top = '0';
    triangle.style.left = '0';
    el.appendChild(triangle);
}
export default triangle