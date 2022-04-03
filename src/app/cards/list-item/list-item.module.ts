import { NgModule } from "@angular/core";

import { ListItemComponent } from "./list-item.component";

import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ListItemComponent],
    imports: [CommonModule],
    exports: [ListItemComponent]
})
export class ListItemModule {}