export type RouteType = {
    id: string,
    exact?: boolean,
    path: string,
    component: any,
    title?: string,
    isNavVisible: boolean;
    isProtected?: boolean;
};

export interface IRouterProps {
    routes: RouteType[],
    layout: any,
}
