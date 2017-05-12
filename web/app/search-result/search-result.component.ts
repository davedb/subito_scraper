import { Component } from '@angular/core';
import { ResultService } from "../services/result.service";

@Component({
    selector: 'search-result',
    templateUrl: '/app/search-result/search-result.component.html',
    providers: [ResultService]
})
export class SearchResultComponent {
    private keyword: string = '';

    constructor(private _resultService: ResultService) {
    }

    results: any[];

    searchClick(): void{
         this._resultService.getResults(this.keyword)
            .subscribe(x => 
            {
                alert('done');
                this.results = x;
            });
    }
}
