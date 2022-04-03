import { NgModule } from "@angular/core";

import { ActionBarComponent } from "./action-bar.component";

import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[ActionBarComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ActionBarComponent]
})
export class ActionBarModule {}