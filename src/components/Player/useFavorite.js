import { useStore } from "vuex";
import { computed } from 'vue'
import { FAVORITE_KEY } from "../../assets/js/constant";
import { save, remove } from "../../assets/js/array_store";

export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => store.state.favoriteList)
    const maxLen = 100

    function getFavoriteIcon(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    // 歌曲是否在收藏列表里
    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
            return item.id === song.id
        }) > -1
    }

    function toggleFavorite(song) {
        let list
        if(isFavorite(song)) {
            list = remove(FAVORITE_KEY, compare)
        }
        else {
            list = save(FAVORITE_KEY, maxLen, compare, song)
        }
        store.commit('setFavoriteList', list)
        // 传compare函数给save或remove来对特定歌曲执行操作
        function compare(item) {
            return item.id === song.id
        }
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}