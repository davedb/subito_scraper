import { Component } from '@angular/core';

@Component({
   selector : 'app',
   templateUrl : '/app/app.component.html',
   styles: [`
    .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
  `]
})
export class AppComponent {
  message : string = 'test message'
}