import { get } from "./base";

export function getHotKeys() {
    return get('/api/getHotKeys')
}

export function search(query, page, showSinegr) {
    return get('/api/search', {
        query,
        page,
        showSinegr
    })
}