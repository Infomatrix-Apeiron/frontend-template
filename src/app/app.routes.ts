import {Routes} from '@angular/router';
import {App} from './app';
import {StartPage} from './pages/start-page/start-page.component';
import {InputPage} from './pages/input-page/input-page';
import {IdeasListPage} from './pages/ideas-list-page/ideas-list-page';
import {IdeaDetails} from './pages/idea-details/idea-details';

export const routes: Routes = [
    {
        path: '',
        component: App,
        children: [
            {path: '', redirectTo: 'start', pathMatch: 'full'},
            {path: 'start', component: StartPage},
            {path: 'input', component: InputPage},
            {path: 'ideas-list', component: IdeasListPage},
            {path: 'idea-details', component: IdeaDetails},
        ]
    }
];
