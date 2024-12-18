import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalculatorComponent } from "./calculator/calculator.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatSlideToggleModule,
    CalculatorComponent
],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
