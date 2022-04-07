export interface chat {
    id: string,
    content: chatContent[],
    owners: string[],
    type: string,
    updatedAt: string,
    name: string,
    profile_picture: string,
    contactId: string
}

export interface chatContent {
    author: string,
    authorname: string,
    id: string,
    read: boolean,
    value: string,
    date: chatDate,
    time: string,
    chatid: string,
}

interface chatDate {
    day: number,
    month: number,
    year: number,
}