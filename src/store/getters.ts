const getters = {
    getRoutes: (state: any) => (RoleCode: string) => state.routes.routes.pages,
    language: (state: any) => state.lang.language,
};
export default getters;
