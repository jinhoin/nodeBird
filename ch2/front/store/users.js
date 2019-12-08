// state 는 함수다
export const state = () => ({
    me: null,
});

// commit 으로 명령을 실행 / 단순한 동기적
export const mutations = {
    setMe(state, payLoad) {
        state.me = payLoad;
    },
    changeNickName(state, payLoad) {
        debugger
        console.log(['payLoad', payLoad]);
        console.log(['state', state]);
        // state.me.nickName = payLoad.nickName;
    }
}

// dispath 를 주로사용 비동기시 사용
export const actions = {
    signUp(context, payLoad) {
        // 명령을통해서 mutations 를 활용해 값을 수정해준다 
        context.commit('setMe', payLoad);
    },
    logIn({ commit, state }, payLoad) {
        commit('setMe', payLoad);

    },
    logOut({ commit, state }, payLoad) {
        commit('setMe', null);

    },
    changeNickName({ commit }, payLoad) {
        console.log(commit, payLoad);

        // context.commit('changeNickName', payLoad);
    }
};
