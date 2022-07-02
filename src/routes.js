import index from './pages/auth/index.vue';
import registrar from './pages/auth/registrar.vue';
import not from './pages/errors/404.vue';
import map from './pages/map.vue';

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
        path: '/map',
        component: map
    },
    {
        path: '*',
        component: not
    },
];
