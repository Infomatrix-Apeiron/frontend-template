import {createReducer, on} from '@ngrx/store';
import {CoreActions} from './core.actions';

export interface CoreState {
    currentUser: any;
}

export const initialState: CoreState = {
    currentUser: null,
};

export const coreReducer = createReducer(
    initialState,

    on(CoreActions.loadUserSuccess, (state, { user }) => ({
        ...state,
        currentUser: user,
    })),
);
