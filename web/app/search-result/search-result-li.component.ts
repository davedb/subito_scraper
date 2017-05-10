import {Component} from '@angular/core';

@Component({
    selector : 'search-result-li',
    templateUrl : '/app/search-result/search-result-li.component.html'
})
export class SearchResultLiComponent{
    link :string = "http://google.com"
    title : string = "title test"
}