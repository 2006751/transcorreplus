import authIndex from './pages/auth/index.vue';
import registrar from './pages/auth/registrar.vue';
import not from './pages/errors/404.vue';
import index from './pages/index.vue';

export default [
    {
        path: '/',
        component: index
    },
    {
        path: '/registrar',
        component: registrar
    },
    {
        path: '/esquici-senha',
        component: registrar
    },
    {
        path: '*',
        component: not
    },
];
