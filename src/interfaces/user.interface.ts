import { chat } from "./chat.interface"
import { notifications } from "./notifications.interface"
import { contact } from "./contact.interface"

export interface user {
    activechats: string[]
    chats: chat[]
    contacts: contact[]
    blocked: string[]
    notifications: notifications[]

    _id: string
    updatedAt: string
    email: string
    birthday: string
    name: string
    last_name: string
    phone: string
    profile_picture: string
    website: string
    moto: string
    address: string
    facebook: string
    instagram: string
    linkedin: string
    twitter: string
}