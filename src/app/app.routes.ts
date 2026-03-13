import {Routes} from '@angular/router';
import {App} from './app';
import {StartPage} from './pages/start/start-page.component';

export const routes: Routes = [
    {
        path: '',
        component: App,
        children: [
            {path: '', redirectTo: 'start', pathMatch: 'full'},
            {path: 'start', component: StartPage},
        ]
    }
];
