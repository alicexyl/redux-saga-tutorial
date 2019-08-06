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
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
    try {
        yield api.deleteUser(userId);
        yield getUsers();
    } catch (e) {
    }
}

function* watchDeleteUserRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_USER_REQUEST);

        yield deleteUser({ userId: action.payload.userId });
    }
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default usersSagas;