import Vue from 'vue';
import App from './layouts/default.vue'
import Vuetify from './plugins/vuetify.plugin';

new Vue({
    vuetify: Vuetify,
    render: (h) => h(App),
}).$mount('#app');
