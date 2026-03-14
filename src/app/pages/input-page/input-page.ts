import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';

interface GenerateIdeasRequest {
    prompt: string;
    files: File[];
}

@Component({
    selector: 'app-input-page',
    imports: [
        Button
    ],
    templateUrl: './input-page.html',
    styleUrl: './input-page.css',
})

export class InputPage {
    selectedRequest?: GenerateIdeasRequest;

    constructor(
        private flowService: FlowService,
        private router: Router,
    ) {
    }

    onFileSelected(event: Event) {

        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) return;

        console.log('file', file);

        this.selectedRequest = {
            prompt: '',
            files: [file]
        };

        this.flowService.prompt = this.selectedRequest.prompt;
        this.flowService.files = this.selectedRequest.files;
        this.router.navigate(['/ideas-list']);
    }
}
