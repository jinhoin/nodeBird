// state 는 함수다
export const state = () => ({
    me: null,
    followerList: [
    ],
    followingList: [
    ],
    hasMoreFollower: true,
    hasMoreFollowing: true
});

const totalFollowers = 10;
const totalFollowings = 10;
const limit = 5;

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
    },
    loadMoreFollwers(state, payLoad) {
        const diff = totalFollowers - state.followerList.length;
        const fakeUser = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random(),
            nickName: (Math.floor(Math.random() * 1000)),
        }));
        state.followerList = state.followerList.concat(fakeUser);
        state.hasMoreFollower = limit === fakeUser.length;
    },
    loadMoreFollwings(state, payLoad) {
        const diff = totalFollowings - state.followingList.length;
        const fakeUser = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random(),
            nickName: Math.floor(Math.random() * 1000),
        }));
        state.followingList = state.followingList.concat(fakeUser);
        state.hasMoreFollower = limit === fakeUser.length;
    }
}



// dispath 를 주로사용 비동기시 사용
export const actions = {
    signUp(context, payLoad) {
        // 명령을통해서 mutations 를 활용해 값을 수정해준다 
        this.$axios.post('/users', {
            emaail: payLoad.email,
            nickName: payLoad.nickName,
            password: payLoad.password,
        });
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
    },
    removeFollowing(context, payLoad) {
        context.commit('removeFollowing', payLoad);

    },
    removeFollower(context, payLoad) {
        context.commit('removeFollowing', payLoad);
    },
    loadFollowers({ commit, state }, payLoad) {
        if (state.hasMoreFollower) {
            commit('loadMoreFollwers', payLoad);
        }
    },
    loadFollowings({ commit, state }, payLoad) {
        if (state.hasMoreFollowing) {
            commit('loadMoreFollwings', payLoad);
        }
    }
}
