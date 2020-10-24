import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TestManagementComponent} from './tests_magement/testManagement.component';
import {HttpClientModule} from '@angular/common/http';
import 'reflect-metadata';

@NgModule({
  declarations: [
    AppComponent,
    TestManagementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
