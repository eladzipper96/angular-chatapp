import { contact } from "src/interfaces/contact.interface";

export const sortContactsByName = (contacts: contact[]) => {
    
    return contacts.sort((a,b) => a.name.charCodeAt(0)-b.name.charCodeAt(0))

}