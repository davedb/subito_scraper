import { Component } from '@angular/core';
import { ResultService } from "../services/result.service";

@Component({
    selector: 'search-result',
    templateUrl: '/app/search-result/search-result.component.html',
    providers: [ResultService]
})
export class SearchResultComponent {
    constructor(private _resultService: ResultService) {
    }
    results = {};

    ngOnInit(): void {
        this._resultService.getResults()
            .subscribe(x => this.results = x);
    }
}
