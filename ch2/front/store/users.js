// state 는 함수다
export const state = () => ({
    me: null,
});

// commit 으로 명령을 실행 / 단순한 동기적
export const mutations = {
    setMe(state, playload) {
        console.log('setME init', playload)
        state.me = playload;
    }
}

// dispath 를 주로사용 비동기시 사용
export const actions = {
    signUp(context, playload) {
        console.log(context);
        // 명령을통해서 mutations 를 활용해 값을 수정해준다 
        context.commit('setMe', playload);
    },
    logIn({ commit, state }, playload) {
        commit('setMe', playload);

    },
    logOut({ commit, state }, playload) {
        commit('setMe', null);

    }
};
