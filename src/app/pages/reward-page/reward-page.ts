import {Component, DestroyRef, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, take} from 'rxjs';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
    selector: 'app-reward-page',
    imports: [
        ProgressSpinner,
        AsyncPipe,
        NgOptimizedImage,
        Button
    ],
    templateUrl: './reward-page.html',
    styleUrl: './reward-page.css',
})

export class RewardPage implements OnInit {
    loading$ = new BehaviorSubject<boolean>(false);

    message: string | null = null;
    coins: number = 200;
    additionalCoins: number = 200;

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private destroyRef: DestroyRef,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (!this.flowService.finalPhotoForReward) {
            this.router.navigate(['/result-input']);
            return;
        }

        this.loading$.next(true);
        this.api.generateFeedback(this.flowService.finalPhotoForReward!)
            .pipe(
                take(1),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading$.next(false))
            )
            .subscribe(res => {
                this.message = res.message;
            });
    }
}
