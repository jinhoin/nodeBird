export const state = () => ({
    mainPosts: [],
});

export const mutations = {
    addMainPost(state, payLoad) {
        state.mainPosts.unshift(payLoad);
    },
    reMainPost(state, payLoad) {
        const index = state.mainPosts.findIndex(v => v.id === payLoad.id);
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payLoad) {
        const index = state.mainPosts.findIndex(v => v.id === payLoad.postId);
        state.mainPosts[index].Comments.unshift(payLoad);
    }
};

// 비동기작업
export const actions = {
    add({ commit }, payLoad) {
        console.log(payLoad, 'payLoad');
        // 같은모듈안에서는 posts는 안붙여도된다 다른데 붙일경우 붙여줭한다
        // actions 를 만드는건 서버에 게시물 등록 요청 보낸후 commit 처리
        commit('addMainPost', payLoad);
    },
    remove({ commit }, payLoad) {
        commit('reMainPost', payLoad);
    },
    addComment({ commit }, payLoad) {
        commit('addComment', payLoad);
    },
}