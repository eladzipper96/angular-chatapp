
// imports //
const messageAudio = '../../../assets/sounds/message.mp3'
const notificationAudio = '../../../assets/sounds/notification.mp3'
//
export const playMessage = () => {
    const audio = new Audio(messageAudio)
    audio.play()
}

export const playNotification = () => {
    const audio = new Audio(notificationAudio)
    audio.play()
}