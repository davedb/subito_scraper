import { Component } from '@angular/core';

@Component({
    selector: 'search-result',
    templateUrl: '/app/search-result/search-result.component.html'
})
export class SearchResultComponent {
    results = [
        {
            title: "test",
            link: "http://google.com"
        },
        {
            title: "test2",
            link: "http://google.co.uk"
        }
    ]
}
