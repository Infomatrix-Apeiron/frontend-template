import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {ApiService} from '../../_services/api.service';

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
        private api: ApiService,
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
    }

    submit() {

        if (!this.selectedRequest) return;

        this.api.generateIdeas(
            this.selectedRequest.prompt,
            this.selectedRequest.files
        ).subscribe();
    }
}
