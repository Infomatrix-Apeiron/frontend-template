import {Component, DestroyRef, OnInit} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {BehaviorSubject, finalize, map, take} from 'rxjs';
import {Button} from 'primeng/button';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AsyncPipe} from '@angular/common';
import {IdeaInstructionsResponse} from '../../_models/api.models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

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

export class IdeaDetails implements OnInit {

    idea: IdeaInstructionsResponse | undefined;

    loading$ = new BehaviorSubject<boolean>(false);

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private router: Router,
        private destroyRef: DestroyRef,
    ) {
    }

    ngOnInit() {
        if (!this.flowService.selectedIdea?.title || !this.flowService.selectedIdea?.description || this.flowService.files[0]) {
            this.router.navigate(['/input']);
            return;
        }

        this.loading$.next(true);
        this.api.generateInstructions(
            this.flowService.selectedIdea?.title || '',
            this.flowService.selectedIdea?.description || '',
            this.flowService.files[0]
        ).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
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
        this.router.navigate(['/result-input']);
    }
}
