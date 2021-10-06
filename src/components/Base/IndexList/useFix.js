import { ref, nextTick, watch, computed } from 'vue'

export default function useFix(props) {
    const TITLE_HEIGHT = 30 // 标题栏的高度是30px
    const groupRef = ref(null) 
    const listHeights = ref([])
    const scrollY = ref(0)
    const currentIndex = ref(0)
    const distance = ref(0)

    const fixedTitle = computed(() => {
        if (scrollY.value < 0) {
            return ''
        }
        const currentGruop = props.data[currentIndex.value] // 获取当前所在组
        return currentGruop ? currentGruop.title : '' // 返回组名作为fixedTitle
    })

    const fixedStyle = computed(() => {
        const distanceValue = distance.value
        const diff = (distanceValue > 0 && distanceValue < TITLE_HEIGHT) ? distanceValue - TITLE_HEIGHT : 0
        return {
            transform: `translate3d(0, ${diff}px, 0)`
        }
    })

    // 监视数据，若数据改变，即拖动了页面，重新计算高度
    watch(() => props.data, async () => {
        await nextTick()
        calculateHeight()
    })

    watch(scrollY, (newY) => {
        const listHeightsValue = listHeights.value
        for (let i = 0; i < listHeightsValue.length - 1; i++) {
            const heightTop = listHeightsValue[i]
            const heightBottom = listHeightsValue[i + 1]
            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i // 获取当前组的索引值
                distance.value = heightBottom - newY // 获取下一组到顶的距离
            }
        }

    })

    function calculateHeight() {
        const list = groupRef.value.children // 获取单独的一个group
        const listHeightsValue = listHeights.value // 缓存

        let height = 0 // 初始高度

        listHeightsValue.length = 0
        listHeightsValue.push(height) 

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight // 高度累加
            listHeightsValue.push(height) // 记录每一层开始的高度
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y // 转换高度为正值并保存
    }

    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle
    }
}