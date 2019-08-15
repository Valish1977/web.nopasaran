const app = {
    state: {
        sidebar: false,
    },
    mutations: {
        SET_DATA: (state: any, { type, items }: any) => {
            state[type] = items;
        },
    },
    actions: {
        setSideBar({ commit }: any, newData: string) { // изменяем значение сайдбара
            commit('SET_DATA', { type: 'sidebar', items: newData });
        },
    },
};

export default app;
