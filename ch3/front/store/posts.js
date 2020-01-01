export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
});
// 가정한다
const totalPosts = 51;
const limit = 10;

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
    },
    loadPosts(state, payLoad) {
        const diff = totalPosts - state.mainPosts.length;
        // 내가 생각한거
        // if (diff < 1) { state.hasMorePost = false; return false }
        //  diff 에 따라서 불러오는 갯수
        const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            User: {
                id: 1,
                nickName: '호인',
            },
            content: `Hello infinite scrolling ~ ${Math.random().toString()}`,
            Comments: [],
            Images: [],
        }));
        // 배열합치기
        state.mainPosts = state.mainPosts.concat(fakePosts);
        //  length limit 수가 달라져서 false 가된다
        state.hasMorePost = fakePosts.length === limit;
    },
    concatImagesPath(state, payLoad){
        state.imagePaths = state.imagePaths.concat(payLoad);
    },
    removeImagePath(state, payLoad){
        state.imagePaths.splice(payLoad, 1);
    }
};

// 비동기작업
export const actions = {
    add({ commit,state }, payLoad) {
        // 같은모듈안에서는 posts는 안붙여도된다 다른데 붙일경우 붙여줭한다
        // actions 를 만드는건 서버에 게시물 등록 요청 보낸후 commit 처리
        this.$axios.post('http://localhost:3085/post', {
           content: payLoad.content, imagePaths: state.imagePaths,
        }, {withCredentials: true}).then((res)=>{
           commit('addMainPost', res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },
    remove({ commit }, payLoad) {
        commit('reMainPost', payLoad);
    },
    addComment({ commit }, payLoad) {
        commit('addComment', payLoad);
    },
    loadPosts({ commit, state }, payLoad) {
        if (state.hasMorePost) {
            commit('loadPosts', payLoad);
        }
    },
    uploadImages({commit}, payLoad){
        this.$axios.post('http://localhost:3085/post/images',payLoad, {withCredentials: true
        }).then((res)=> {
            commit('concatImagesPath', res.data);
        }).catch((e)=>{
            alert(e);
        });

    },
    removeImagePath({commit}, payLoad){
        commit('removeImagePath', payLoad);
    },
}