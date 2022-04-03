
// imports //
const messageAudio = '../../../assets/sounds/message.mp3'
//
export const playMessage = () => {
    const audio = new Audio(messageAudio)
    audio.play()
}