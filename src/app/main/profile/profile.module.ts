import { NgModule } from "@angular/core";

import { ProfileComponent } from "./profile.component";
import { ProfileupdateComponent } from "./profileupdate/profileupdate.component";
import { ProfiledetailsComponent } from "./profiledetails/profiledetails.component";
// import { DetailscardComponent } from "src/app/cards/detailscard/detailscard.component";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'

import { PageCardModule } from "src/app/cards/pagecard/pagecard.module";
import { DetailsCardModule } from "src/app/cards/detailscard/detailscard.module";

@NgModule({

    declarations: [
        ProfileComponent,
        ProfileupdateComponent,
        ProfiledetailsComponent,
        // DetailscardComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        PageCardModule,
        DetailsCardModule
    ],
    exports: [ProfileComponent,PageCardModule,DetailsCardModule]

})
export class ProfileModule {}