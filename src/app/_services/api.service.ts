
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../environments/environment';

export interface Idea {
    title: string;
    description: string;
}

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
}

/*
[
    {
        "title": "Міні-гаманець для дрібниць",
        "description": "Використання міцної та вологостійкої обгортки для створення компактного футляра для монет або навушників. Такий виріб допоможе організувати простір у сумці та захистить вміст від вологи завдяки щільному матеріалу упаковки."
    },
    {
        "title": "Декоративна закладка для книг",
        "description": "Яскравий дизайн упаковки з тропічними мотивами ідеально підходить для виготовлення міцної та гнучкої закладки. Вона буде легко помітною серед сторінок завдяки своєму глянцевому покриттю та насиченим блакитним кольорам."
    },
    {
        "title": "Світловідбивний елемент для аплікацій",
        "description": "Завдяки внутрішньому сріблястому шару обгортки можна вирізати деталі для декорування блокнотів або створення творчих колажів. Це додасть виробам ефекту металевого блиску та цікавої текстури, перетворюючи відходи на художній матеріал."
    }
]
 */
