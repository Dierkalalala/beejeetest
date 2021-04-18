import StartPage from './StartPage';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';

const START_PAGE_ROUTE = '/';
const ADMIN_PAGE_ROUTE = 'admin';
const LOGIN_PAGE_ROUTE = 'login';


const routes = [
    {
        id: START_PAGE_ROUTE,
        exact: true,
        path: '/',
        component: StartPage,
        title: 'Tasks',
        isNavVisible: true,
        isProtected: false
    },
    {
        id: ADMIN_PAGE_ROUTE,
        exact: true,
        path: '/admin',
        component: AdminPage,
        title: 'Admin task editor',
        isNavVisible: false,
        isProtected: true
    },
    {
        id: LOGIN_PAGE_ROUTE,
        exact: true,
        path: '/login',
        component: LoginPage,
        title: 'Login page',
        isNavVisible: false,
        isProtected: false
    },
]

export default routes;
