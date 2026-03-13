import {Component} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';
import {BehaviorSubject, finalize, map} from 'rxjs';
import {Idea} from '../../_models/api.models';
import {AsyncPipe} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
    selector: 'app-ideas-list-page',
    imports: [
        AsyncPipe,
        ProgressSpinner
    ],
    templateUrl: './ideas-list-page.html',
    styleUrl: './ideas-list-page.css',
})

export class IdeasListPage {

    loading$ = new BehaviorSubject<boolean>(false);
    ideas: Idea[] = [];

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.loading$.next(true);
        this.api.generateIdeas(
            this.flowService.prompt,
            this.flowService.files
        ).pipe(
            map((response) => {
                this.ideas = response;
                console.log('response', response);
            }),
            finalize(() => {
                this.loading$.next(false);
            })
        ).subscribe();
    }

    selectIdea(idea: Idea) {
        console.log('Вибрана ідея', idea);
        this.flowService.selectedIdea = idea;
        this.router.navigate(['/idea-details']);
    }
}
