import { createApp } from 'vue'
import Loading from './Loading'
import { appendClass, removeClass } from '@/assets/js/dom'

const relativePosition = 'g-relative'

const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading)
        const instance = app.mount(document.createElement('div'))
        el.instance = instance

        if (binding.value) {
            appendLoading(el)
        }
    },

    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            binding.value ? appendLoading(el) : removeLoading(el)
        }
    },
}

function appendLoading(el) {
    const style = getComputedStyle(el)
    // debugger
    if (['relative', 'absolute', 'fixed'].indexOf(style.position) === -1) {
        appendClass(el, relativePosition)
    }
    el.appendChild(el.instance.$el)
}

function removeLoading(el) {
    removeClass(el, relativePosition)
    el.removeChild(el.instance.$el)
}

export default loadingDirective