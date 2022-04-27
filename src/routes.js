import index from './pages/index.vue';
import not from './pages/errors/404.vue';

export default [
    {
        path: '/',
        component: index
    },
    {
        path: '*',
        component: not
    },
];
