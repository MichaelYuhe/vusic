import BScroll from '@better-scroll/core'
import ObserveDom from '@better-scroll/observe-dom'

import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from 'vue'

BScroll.use(ObserveDom)

export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null)

    onMounted(() => {
        const scrollValue = scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })
        // 如果要求派发scroll事件
        if (options.probeType > 0) {
            scrollValue.on('scroll', (pos) => {
                emit('scroll', pos)
            })
        }
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })

    onActivated(() => {
        scroll.value.enable()
        scroll.value.refresh()
    })

    onDeactivated(() => {
        scroll.value.disable()
    })

    return scroll

}
