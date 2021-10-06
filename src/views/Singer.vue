<template>
    <div class="singer" v-loading="!singers.length">
        <IndexList :data="singers"></IndexList>
    </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/Base/IndexList/IndexList'

export default {
    name: 'Singer',
    data() {
        return {
            singers: []
        }
    },
    components: {
        IndexList
    },
    async created() {
        const res = await getSingerList()
        this.singers = res.singers
        // console.log(res)
    }

}
</script>

<style lang="scss" scoped>
.singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
</style>
