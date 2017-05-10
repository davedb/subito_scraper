import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  imports: [ BrowserModule
],
  declarations: [ 
    AppComponent,
    SearchResultComponent
],
  bootstrap: [ AppComponent ]
})
export class AppModule {}