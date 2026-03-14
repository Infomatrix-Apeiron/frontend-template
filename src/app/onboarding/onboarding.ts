import {Component} from '@angular/core';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';

@Component({
    selector: 'app-onboarding',
    imports: [
        Button,
        FormsModule,
        InputText
    ],
    templateUrl: './onboarding.html',
    styleUrl: './onboarding.css',
})
export class Onboarding {
    step: 'NAME' | 'AGE' = 'NAME';

    userName = '';
    userAge: number | null = null;

    ages = Array.from({length: 15}, (_, i) => ({
        label: `${i + 3}`,
        value: i + 3
    }));

    constructor(private router: Router) {
    }

    ngOnInit() {

        // const name = localStorage.getItem('userName');
        // const age = localStorage.getItem('userAge');
        //
        // if (name && age) {
        //     this.router.navigate(['/start']);
        // }
    }

    nextFromName() {

        if (!this.userName?.trim()) return;

        localStorage.setItem('userName', this.userName);

        this.step = 'AGE';
    }

    finish() {

        if (!this.userAge) return;

        localStorage.setItem('userAge', String(this.userAge));

        this.router.navigate(['/start']);
    }
}
