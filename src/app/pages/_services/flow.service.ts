import { Injectable } from '@angular/core';
import {Idea} from '../../_models/api.models';

@Injectable({
    providedIn: 'root'
})

export class FlowService {

    prompt: string = '';

    files: File[] = [];

    selectedIdea?: Idea;

    finalPhotoForReward?: File | null;

}
