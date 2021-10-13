import storage from 'good-storage'

// 从list中删除
function deleteFromArray(array, compare) {
    const index = array.findIndex(compare)
    if (index > -1) {
        array.splice(index, 1)
    }
}

// 向list中添加
function insertToArray(array, maxLen, compare, value) {
    const index = array.findIndex(compare)
    // 如果已经在列表头部
    if (index === 0) {
        return
    }
    // 如果已经存在于列表中，需要先删除
    if (index > 0) {
        array.splice(index, 1)
    }
    // 放到头部
    array.unshift(value)
    // 超出数量限制，删除最后一个元素
    if (maxLen && array.length > maxLen) {
        array.pop()
    }
}

export function remove(key, compare) {
    const list = storage.get(key, [])
    deleteFromArray(list, compare)
    storage.set(key, list)
    return list
}

export function save(key, maxLen, compare, value) {
    const list = storage.get(key, [])
    insertToArray(list, maxLen, compare, value)
    storage.set(key, list)
    return list
}

// 每次进入程序时加载存储在本地的数据
export function load(key) {
    return storage.get(key, [])
}

export function clear(key) {
    storage.remove(key)
    return []
}

export function saveAll(items, key) {
    storage.set(key, items)
}
