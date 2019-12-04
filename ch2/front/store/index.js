export const syate = () => ({
    hello: 'vuex',
});

export const mutations = () => ({
    bye(stay) {
        stay.hello = 'goodyBye'
    }
});