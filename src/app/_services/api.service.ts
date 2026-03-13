import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Idea, IdeaInstructionsResponse} from '../_models/api.models';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    private readonly baseUrl = `${environment.apiUrl}/ai`;

    constructor(private http: HttpClient) {}

    generateIdeas(prompt: string, files: File[]): Observable<Idea[]> {

        const formData = new FormData();

        formData.append('prompt', prompt);

        for (const file of files) {
            formData.append('files', file);
        }

        return this.http.post<Idea[]>(
            `${this.baseUrl}/generate-ideas`,
            formData
        );
    }

    generateInstructions(
        title: string,
        description: string,
        photo?: File
    ): Observable<IdeaInstructionsResponse> {

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);

        if (photo) {
            formData.append('photo', photo);
        }

        return this.http.post<IdeaInstructionsResponse>(
            `${this.baseUrl}/generate-instructions`,
            formData
        );
    }
}
