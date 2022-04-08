import { chat } from "src/interfaces/chat.interface"

export const sortByUpdateAt = (chats: chat[]): chat[] => {

    const sorted = chats.sort((a,b) => {
        const a_date = new Date(a.updatedAt).getTime()
        const b_date = new Date(b.updatedAt).getTime()
        return b_date - a_date})

    console.log(sorted)
    
    return sorted
}