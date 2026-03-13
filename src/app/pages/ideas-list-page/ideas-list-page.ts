import {Component} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FlowService} from '../_services/flow.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Idea} from '../../_models/api.models';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-ideas-list-page',
    imports: [
        AsyncPipe
    ],
    templateUrl: './ideas-list-page.html',
    styleUrl: './ideas-list-page.css',
})

export class IdeasListPage {

    loading$ = new BehaviorSubject<boolean>(false);
    ideas: Idea[] = [];

    constructor(
        private api: ApiService,
        private flowService: FlowService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.ideas = [
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
        ];

        // this.loading$.next(true);
        // this.api.generateIdeas(
        //     this.flowService.prompt,
        //     this.flowService.files
        // ).pipe(
        //     map((response) => {
        //         this.ideas = response;
        //         console.log('response', response);
        //     }),
        //     finalize(() => {
        //         this.loading$.next(false);
        //     })
        // ).subscribe();
    }

    selectIdea(idea: Idea) {
        console.log('Вибрана ідея', idea);
        this.flowService.selectedIdea = idea;
        this.router.navigate(['/idea-details']);
    }
}
