import { chat } from "./chat.interface"
import { notifications } from "./notifications.interface"
import { contact } from "./contact.interface"

import { Observable } from "rxjs";

export interface user {
    activechats: string[]
    chats: chat[]
    contacts: contact[]
    blocked: string[]
    notifications: notifications[]

    _id: string
    username: string
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

export interface userPersonalData {
    email: Observable<string>
    birthdate: Observable<string>
    name: Observable<string>
    last_name: Observable<string>
    phone: Observable<string>
    profile_picture: Observable<string>
    website: Observable<string>
    moto: Observable<string>
    address: Observable<string>
    facebook: Observable<string>
    instagram: Observable<string>
    linkedin: Observable<string>
    twitter: Observable<string>
}