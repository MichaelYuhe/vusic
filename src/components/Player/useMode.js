import { computed } from 'vue'
import { useStore } from 'vuex'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode() {
    const store = useStore()
    const playMode = computed(() => store.state.playMode)

    const modeIcon = computed(() => {
        const playModeValue = playMode.value
        return playModeValue === PLAY_MODE.sequence 
            ? 'icon-sequence' : playModeValue === PLAY_MODE.random 
                ? 'icon-random' : 'icon-loop'
    })

    function changeMode() {
        const mode = (playMode.value + 1) % 3
        store.dispatch('changeMode', mode)
      }

    return {
        modeIcon,
        changeMode
    }
}