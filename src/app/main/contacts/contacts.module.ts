import { NgModule } from "@angular/core";

import { ContactsComponent } from "./contacts.component";
import { ContactslistComponent } from "./contactslist/contactslist.component";
import { ContactsdetailsComponent } from "./contactsdetails/contactsdetails.component";

import { PageCardModule } from "src/app/cards/pagecard/pagecard.module";
import { DetailsCardModule } from "src/app/cards/detailscard/detailscard.module";
import { ActionBarModule } from "src/app/components/action-bar/action-bar.module";
import { ListItemModule } from "src/app/cards/list-item/list-item.module";

import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ContactsComponent,
        ContactslistComponent,
        ContactsdetailsComponent
    ],
    imports: [
        CommonModule,
        PageCardModule,
        DetailsCardModule,
        ActionBarModule,
        ListItemModule
    ],
    exports: [ContactsComponent]
})
export class ContactsModule {}