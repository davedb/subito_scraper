import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HttpModule, JsonpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule
],
  declarations: [ 
    AppComponent,
    SearchResultComponent
],
  bootstrap: [ AppComponent ]
})
export class AppModule {}