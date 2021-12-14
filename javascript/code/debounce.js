
/**
 * 防抖
 * @param {*} func 用户传入需要防抖的函数
 * @param {*} wait 等待时间
 * @returns 
 */
export const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0

    return (...args) => {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}