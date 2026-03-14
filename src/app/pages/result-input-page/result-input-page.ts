import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-result-input-page',
    imports: [
        Button
    ],
    templateUrl: './result-input-page.html',
    styleUrl: './result-input-page.css',
})

export class ResultInputPage {

    selectedFile?: File | null;

    constructor(
        private flowService: FlowService,
        private router: Router,
    ) {
    }

    onFileSelected(event: Event) {

        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;
        this.selectedFile = file;
    }

    submit() {
        if (!this.selectedFile) return;

        this.flowService.finalPhotoForReward = this.selectedFile;
        this.router.navigate(['/reward']);
    }
}
