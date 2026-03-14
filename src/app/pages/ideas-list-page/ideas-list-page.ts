import {Component, DestroyRef, OnInit} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';
import {BehaviorSubject, finalize, map, take} from 'rxjs';
import {Idea} from '../../_models/api.models';
import {AsyncPipe} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Button} from 'primeng/button';

@Component({
    selector: 'app-ideas-list-page',
    imports: [
        AsyncPipe,
        ProgressSpinner,
        Button
    ],
    templateUrl: './ideas-list-page.html',
    styleUrl: './ideas-list-page.css',
})

export class IdeasListPage implements OnInit {

    loading$ = new BehaviorSubject<boolean>(false);
    ideas: Idea[] = [];

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {
    }

    ngOnInit() {
        if (!this.flowService.files.length) {
            this.router.navigate(['/input']);
            return;
        }

        this.loading$.next(true);
        this.api.generateIdeas(
            this.flowService.prompt,
            this.flowService.files
        ).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
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
