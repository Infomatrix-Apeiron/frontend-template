import {Routes} from '@angular/router';
import {App} from './app';
import {StartPage} from './pages/start-page/start-page.component';
import {InputPage} from './pages/input-page/input-page';

export const routes: Routes = [
    {
        path: '',
        component: App,
        children: [
            {path: '', redirectTo: 'start', pathMatch: 'full'},
            {path: 'start', component: StartPage},
            {path: 'input', component: InputPage},
        ]
    }
];
