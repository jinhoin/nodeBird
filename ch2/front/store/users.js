// state 는 함수다
export const state = () => ({
    me: null,
    followerList: [
        { id: 1, nickName: "제로초" }, { id: 2, nickName: "캐롤" }, { id: 3, nickName: "호인" }
    ],
    followingList: [
        { id: 1, nickName: "제로초" }, { id: 2, nickName: "캐롤" }, { id: 3, nickName: "호인" }
    ]
});

// commit 으로 명령을 실행 / 단순한 동기적
export const mutations = {
    setMe(state, payLoad) {
        state.me = payLoad;
    },
    changeNickName(state, payLoad) {
        state.me.nickName = payLoad.nickName;
    },
    removeFollowing(state, payLoad) {
        const index = state.followingList.findIndex(v => v.id === payLoad.id);
        console.log(index, payLoad.id);
        state.followingList.splice(index, 1);
    },
    removeFollower(state, payLoad) {
        const index = state.followerList.findIndex(v => v.id === payLoad.id);
        console.log(index, payLoad.id);
        state.followerList.splice(index, 1);

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
    changeNickName(context, payLoad) {
        context.commit('changeNickName', payLoad);
    }, removeFollowing(context, payLoad) {
        context.commit('removeFollowing', payLoad);

    }, removeFollower(context, payLoad) {
        context.commit('removeFollowing', payLoad);
    }
}
