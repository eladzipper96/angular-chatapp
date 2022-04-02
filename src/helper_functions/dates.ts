export const dateMinuteHandler = (minute: number) => {
    if(minute < 10) {
        return `0${minute}`
    }
    return minute
}   