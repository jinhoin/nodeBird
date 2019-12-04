export const state = () => ({
    name: 'hello',
});

export const mutations = {
    BYE(state) {
        state.name = 'goodyBye'
    }
}; 