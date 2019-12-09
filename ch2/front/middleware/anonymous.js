export default function ({ store, redirect }) {
    if (store.state.users.me) {
        alert('오지마');
        redirect('/');
    } else {

    }
}