export function throttle(func, ms) {
    let isThrottle = false;
    let saveThis = null;
    let saveArgs = null;

    return function wrapper(...args) {
        if (isThrottle) {
            saveThis = this
            saveArgs = args
            return;
        }
        func.apply(this, args)
        isThrottle = true
        setTimeout(() => {
            isThrottle = false
            if (saveThis) {
                wrapper.apply(saveThis, saveArgs)
                saveArgs = saveThis = null
            }

        }, ms)
    }
}

export function createCord(x, y) {
    return { x, y };
}