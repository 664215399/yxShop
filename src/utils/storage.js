// 字面量的方式定义一个变量
const storage = {
    // 设置本地存储
    set: function (key, value, isJson = false) {
        // 先判断key,value是否为空
        if (key.length == 0 || value.length == 0) {
            return false
        }
        // 判断是否需要转换,true为转换,false,不转换
        let data = (isJson == true ? JSON.stringify(value) : value)
        // 设置缓存
        localStorage.setItem(key, data);
    },
    // 获取本地存储
    get: function (key, isJson) {
        // 判断key,value,是否为空
        if (key.length == 0) {
            return false
        }
        let data = localStorage.getItem(key)
        // 判断是否需要转换json字符串,true为转换,false为不转换
        return isJson == true ? JSON.parse(data) : data
    },
    remove: function (key) {
        // 判断key是否为空
        if (key.length == 0) {
            return false
        }
        // 删除
        localStorage.removeItem(key)
    }
    // 删除u本地存储
}
// 抛出对象
export default storage;