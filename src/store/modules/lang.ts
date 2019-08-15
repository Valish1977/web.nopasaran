const lang = {
    state: {
        language: '',
    },
    mutations: {
        SET_LANGUAGE: (state: any, { item }: any) => {
            state.language = item;
        },
    },
    actions: {
        setLanguage({ commit }: any, newData: any) { // добавляем автоматически добавляемые фильтры
            commit('SET_LANGUAGE', { item: newData });
        },
    },
};

export default lang;
