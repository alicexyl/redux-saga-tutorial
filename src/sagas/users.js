import { takeEvery, takeLatest, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
    try {
        const result = yield api.getUsers();

        yield put(actions.getUsersSuccess({
            items: result.data.data
        }));
    } catch(e) {

    }
}
function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* createUser({ payload: { firstName, lastName } }) {
    try {
        yield api.createUser({ firstName, lastName});
        yield getUsers();
    } catch (e) {
        
    }
    yield;
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest)
];

export default usersSagas;