import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
    const ANCHOR_HEIGHT = 18
    const scrollRef = ref(null)

    const touch = {}

    const shortcutList = computed(() => {
        return props.data.map((group) => {
            return group.title
        })
    })

    function onShortcutTouchStart(e) {
        // 锚点，通过动态绑定了的index值确认
        const anchorIndex = parseInt(e.target.dataset.index)

        touch.y1 = e.touches[0].pageY
        touch.anchorIndex = anchorIndex
        scrollTo(anchorIndex)
    }

    function onShortcutTouchMove(e) {
        touch.y2 = e.touches[0].pageY

        const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
        const anchorIndex = touch.anchorIndex + delta
        scrollTo(anchorIndex)
    }

    function scrollTo(anchorIndex) {
        if(isNaN(anchorIndex)) {
            return
        }
        anchorIndex = Math.max(0, Math.min(shortcutList.value.length - 1, anchorIndex))
        // 获取目标元素
        const targetElement = groupRef.value.children[anchorIndex]
        // 拿到scroll对象
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetElement, 0)
    }

    return {
        scrollRef,
        shortcutList,
        onShortcutTouchStart,
        onShortcutTouchMove
    }
}