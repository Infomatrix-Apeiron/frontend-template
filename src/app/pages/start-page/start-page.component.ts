import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
    selector: 'app-start-page',
    imports: [
        Button
    ],
    templateUrl: './start-page.component.html',
    styleUrl: './start-page.component.css',
})
export class StartPage {

    constructor(
        private router: Router,
    ) {
    }

    start() {
        this.router.navigate(['/input']);
    }

    startFlow2() {
        this.router.navigate(['/flow2-input']);
    }
}
