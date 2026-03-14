import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {Idea, IdeaInstructionsResponse} from '../_models/api.models';
import {RESPONSE_1, RESPONSE_2, RESPONSE_3} from './responses.mock';

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

        // return this.http.post<Idea[]>(
        //     `${this.baseUrl}/generate-ideas`,
        //     formData
        // );

        return of(RESPONSE_1).pipe(
            delay(3000)
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

        // return this.http.post<IdeaInstructionsResponse>(
        //     `${this.baseUrl}/generate-instructions`,
        //     formData
        // );

        return of(RESPONSE_2).pipe(
            delay(3000)
        );
    }

    generateFeedback(photo: File): Observable<{message: string}> {

        const formData = new FormData();
        formData.append('photo', photo);

        // return this.http.post<{message: string}>(
        //     `${this.baseUrl}/generate-feedback`,
        //     formData
        // );

        return of(RESPONSE_3).pipe(
            delay(3000)
        );
    }
}
