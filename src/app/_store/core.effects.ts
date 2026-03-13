import {Actions} from '@ngrx/effects';
import {inject, Injectable} from '@angular/core';

@Injectable()
export class CoreEffects {

    private actions$ = inject(Actions);
}
