

/**
 * 节流
 * @param {*} func 节流函数
 * @param {*} wait 等待时间
 */
export const throttle = (func, wait = 300) => {
    // 上一次执行该函数的时间
    let lastTime = 0

    return (...args) => {
        let now = +new Date()

        // 当前时间和上一次执行函数时间对比，如果差值大于设置的等待时间就执行函数
        if (now - lastTime >= wait) {
            lastTime = now
            func.apply(this, args)
        }
    }
}