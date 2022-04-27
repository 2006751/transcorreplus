import Vue from 'vue';
import App from './layouts/default.vue'
import Vuetify from './plugins/vuetify.plugin';
import routes from './routes';
import './plugins/validation/vee-validate.js';

//---------------------------------------------------------------------------------------------------------------------/
// Vue Router
//---------------------------------------------------------------------------------------------------------------------/
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
});

new Vue({
    router,
    vuetify: Vuetify,
    render: (h) => h(App),
}).$mount('#app');
