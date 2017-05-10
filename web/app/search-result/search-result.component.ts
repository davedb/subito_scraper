import { Component } from '@angular/core';

@Component({
    selector : 'search-result',
    template: `
    <div>
        <a href="{{link}}">{{title}}</a>
    </div>
    `
})
export class SearchResultComponent{
    link : "http://google.com"
    title : "title test"
}
