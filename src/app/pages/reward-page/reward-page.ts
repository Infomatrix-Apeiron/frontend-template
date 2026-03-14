import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, finalize} from 'rxjs';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-reward-page',
    imports: [
        ProgressSpinner,
        AsyncPipe,
        NgOptimizedImage
    ],
    templateUrl: './reward-page.html',
    styleUrl: './reward-page.css',
})

export class RewardPage implements OnInit {
    loading$ = new BehaviorSubject<boolean>(false);

    message: string | null = null;
    coins: number = 200;

    constructor(
        private api: ApiService,
        private flowService: FlowService,
    ) {}

    ngOnInit(): void {
        this.loading$.next(true);
        this.api.generateFeedback(this.flowService.finalPhotoForReward!)
            .pipe(
                finalize(() => this.loading$.next(false))
            )
            .subscribe(res => {
                this.message = res.message;
            });
    }
}
