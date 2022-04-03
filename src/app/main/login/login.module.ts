import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from "./login.component";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";

@NgModule({
 declarations: [
 LoginComponent,
 SpinnerComponent
 ],
 imports: [
 ReactiveFormsModule,
 CommonModule,
 HttpClientModule,
],
 exports: [
 LoginComponent,
 ]
})
export class LoginModule {}
