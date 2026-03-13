import { Injectable } from '@angular/core';
import {Idea} from '../../_models/api.models';

@Injectable({
    providedIn: 'root'
})

export class FlowService {

    prompt: string = '';

    files: File[] = [];

    loadingText: string = '';

    ideas: Idea[] = [];

    selectedIdea?: Idea;

    resultPhoto?: File;

}
