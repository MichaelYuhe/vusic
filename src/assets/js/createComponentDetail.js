import { processSongs } from "@/service/song";
import MusicList from "@/components/MusicList/MusicList";
import storage from "good-storage";

export default function createComponentDetail(name, fetch, key) {
    return {
        name,
        components: {
            MusicList,
        },
        props: {
            data: Object,
        },
        data() {
            return {
                songs: [],
                loading: true,
            };
        },
        computed: {
            computedData() {
                let res = null;
                const data = this.data;
                if (data) {
                    res = data;
                }
                else {
                    const cached = storage.session.get(key);
                    // 如果路径正确
                    if (cached && (cached.mid || cached.id + '')=== this.$route.params.id) {
                        res = cached;
                    }
                }
                return res;
            },
            title() {
                const computedData = this.computedData;
                return computedData && (computedData.name || computedData.title);
            },
            pic() {
                const computedData = this.computedData;
                return computedData && computedData.pic;
            },
        },
        async created() {
            const computedData = this.computedData
            if (!computedData) {
                const path = this.$route.matched[0].path;
                this.$router.push(path);
                return;
            }
            const res = await fetch(computedData);
            this.songs = await processSongs(res.songs);
            this.loading = false;
        },
    }

};