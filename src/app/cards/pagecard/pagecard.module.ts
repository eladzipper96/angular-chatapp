import { NgModule } from "@angular/core";

import { PagecardComponent } from "./pagecard.component";
import { CommonModule } from "@angular/common";

 @NgModule({
    declarations: [PagecardComponent],
    imports: [CommonModule],
    exports: [PagecardComponent]
 })
 export class PageCardModule {}