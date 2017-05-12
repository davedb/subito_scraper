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
    loading: boolean = false;
    results: any[];

    searchClick(): void{
        this.loading = true;
         this._resultService.getResults(this.keyword)
            .subscribe(x => 
            {
                this.loading = false;
                this.results = x;
            });
    }
}
