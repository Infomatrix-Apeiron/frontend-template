import { createAction, props } from '@ngrx/store';

const loadUser = createAction(
    '[Core User] Load User'
);

const loadUserSuccess = createAction(
    '[Core User] Load User Success',
    props<{ user: any }>()
);

const loadUserFailure = createAction(
    '[Core User] Load User Failure',
    props<{ error: any }>()
);

export const CoreActions = {
    loadUser,
    loadUserSuccess,
    loadUserFailure,
};
