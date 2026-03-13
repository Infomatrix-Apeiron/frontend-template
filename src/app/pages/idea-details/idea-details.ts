import {Component} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';
import {BehaviorSubject, finalize, map} from 'rxjs';
import {Button} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AsyncPipe} from '@angular/common';
import {IdeaInstructionsResponse} from '../../_models/api.models';

@Component({
    selector: 'app-idea-details',
    imports: [
        Button,
        ProgressSpinner,
        AsyncPipe
    ],
    templateUrl: './idea-details.html',
    styleUrl: './idea-details.css',
})

export class IdeaDetails {

    idea: IdeaInstructionsResponse | undefined;

    loading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.loading$.next(true);
        this.api.generateInstructions(
            this.flowService.selectedIdea?.title || '',
            this.flowService.selectedIdea?.description || '',
            this.flowService.files[0]
        ).pipe(
            map((response) => {
                this.idea = response;
                console.log('response', response);
            }),
            finalize(() => {
                this.loading$.next(false);
            })
        ).subscribe();
    }

    showResult() {

    }
}
