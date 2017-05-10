import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpModule } from '@angular/http'
@NgModule({
  imports: [ BrowserModule,
  HttpModule
],
  declarations: [ 
    AppComponent,
    SearchResultComponent
],
  bootstrap: [ AppComponent ]
})
export class AppModule {}