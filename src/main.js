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

//-----------------------------------------------------------------------------/
// FIREBASE
//-----------------------------------------------------------------------------/
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set} from "firebase/database";

const config = {
    apiKey: "AIzaSyCPRqO1-BtPZFxCKbogJ40-WVT4fA4kYFk",
    authDomain: "transcorre-plus.firebaseapp.com",
    databaseURL: "https://transcorre-plus-default-rtdb.firebaseio.com",
    projectId: "transcorre-plus",
    storageBucket: "transcorre-plus.appspot.com",
    messagingSenderId: "344831762723",
    appId: "1:344831762723:web:f8a92231f1c8c361d9ac96"
};

const app = initializeApp(config);
const db = ref(getDatabase(app), 'auth');

class serviceDB {
    getAll() {
        return db;
    }

    static create(value) {
        return set(ref(getDatabase(app), 'users'), {
            username: 'aslan',
            email: 'aslan-k@',
        });
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

//-----------------------------------------------------------------------------/
// AXIOS
//-----------------------------------------------------------------------------/

import axios from 'axios';


Vue.prototype.$firebase = serviceDB


new Vue({
    router,
    vuetify: Vuetify,
    render: (h) => h(App),
}).$mount('#app');
